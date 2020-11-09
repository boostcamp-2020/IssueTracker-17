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
        var labelVOArray = [LabelVO]()
        for label in self.labels {
            labelVOArray.append(label.model)
        }
        var assigneVOArray = [UserVO]()
        for assigne in self.assignees {
            assigneVOArray.append(assigne.model)
        }
        return IssueVO(id: id, title: title, status: status, contents: contents, created: created, userName: userName, milestoneId: milestoneId, labelVOArray: labelVOArray, assigneVOArray: assigneVOArray)
    }
}
struct IssueVO : Codable {
    var id = -1
    var title = ""
    var status = 0
    var contents = ""
    var created = Date()
    var userName = ""
    var milestoneId = -1
    var labelVOArray = [LabelVO]()
    var assigneVOArray = [UserVO]()
}
extension IssueVO {
    func decode() -> Issue {
        var labels = [Label]()
        for label in labelVOArray {
            labels.append(label.decode())
        }
        var assignees = [User]()
        for assigne in assigneVOArray {
            assignees.append(assigne.decode())
        }
        return Issue(id: id, title: title, status: status, contents: contents, created: created, userName: userName, milestoneId: milestoneId, labels: labels, assignees: assignees)
        
    }
}
