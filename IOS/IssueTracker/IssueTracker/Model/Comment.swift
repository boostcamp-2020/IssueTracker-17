//
//  Comment.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/10.
//

import Foundation

struct CommentResult: Codable {
    let result: [Comment]
}

struct Comment: Codable {
    let id, userID, issueID: Int
    let contents: String
    let emoji: String
    let created: String
    let user: CommentUser

    enum CodingKeys: String, CodingKey {
        case id
        case userID = "user_id"
        case issueID = "issue_id"
        case contents, emoji, created, user
    }
}

struct CommentUser: Codable {
    let name: String
    let profileURL: String

    enum CodingKeys: String, CodingKey {
        case name
        case profileURL = "profile_url"
    }
}
