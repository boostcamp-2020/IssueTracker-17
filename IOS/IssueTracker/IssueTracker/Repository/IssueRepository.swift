//
//  IssueRepository.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/06.
//

import Foundation
import Alamofire
class IssueRepository: Repository {
    typealias VO = IssueVO
    func getAll(finishedCallback: @escaping (_ issue: [VO]?)->Void){
        var issues = [VO]()
        AF.request(RestApiServerURL.issue).responseData() {
            response in
            switch response.result {
            case .success:
                let decodeData = try! JSONDecoder().decode(ResultResponse<VO>.self, from: response.result.get())
                issues = decodeData.result
                finishedCallback(issues)
            case .failure(let error):
                print(error)
            }
        }
    }
    func get(where id: Int) -> VO? {
        return nil
    }
    func insert(item: VO) throws {
        let parameters = ["userId": 1, //TODO: Login 후 ID 넘겨주기
                          "title": item.title,
                          "contents": item.contents,
                          "created": item.created] as [String : Any]
        AF.request(RestApiServerURL.issue, method: .post, parameters: parameters).responseJSON() {
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveIssueData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    func update(item: VO) throws {
        let parameters = ["id": item.id,
                          "title": item.title,
                          "contentes": item.contents,
                          "created": item.created,
                          "status": item.status] as [String : Any]
        AF.request(RestApiServerURL.issue, method: .post, parameters: parameters).responseString() {
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveIssueData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    func delete(item: VO) throws {
        let parameters = ["id": item.id] as [String : Any]
        AF.request(RestApiServerURL.issue, method: .delete, parameters: parameters).responseString(){
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveIssueData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
}
