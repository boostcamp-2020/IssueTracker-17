//
//  LoginManager.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/27.
//

import Foundation
import UIKit
import Network
import Alamofire
import AuthenticationServices
class LoginManager {
    static let shared = LoginManager()
    private init() {}
    private let githubClientId = "ad973f593224119b94b4"
    private let githubClientSecret = "6061dee97853332ddee856b4c32f488b48f6d8c1"
    private let userRepository = UserRepository()
    func requestCodeToGithub() {
        let scope = "user"
        let urlString = "https://github.com/login/oauth/authorize?client_id=\(githubClientId)&scope=\(scope)"
        if let url = URL(string: urlString), UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url)
            // redirect to scene(_:openURLContexts:) if user authorized
        }
    }
    func requestAccessTokenToGithub(with code: String) {
        let url = "https://github.com/login/oauth/access_token"
        let headers: HTTPHeaders = ["Accept" : "application/json"]
        let parameters = ["client_id": githubClientId,
                          "client_secret": githubClientSecret,
                          "code": code]
        AF.request(url, method: .post, parameters: parameters, headers: headers).responseJSON(){
            response in
            switch response.result {
            case .success:
                if let jsonObject = try! response.result.get() as? [String: Any] {
                    if let accessToken = jsonObject["access_token"] as? String {
                        self.getUser(accessToken: accessToken)
                    }
                }
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    func getUser(accessToken: String) {
        let url = "https://api.github.com/user"
        let headers: HTTPHeaders = ["Authorization" : "token \(accessToken)"]
        AF.request(url, headers: headers).responseJSON(){
            response in
            switch response.result {
            case .success:
                var user = User()
                if let jsonObject = try! response.result.get() as? [String: Any] {
                    if let id = jsonObject["id"] {
                        user.identifier = String(id as! Int64)
                    }
                    if let name = jsonObject["name"] as? String {
                        user.name = name
                    }
                    if let avatar_url = jsonObject["avatar_url"] as? String {
                        user.profileUrl = avatar_url
                    }
                    do {
                        try self.userRepository.insert(item: user.model)
                    } catch(let error) {
                        print(error)
                    }
                }
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    func logout() {
        UserDefaults.standard.removeObject(forKey: "UserToken")
    }
    func decode(jwtToken jwt: String) throws -> [String: Any] {
        enum DecodeErrors: Error {
            case badToken
            case other
        }
        func base64Decode(_ base64: String) throws -> Data {
            var base64String = base64
            let requiredLength = Int(4 * ceil(Float(base64String.count) / 4.0))
            let nbrPaddings = requiredLength - base64String.count
            if nbrPaddings > 0 {
                let padding = String().padding(toLength: nbrPaddings, withPad: "=", startingAt: 0)
                base64String = base64String.appending(padding)
            }
            base64String = base64String.replacingOccurrences(of: "-", with: "+")
            base64String = base64String.replacingOccurrences(of: "_", with: "/")
            guard let decodedData = Data(base64Encoded: base64String, options: Data.Base64DecodingOptions(rawValue: UInt(0))) else {
                throw DecodeErrors.badToken
            }
            return decodedData
        }
        func decodeJWTPart(_ value: String) throws -> [String: Any] {
            let bodyData = try base64Decode(value)
            let json = try JSONSerialization.jsonObject(with: bodyData, options: [])
            guard let payload = json as? [String: Any] else {
                throw DecodeErrors.other
            }
            return payload
        }
        let segments = jwt.components(separatedBy: ".")
        return try decodeJWTPart(segments[1])
    }
}
