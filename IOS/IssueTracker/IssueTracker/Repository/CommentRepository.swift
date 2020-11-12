//
//  CommentRepository.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/10.
//

import Foundation
import Alamofire
class CommentRepository {
    func getAll(id: Int, finishedCallback: @escaping (_ response: [Comment]) ->Void){
        AF.request("\(RestApiServerURL.comment)/\(id)").responseData() {
            response in
            switch response.result {
            case .success:
                let decodeData = try! JSONDecoder().decode(CommentResult.self, from: response.result.get())
                finishedCallback(decodeData.result)
            case .failure(let error):
                print(error)
            }
        }
    }
    func insert(issueId: Int, contents: String, created: String) throws {
        let parameters = ["userId": 1, //TODO: Login 후 ID 넘겨주기
                          "emoji": " ",
                          "issueId": issueId,
                          "contents": contents,
                          "created": created] as [String : Any]
        AF.request(RestApiServerURL.comment, method: .post, parameters: parameters).responseJSON() {
            response in
            print("res:",response.result)
            switch response.result {
            case .success:
                return
            case .failure(let error):
                print(error)
                return
            }
        }
    }
}
