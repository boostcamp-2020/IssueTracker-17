//
//  CommentAddViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/12.
//

import UIKit

class CommentAddViewController: UIViewController {
    var issue: Issue = Issue()
    @IBOutlet weak var commentTextField: IssueContentTextView!

    @IBAction func closeButton(_ sender: UIBarButtonItem) {
        self.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func writeButton(_ sender: UIBarButtonItem) {
        NotificationCenter.default.post(name: Notification.Name(rawValue: "addComment"), object: commentTextField.text!)
        self.dismiss(animated: true, completion: nil)
    }
    
    func configIssue(issue: Issue) {
        self.issue = issue
    }
}
