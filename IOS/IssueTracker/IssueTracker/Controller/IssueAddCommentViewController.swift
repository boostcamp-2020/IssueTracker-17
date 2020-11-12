//
//  IssueAddCommentViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/05.
//

import UIKit

class IssueAddCommentViewController: UIViewController {
    @IBOutlet var handleArea: UIView!
    @IBOutlet weak var assigneesScrollView: UIScrollView!
    @IBOutlet weak var labelScrollView: UIScrollView!
    @IBOutlet weak var milestoneUIView: UIView!
    var issue: Issue = Issue()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        milestoneUIView.removeFromSuperview()
        configLabelStackView()
        configAssigneesStackView()
    }
    
    func configIssue(issue: Issue) {
        self.issue = issue
    }
    
    func configAssigneesStackView() {
        for i in 0..<issue.assignees.count {
            let assignee = issue.assignees[i]
            let assigneeView = UIView(frame: CGRect(x: i * 90, y: 0, width: 80, height: Int(assigneesScrollView.frame.height)))
            let url = URL(string: assignee.profileUrl)
            let image = UIImage(systemName: "person")
            let imageView = UIImageView(image: image!)
            imageView.layer.masksToBounds = true
            imageView.layer.cornerRadius = 10
            imageView.tintColor = .gray
            imageView.frame = CGRect(x: 0, y: 0, width: 80, height: 80 )
            do {
                if let url = url {
                    let data = try Data(contentsOf: url)
                    imageView.image = UIImage(data: data)
                }
            } catch let error {
                debugPrint("ERRor ::\(error)")
            }
            assigneeView.addSubview(imageView)
            let label = UILabel(frame: CGRect(x: 0, y: 85, width: 80, height: 20))
            label.textAlignment = .center
            label.font = .systemFont(ofSize: 20, weight: .light)
            label.text = assignee.name
            label.layer.masksToBounds = true
            label.layer.cornerRadius = 5
            assigneesScrollView.addSubview(assigneeView)
            assigneeView.addSubview(label)
        }
        
    }
    
    func configLabelStackView() {
        let labelStackView = UIStackView()
        labelStackView.axis = .horizontal
        labelStackView.spacing = 10
        labelStackView.alignment = .fill
        labelStackView.distribution = .fill
        labelScrollView.addSubview(labelStackView)
        labelStackView.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            labelStackView.topAnchor.constraint(equalTo: labelScrollView.topAnchor),
            labelStackView.leadingAnchor.constraint(equalTo: labelScrollView.leadingAnchor),
            labelStackView.trailingAnchor.constraint(equalTo: labelScrollView.trailingAnchor),
            labelStackView.bottomAnchor.constraint(equalTo: labelScrollView.bottomAnchor)
        ])
        for issueLabel in issue.labels {
            let label = PaddingLabel()
            label.backgroundColor = UIColor().colorWithHexString(hex: issueLabel.color)
            label.textColor = .white
            label.font = .systemFont(ofSize: 20, weight: .semibold)
            label.text = issueLabel.title
            label.layer.masksToBounds = true
            label.layer.cornerRadius = 5
            label.paddingLeft = 7
            label.paddingRight = 7
            label.paddingTop = 2
            label.paddingBottom = 2
            labelStackView.addArrangedSubview(label)
        }
    }
}
