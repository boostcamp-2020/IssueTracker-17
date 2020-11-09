//
//  LoginManager.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/27.
//

import Foundation
import UIKit
import Network

class LoginManager {
    
    static let shared = LoginManager()
    
    private init() {}
    
    private let githubClientId = ""
    private let githubClientSecret = ""
    func requestCodeToGithub() {
        let scope = "repo,user"
        let urlString = "https://github.com/login/oauth/authorize?client_id=\(githubClientId)&scope=\(scope)"
        if let url = URL(string: urlString), UIApplication.shared.canOpenURL(url) {
            UIApplication.shared.open(url)
            // redirect to scene(_:openURLContexts:) if user authorized
        }
    }
    func requestAccessTokenToGithub(with code: String) {
        guard let url = URL(string: "https://github.com/login/oauth/access_token") else {return}
        let session = URLSession.shared
        let parameters = ["client_id": githubClientId,
                          "client_secret": githubClientSecret,
                          "code": code]
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted)
        } catch let error {
            print(error.localizedDescription)
        }
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        let task = session.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
            guard error == nil else {
                return
            }
            guard let data = data else {
                return
            }
            //  let accessToken = dic["access_token"] ?? ""
            guard let json = try! JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                print(String(data: data, encoding: .utf8) ?? "Not string?!?")
                return
            }
            // json["access_token"] access_token 값
            self.getUser(accessToken: json["access_token"] as! String)
        })
        task.resume()
    }
    func getUser(accessToken: String) {
        guard let url = URL(string: "https://api.github.com/user") else {return}
        let session = URLSession.shared
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.addValue("token \(accessToken)", forHTTPHeaderField: "Authorization")
        request.addValue("application/vnd.github.v3+json", forHTTPHeaderField: "Accept")
        let task = session.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
            guard error == nil else {
                return
            }
            guard let data = data else {
                return
            }
            guard let json = try! JSONSerialization.jsonObject(with: data) as? [String: Any] else {
                print(String(data: data, encoding: .utf8) ?? "Not string?!?")
                return
            }
            // 프로필 사진 주소
            print(json["avatar_url"] as! String)
            // 이름 가져오기
            print(json["name"] as! String)
        })
        task.resume()
    }
    func logout() {
    }
    
}
