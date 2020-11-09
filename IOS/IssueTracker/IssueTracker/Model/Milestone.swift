//
//  Milestone.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/29.
//

import Alamofire
struct Milestone {
    var title = ""
    var contents = ""
    var until = Date()
    var openIssueCount = 0
    var closeIssueCount = 0
    var id = -1
    var status = 1
}
extension Milestone {
    var model: MilestoneVO {
        return MilestoneVO(title: self.title, contents: self.contents, until: until.getString(), id: self.id, status: self.status)
    }
}
struct MilestoneVO : Codable {
    var title,contents,until: String
    var id = -1
    var status: Int
}
extension MilestoneVO {
    func decode() -> Milestone {
        return Milestone(title: title, contents: contents, until: until.getDate(), openIssueCount: 0, closeIssueCount: 0, id: id, status: status)
    }
}
