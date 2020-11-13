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
    @IBOutlet weak var issueItemStatusLabel: UILabel!
    
    override func awakeFromNib() {
        //cell reuse
    }
    
    func setClose() {
        let attributedString = NSMutableAttributedString(string: "")
        let imageAttachment = NSTextAttachment()
        imageAttachment.image = UIImage(systemName: "exclamationmark.circle")
        let iconAttachment = NSTextAttachment(image: (imageAttachment.image?.withTintColor(UIColor().colorWithHexString(hex: "#cb2431")))!)
        attributedString.append(NSAttributedString(attachment: iconAttachment))
        attributedString.append(NSAttributedString(string: "CLOSE"))
        issueItemStatusLabel.attributedText = attributedString
        issueItemStatusLabel.backgroundColor = UIColor().colorWithHexString(hex: "#f3c0c5")
        issueItemStatusLabel.textColor = UIColor().colorWithHexString(hex: "#cb2431")
    }
    
    func setupHeaderSection(issue: Issue) {
        DispatchQueue.main.async {
            let url = URL(string: issue.profileUrl)
            do {
                if let url = url {
                    let data = try Data(contentsOf: url)
                    self.issueItemImageView.image = UIImage(data: data)
                }
            } catch let error {
                debugPrint("ERRor ::\(error)")
            }
        }
        issueItemWriterLabel.text = issue.userName
        issueItemNumberLabel.text = "#\(issue.id)"
        issueItemContentsLabel.text = issue.title
        let attributedString = NSMutableAttributedString(string: "")
        let imageAttachment = NSTextAttachment()
        imageAttachment.image = UIImage(systemName: "exclamationmark.circle")
        issueItemStatusLabel.layer.cornerRadius = 7
        issueItemStatusLabel.layer.masksToBounds = true
        
        if issue.status == 0 {
            let iconAttachment = NSTextAttachment(image: (imageAttachment.image?.withTintColor(UIColor().colorWithHexString(hex: "#30954e")))!)
            attributedString.append(NSAttributedString(attachment: iconAttachment))
            attributedString.append(NSAttributedString(string: "OPEN"))
            issueItemStatusLabel.attributedText = attributedString
            issueItemStatusLabel.backgroundColor = UIColor().colorWithHexString(hex: "#eefbf1")
            issueItemStatusLabel.textColor = UIColor().colorWithHexString(hex: "#30954e")
        }else {
            let iconAttachment = NSTextAttachment(image: (imageAttachment.image?.withTintColor(UIColor().colorWithHexString(hex: "#cb2431")))!)
            attributedString.append(NSAttributedString(attachment: iconAttachment))
            attributedString.append(NSAttributedString(string: "CLOSE"))
            issueItemStatusLabel.attributedText = attributedString
            issueItemStatusLabel.backgroundColor = UIColor().colorWithHexString(hex: "#f3c0c5")
            issueItemStatusLabel.textColor = UIColor().colorWithHexString(hex: "#cb2431")
        }
    }
}
