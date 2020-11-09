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
        AF.request(RestApiServerURL.milestone, method: .get).responseData() {
            response in
            switch response.result {
            case .success:
                print(String(decoding:try! response.result.get(), as: UTF8.self))
                if let decodeData = try? JSONDecoder().decode(ResultResponse<VO>.self, from: response.result.get()) {
                    milestones = decodeData.result
                } else {
                    
                }
                finishedCallback(milestones)
            case .failure(let error):
                print(error)
            }
        }
    }
    func get(where id: Int) -> VO? {
        return nil
    }
    func insert(item: VO) throws {
        let parameters = ["title": item.title,
                          "contents": item.contents,
                          "until": item.until,
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
        let parameters = ["title": item.title,
                          "contents": item.contents,
                          "until": item.until,
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
