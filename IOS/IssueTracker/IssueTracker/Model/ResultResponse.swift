//
//  ResultResponse.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/09.
//

import Foundation
struct ResultResponse<T: Codable> : Codable {
    var result : [T]
}
