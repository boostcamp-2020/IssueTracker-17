//
//  Repository.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/04.
//
import Foundation
protocol Repository {
    associatedtype VO
    func getAll(finishedCallback: @escaping (_ entityObject: [VO]?)->Void)
    func get(where id: Int) -> VO?
    func insert(item: VO) throws
    func update(item: VO) throws
    func delete(item: VO) throws
}
