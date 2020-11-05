//
//  AnyRepository.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/04.
//

import Foundation
import Alamofire
class MilestoneRepository: Repository {
    typealias VO = MilestoneVO
    func getAll(finishedCallback: @escaping (_ milestones: [VO]?)->Void){
        var milestones = [VO]()
        AF.request(RestApiServerURL.milestone, method: .get).responseJSON() {
            response in
            switch response.result {
            case .success:
                if let jsonArray = try! response.result.get() as? [String: Any] {
                    if let jsonObjectArray = jsonArray["result"] as? [[String: Any]] {
                        for jsonObject in jsonObjectArray{
                            var milestoneVO = VO()
                            milestoneVO.name = jsonObject["title"] as! String
                            milestoneVO.description = jsonObject["contents"] as! String
                            milestoneVO.endDate.convert(fromIsoDate: jsonObject["until"] as! String)
                            milestoneVO.id = jsonObject["id"] as! Int
                            milestoneVO.status = jsonObject["status"] as! Int
                            milestones.append(milestoneVO)
                        }
                        finishedCallback(milestones)
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
        let parameters = ["title": item.name,
                          "contents": item.description,
                          "until": item.endDate,
                          "status": item.status] as [String : Any]
        AF.request(RestApiServerURL.milestone, method: .post, parameters: parameters).responseString(){
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveMilestoneData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    
    func update(item: VO) throws {
        let parameters = ["title": item.name,
                          "contents": item.description,
                          "until": item.endDate,
                          "status": item.status,
                          "id": item.id] as [String : Any]
        AF.request(RestApiServerURL.milestone, method: .put, parameters: parameters).responseString(){
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveMilestoneData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    
    func delete(item: VO) throws {
        let parameters = ["id": item.id] as [String : Any]
        AF.request(RestApiServerURL.milestone, method: .delete, parameters: parameters).responseString(){
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveMilestoneData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
}
