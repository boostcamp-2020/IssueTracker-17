//
//  LableCollectionViewCell.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit

class LabelCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var labelName: UILabel!
    @IBOutlet weak var descriptionLable: UILabel!
    var labelColor = "" {
        didSet {
            labelName.backgroundColor = UIColor().colorWithHexString(hex: labelColor)
        }
    }
    var nameText = "" {
        didSet {
            labelName.text = nameText
        }
    }
    var descriptionText = "" {
        didSet {
            descriptionLable.text = descriptionText
        }
        
    }
    override func awakeFromNib() {
        super.awakeFromNib()
        labelName.layer.cornerRadius = 8.0
        labelName.clipsToBounds = true
    }
}
