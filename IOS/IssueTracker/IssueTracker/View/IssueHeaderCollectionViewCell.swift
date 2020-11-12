//
//  IssueHeaderCollectionViewCell.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/03.
//

import UIKit

class IssueHeaderCollectionViewCell: UICollectionReusableView {
    @IBOutlet weak var issueItemImageView: UIImageView!
    @IBOutlet weak var issueItemWriterLabel: UILabel!
    @IBOutlet weak var issueItemNumberLabel: UILabel!
    @IBOutlet weak var issueItemContentsLabel: UILabel!
    @IBOutlet weak var issueItemStatusButton: UIButton!
    
    override func awakeFromNib() {
        //cell reuse
    }
    
    func setupHeaderSection(issue: Issue) {
        let url = URL(string: issue.profileUrl)
        do {
            if let url = url {
                let data = try Data(contentsOf: url)
                issueItemImageView.image = UIImage(data: data)
            }
        } catch let error {
            debugPrint("ERRor ::\(error)")
        }
        issueItemWriterLabel.text = issue.userName
        issueItemNumberLabel.text = "#\(issue.id)"
        issueItemContentsLabel.text = issue.title
    }
    
}
