//
//  User.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/03.
//

import Foundation
import Alamofire
struct User {
    var id = -1
    var type = 1
    var identifier = ""
    var name = ""
    var profileUrl = ""
}
extension User {
    func get(){
        return
    }
    func post() {
        let headers: HTTPHeaders = ["Content-Type" : "application/x-www-form-urlencoded"]
        let parameters = ["type": 1,
                          "identifier": identifier,
                          "name": name,
                          "profileUrl": profileUrl] as [String : Any]
        AF.request(RestApiServerURL.login, method: .post, parameters: parameters, headers: headers).responseString(){
            response in
            switch response.result {
            case .success:
                print(try! response.result.get())
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    func put() {
        //
    }
    func delete() {
        //
    }
}
