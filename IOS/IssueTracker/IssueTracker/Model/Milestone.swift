//
//  Milestone.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/29.
//

import Alamofire
struct Milestone {
    var name = ""
    var description = ""
    var endDate = Date()
    var openIssueCount = 0
    var closeIssueCount = 0
    var id = 0
    var status = 1
}
extension Milestone {
    var model: MilestoneVO {
        return MilestoneVO(name: self.name, description: self.description, endDate: self.endDate, id: self.id, status: self.status)
    }
}

struct MilestoneVO {
    var name = ""
    var description = ""
    var endDate = Date()
    var id = 0
    var status = 1
}
extension MilestoneVO {
    func decode() -> Milestone {
        return Milestone(name: name, description: description, endDate: endDate, openIssueCount: 0, closeIssueCount: 0, id: id, status: status)
    }
}
