//
//  Issue.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/04.
//

import Foundation

struct Issue {
    var id = -1
    var title = ""
    var status = 0
    var contents = ""
    var created = Date()
    var userName = ""
    var milestoneId = -1
    var labels = [Label]()
    var assignees = [User]()
}
extension Issue {
    var model: IssueVO {
        return IssueVO(id: id, title: title, status: status, contents: contents, created: created, userName: userName, milestoneId: milestoneId, labels: labels, assignees: assignees)
    }
}
struct IssueVO {
    var id = -1
    var title = ""
    var status = 0
    var contents = ""
    var created = Date()
    var userName = ""
    var milestoneId = -1
    var labels = [Label]()
    var assignees = [User]()
}
extension IssueVO {
    func decode() -> Issue {
        return Issue(id: id, title: title, status: status, contents: contents, created: created, userName: userName, milestoneId: milestoneId, labels: labels, assignees: assignees)
        
    }
}
