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
    var milestoneLabel: UILabel = UILabel()
    var labelLabel: UILabel = UILabel()
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    override func prepareForReuse() {
        milestoneLabel.removeFromSuperview()
        labelLabel.removeFromSuperview()
    }
    
    func configIssue(issue: Issue) {
        issueTitleLabel.text = issue.title
        issueContentsLabel.text = issue.contents
        if let milestone = issue.milestoneTitle {
            configMilestone(milestone: milestone)
        }
        if issue.labels.count > 0 {
            configLabel(firstLabel: issue.labels[0])
        }
    }
    
    func configMilestone(milestone: String) {
        let label = PaddingLabel()
        label.font = .systemFont(ofSize: 15, weight: .medium)
        label.text = milestone
        label.paddingLeft = 7
        label.paddingRight = 7
        label.paddingTop = 2
        label.paddingBottom = 2
        label.layer.masksToBounds = true
        label.layer.cornerRadius = 5
        label.layer.borderWidth = 1
        milestoneLabel = label
        self.contentView.addSubview(label)
        label.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            label.topAnchor.constraint(equalTo: self.contentView.topAnchor, constant: 10),
            label.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: -10),
        ])
    }
    
    func configLabel(firstLabel: Label) {
        let label = PaddingLabel()
        label.font = .systemFont(ofSize: 12, weight: .medium)
        label.backgroundColor = UIColor().colorWithHexString(hex: firstLabel.color)
        label.text = firstLabel.title
        label.paddingLeft = 7
        label.paddingRight = 7
        label.paddingTop = 2
        label.paddingBottom = 2
        label.layer.masksToBounds = true
        label.layer.cornerRadius = 5
        labelLabel = label
        self.contentView.addSubview(label)
        label.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            label.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor, constant: -10),
            label.trailingAnchor.constraint(equalTo: self.contentView.trailingAnchor, constant: -10),
        ])
    }
}
