//
//  MilestoneCollectionViewCell.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/29.
//

import UIKit

class MilestoneCollectionViewCell: UICollectionViewCell {
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var endDateLabel: UILabel!
    @IBOutlet weak var completionRateLabel: UILabel!
    @IBOutlet weak var issueCountLabel: UILabel!
    @IBOutlet weak var descriptionLabel: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        nameLabel.layer.cornerRadius = 4.0
        nameLabel.layer.borderColor = nameLabel.textColor.cgColor
        nameLabel.layer.borderWidth = 1
        nameLabel.clipsToBounds = true
    }
}
