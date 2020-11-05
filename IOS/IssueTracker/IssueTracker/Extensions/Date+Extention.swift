//
//  Date+Extention.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/04.
//

import Foundation

extension Date {
    mutating func convert(fromIsoDate: String){
        let isoDate = fromIsoDate
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSZ"
        self = dateFormatter.date(from:isoDate)!
    }
}
