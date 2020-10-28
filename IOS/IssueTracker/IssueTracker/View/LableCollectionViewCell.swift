//
//  LableCollectionViewCell.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit

class LableCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var lableName: UILabel!
    @IBOutlet weak var descriptionLable: UILabel!
    var lableColor = "" {
        didSet {
            print(lableColor)
            lableName.backgroundColor = UIColor().colorWithHexString(hex: lableColor)
        }
    }
    var nameText = "" {
        didSet {
            lableName.text = nameText
        }
    }
    var descriptionText = "" {
        didSet {
            descriptionLable.text = descriptionText
        }
        
    }
    override func awakeFromNib() {
        super.awakeFromNib()
        lableName.layer.cornerRadius = 8.0
        lableName.clipsToBounds = true
    }
}
