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
    var milestone_id: Int?
    var milestoneTitle: String?
    var profileUrl = ""
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
        return IssueVO(id: id, title: title, status: status, contents: contents, created: created.getString(), userName: userName, milestone_id: milestone_id, milestoneTitle: milestoneTitle, profileUrl: profileUrl, labels: labelVOArray, assignees: assigneVOArray)
    }
}
struct IssueVO : Codable {
    var id = -1
    var title = ""
    var status = 0
    var contents = ""
    var created = ""
    var userName = ""
    var milestone_id: Int?
    var milestoneTitle: String?
    var profileUrl = ""
    var labels = [LabelVO]()
    var assignees = [UserVO]()
}
extension IssueVO {
    func decode() -> Issue {
        var labelArray = [Label]()
        for labelObject in labels {
            labelArray.append(labelObject.decode())
        }
        var assigneArray = [User]()
        for assigne in assignees {
            assigneArray.append(assigne.decode())
        }
        return Issue(id: id, title: title, status: status, contents: contents, created: created.getDate(), userName: userName, milestone_id: milestone_id, milestoneTitle: milestoneTitle, profileUrl: profileUrl, labels: labelArray, assignees: assigneArray)
    }
}
