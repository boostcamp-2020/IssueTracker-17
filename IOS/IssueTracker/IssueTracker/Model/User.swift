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
    var model: UserVO {
        return UserVO(id: id, type: type, identifier: identifier, name: name, profileUrl: profileUrl)
    }
}
struct UserVO : Codable {
    var id = -1
    var type = 1
    var identifier = ""
    var name = ""
    var profileUrl = ""
}
extension UserVO {
    func decode() -> User {
        return User(id: id, type: type, identifier: identifier, name: name, profileUrl: profileUrl)
    }
}
