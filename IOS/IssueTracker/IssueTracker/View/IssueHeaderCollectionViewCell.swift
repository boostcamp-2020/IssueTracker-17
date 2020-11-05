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
        //categoryNameLabel.layer.borderWidth = 1
    }
    
    func setupHeaderSection() {
        print("test")
        issueItemWriterLabel.text = "writer"
        issueItemNumberLabel.text = "#11"
        issueItemContentsLabel.text = "이슈 목록 확인 구현중"
    }
    
}
