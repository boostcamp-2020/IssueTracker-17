//
//  Milestone.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/29.
//

import Foundation
struct Milestone {
    var name = ""
    var description = ""
    var endDate = ""
    var openIssueCount = 0
    var closeIssueCount = 0
}
extension Milestone: connectNetworkAble {
    func Get() {
    }
    func Post() {
    }
    func Put() {
    }
    func Delete() {
    }
}
