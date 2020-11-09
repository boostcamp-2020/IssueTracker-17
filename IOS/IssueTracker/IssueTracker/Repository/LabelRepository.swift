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
        AF.request(RestApiServerURL.label).responseData() {
            response in
            switch response.result {
            case .success:
                if let decodeData = try? JSONDecoder().decode(ResultResponse<VO>.self, from: response.result.get()) {
                    labels = decodeData.result
                } else {
                    
                }
                finishedCallback(labels)
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
        let parameters = ["title": item.title,
                          "contents": item.contents,
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
