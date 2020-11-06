//
//  IssueViewCustomCell.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/10/27.
//

import UIKit

class IssueViewCustomCell: UITableViewCell {
    @IBOutlet weak var issueTitleLabel: UILabel!
    @IBOutlet weak var issueContentsLabel: UILabel!
    @IBOutlet weak var issueMilestoneLabel: UIButton!
    @IBOutlet weak var issueLabelLabel: UIButton!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        issueMilestoneLabel.layer.cornerRadius = 4.0
        issueMilestoneLabel.layer.borderWidth = 1
        issueMilestoneLabel.clipsToBounds = true
        
        issueLabelLabel.layer.cornerRadius = 4.0
        issueLabelLabel.clipsToBounds = true
    }
}
