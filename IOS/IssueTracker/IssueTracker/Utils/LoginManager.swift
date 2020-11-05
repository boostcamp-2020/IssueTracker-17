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
    private let githubClientId = ""
    private let githubClientSecret = ""
    private let userRepository = UserRepository()
    func requestCodeToGithub() {
        let scope = "repo,user"
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
    }
}
