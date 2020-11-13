//
//  Label.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import Foundation
struct Label {
    var id = -1
    var title = ""
    var contents = ""
    var color = "#000000"
}
extension Label {
    var model: LabelVO {
        return LabelVO(id: id, title: title, contents: contents, color: color)
    }
}
struct LabelVO : Codable {
    var id = -1
    var title = ""
    var contents = ""
    var color = "#000000"
}
extension LabelVO {
    func decode() -> Label {
        return Label(id: id, title: title, contents: contents, color: color)
    }
}
