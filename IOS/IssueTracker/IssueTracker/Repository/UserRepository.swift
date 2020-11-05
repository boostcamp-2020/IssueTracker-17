//
//  UserRepository.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/06.
//

import Foundation
import Alamofire
class UserRepository: Repository {
    typealias VO = UserVO
    func getAll(finishedCallback: @escaping (_ labels: [VO]?)->Void){
    }
    func get(where id: Int) -> VO? {
        return nil
    }
    func insert(item: VO) throws {
        let headers: HTTPHeaders = ["Content-Type" : "application/x-www-form-urlencoded"]
        let parameters = ["type": 1,
                          "identifier": item.identifier,
                          "name": item.name,
                          "profileUrl": item.profileUrl] as [String : Any]
        AF.request(RestApiServerURL.login, method: .post, parameters: parameters, headers: headers).responseString(){
            response in
            switch response.result {
            case .success:
                print(try! response.result.get())
            // TODO: 해당 값을 캐시로 저장
            case .failure(let error):
                print(error)
                return
            }
        }
    }
    func update(item: VO) throws {
    }
    
    func delete(item: VO) throws {
    }
}
