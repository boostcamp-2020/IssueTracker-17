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
        issueCommentLabel.text = "댓글댓글댓글댓글"
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
//        itemTitleLabel.text = item.title
//        itemDescriptionLabel.text = item.description
//        if let price = item.normalPrice { //할인 적용
//            itemPriceSub.text = item.salePrice
//            itemPriceSub.textColor = .systemPurple
//            itemPriceSub.font = UIFont.boldSystemFont(ofSize: 16.0)
//            itemPriceMain.attributedText = price.strikeThrough()
//            itemPriceMain.textColor = .systemGray
//        }else{ //할인 적용 안됨
//            itemPriceMain.text = item.salePrice
//            itemPriceMain.textColor = .systemPurple
//            itemPriceMain.font = UIFont.boldSystemFont(ofSize: 16.0)
//            itemPriceSub.text = ""
//        }
//        if let badges = item.badge { //태그 있다면
//            for (index, badge) in badges.enumerated() {
//                let temp: UILabel = UILabel(frame: CGRect(x: 90 * index + 5 * index, y: 0, width: 90, height: 20))
//                temp.backgroundColor = MyUtils.getColors(index: index)
//                temp.text = badge
//                temp.textAlignment = .center
//                itemBadgeScrollView.addSubview(temp)
//            }
//        }
    }
}
