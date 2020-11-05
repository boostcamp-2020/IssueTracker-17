//
//  IssueContextTextView.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/11/05.
//

import UIKit

class IssueContentTextView: UITextView {
    var openGalleryHandler: (() -> ())?
    override init(frame: CGRect, textContainer: NSTextContainer?) {
        super.init(frame: frame, textContainer: textContainer)
    }
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    override func canPerformAction(_ action: Selector, withSender sender: Any?) -> Bool {
        switch action {
        case #selector(cut(_:)):
            break
        case #selector(copy(_:)):
            break
        case #selector(openGallery):
            break
        default:
            return false
        }
        return true
    }
    @objc func openGallery() {
        openGalleryHandler?()
    }
}
