//
//  IssueItemCollectionViewCell.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/04.
//

import UIKit

class IssueItemCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var issueImageLabel: UIImageView!
    @IBOutlet weak var issueWriterLabel: UILabel!
    @IBOutlet weak var issueDateLabel: UILabel!
    @IBOutlet weak var issueCommentLabel: UILabel!
    
    
    //    private var imageCache = NSCache<NSString, UIImage>()
    //    var downloadBGTask: URLSessionDownloadTask!
    //    var downloadBGSession: URLSession!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        issueCommentLabel.translatesAutoresizingMaskIntoConstraints = false
        let labelInset = UIEdgeInsets(top: 10, left: 10, bottom: -10, right: -10)
        
       
        issueCommentLabel.leadingAnchor.constraint(equalTo: contentView.layoutMarginsGuide.leadingAnchor, constant: labelInset.left).isActive = true
        issueCommentLabel.trailingAnchor.constraint(equalTo: contentView.layoutMarginsGuide.trailingAnchor, constant: labelInset.right).isActive = true
        issueCommentLabel.bottomAnchor.constraint(equalTo: contentView.layoutMarginsGuide.bottomAnchor, constant: labelInset.bottom).isActive = true

        //        itemImageView.layer.cornerRadius = 20
        //        itemImageView.layer.masksToBounds = true
    }
    
    override func prepareForReuse() { //cell재사용시 초기화
        super.prepareForReuse()
        //        itemPriceMain.attributedText = NSAttributedString(string: "")
        //        itemPriceSub.attributedText = NSAttributedString(string: "")
        //        itemBadgeScrollView.subviews.forEach { (item) in
        //            item.removeFromSuperview()
        //        }
    }
    
    func setupCellValues() {
        print("cell test")
        issueWriterLabel.text = "글쓴이"
        issueDateLabel.text = "13 minutes ago"
        issueCommentLabel.text = "댓글댓글댓글댓글 123123123 \\n123adkasldklwk dowkfoesfsmdfmsfmefmwmow vmowmvomvosmdlvdsvmsd123123 \\n \\12 31231\\n123123"
        //        let tempUrl = URL(string: item.image)!
        //        if let image = imageCache.object(forKey: tempUrl.lastPathComponent as NSString) {//이미지 캐시 존재
        //            self.itemImageView.image = image
        //        } else {//캐시없음
        //            self.downloadBGSession = {
        //                let downloadBGSessionConfig = URLSessionConfiguration.default
        //                return URLSession(configuration: downloadBGSessionConfig, delegate: self, delegateQueue: OperationQueue.main)
        //            }()
        //            self.downloadBGTask = self.downloadBGSession.downloadTask(with: tempUrl)
        //            self.downloadBGTask.resume()
        //        }
    }
    
    override func preferredLayoutAttributesFitting(_ layoutAttributes: UICollectionViewLayoutAttributes) -> UICollectionViewLayoutAttributes {
        issueCommentLabel.preferredMaxLayoutWidth = layoutAttributes.size.width - contentView.layoutMargins.left - contentView.layoutMargins.left
        layoutAttributes.bounds.size.height = systemLayoutSizeFitting(UIView.layoutFittingCompressedSize).height
        return layoutAttributes
    }
    
    
}
