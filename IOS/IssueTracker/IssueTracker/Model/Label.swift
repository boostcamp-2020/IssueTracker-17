//
//  Label.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import Foundation
struct Label {
    var id = -1
    var name = ""
    var description = ""
    var color = "#000000"
}
extension Label {
    var model: LabelVO {
        return LabelVO(id: id, name: name, description: description, color: color)
    }
}
struct LabelVO {
    var id = -1
    var name = ""
    var description = ""
    var color = "#000000"
}
extension LabelVO {
    func decode() -> Label {
        return Label(id: id, name: name, description: description, color: color)
    }
}
