//
//  LabelRepository.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/04.
//

import Foundation
import Alamofire
class LabelRepository: Repository {
    typealias VO = LabelVO
    func getAll(finishedCallback: @escaping (_ labels: [VO]?)->Void){
        var labels = [VO]()
        AF.request(RestApiServerURL.label).responseJSON() {
            response in
            switch response.result {
            case .success:
                if let jsonArray = try! response.result.get() as? [String: Any] {
                    if let jsonObjectArray = jsonArray["result"] as? [[String: Any]] {
                        for jsonObject in jsonObjectArray{
                            var labelVO = VO()
                            labelVO.name = jsonObject["title"] as! String
                            labelVO.description = jsonObject["contents"] as! String
                            labelVO.color = jsonObject["color"] as! String
                            labelVO.id = jsonObject["id"] as! Int
                            labels.append(labelVO)
                        }
                        finishedCallback(labels)
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
                          "color": item.color] as [String : Any]
        AF.request(RestApiServerURL.label, method: .post, parameters: parameters).responseString(){
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveLabelData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    
    func update(item: VO) throws {
        let parameters = ["title": item.name,
                          "contents": item.description,
                          "color": item.color,
                          "id": item.id] as [String : Any]
        AF.request(RestApiServerURL.label, method: .put, parameters: parameters).responseString(){
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveLabelData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    
    func delete(item: VO) throws {
        let parameters = ["id": item.id] as [String : Any]
        AF.request(RestApiServerURL.label, method: .delete, parameters: parameters).responseString(){
            response in
            switch response.result {
            case .success:
                NotificationCenter.default.post(name: .saveLabelData, object: nil)
            case .failure(let error):
                print(error)
                return
            }
        }
    }
}
