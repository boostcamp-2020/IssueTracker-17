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
        AF.request(RestApiServerURL.issue).responseJSON() {
            response in
            switch response.result {
            case .success:
                if let jsonArray = try! response.result.get() as? [String: Any] {
                    if let jsonObjectArray = jsonArray["result"] as? [[String: Any]] {
                        for jsonObject in jsonObjectArray{
                            var vo = VO()
                            vo.id = jsonObject["id"] as! Int
                            vo.title = jsonObject["title"] as! String
                            vo.status = jsonObject["status"] as? Int ?? 0
                            vo.contents = jsonObject["contents"] as! String
                            vo.created.convert(fromIsoDate: jsonObject["created"] as? String ?? "")
                            vo.userName = jsonObject["userName"] as? String ?? ""
                            if let labelObjectArray = jsonArray["labels"] as? [[String: Any]] {
                                for labelObject in labelObjectArray{
                                    var labelVO = LabelVO()
                                    labelVO.name = labelObject["title"] as! String
                                    labelVO.description = labelObject["contents"] as! String
                                    labelVO.color = labelObject["color"] as! String
                                    labelVO.id = labelObject["id"] as! Int
                                    vo.labels.append(labelVO.decode())
                                }
                            }
                            if let assigneObjectArray = jsonArray["assignees"] as? [[String: Any]] {
                                for assigneObject in assigneObjectArray{
                                    var userVO = UserVO()
                                    userVO.id = assigneObject["id"] as! Int
                                    userVO.type = assigneObject["type"] as! Int
                                    userVO.identifier = assigneObject["identifier"] as! String
                                    userVO.name = assigneObject["name"] as! String
                                    userVO.profileUrl = assigneObject["profile_url"] as! String
                                    vo.assignees.append(userVO.decode())
                                }
                            }
                            issues.append(vo)
                        }
                        finishedCallback(issues)
                    }
                }
            case .failure(let error):
                print(error)
            }
        }
    }
    func get(where id: Int) -> VO? {
        return nil
    }
    func insert(item: VO) throws {
        var parameters = ["userId": 1, //TODO: Login 후 ID 넘겨주기
                          "title": item.title,
                          "contents": item.contents,
                          "created": item.created] as [String : Any]
        if item.milestoneId != -1 {
            parameters["milestoneId"] = item.milestoneId
        }
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
        var parameters = ["id": item.id,
                          "title": item.title,
                          "contentes": item.contents,
                          "created": item.created,
                          "status": item.status] as [String : Any]
        if item.milestoneId != -1 {
            parameters["milestoneId"] = item.milestoneId
        }
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
