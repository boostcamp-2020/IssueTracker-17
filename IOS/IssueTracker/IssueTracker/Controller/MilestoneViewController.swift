//
//  MilestoneViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/29.
//

import UIKit

class MilestoneViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    @IBAction func addMilestoneButtonAction(_ sender: Any) {
        openDetailView(milestone: Milestone())
    }
    var milestones = [Milestone]()
    let milestoneRepository = MilestoneRepository()
    var openCount = [0,0,0]
    private var dateFormatter = DateFormatter()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.collectionView.delegate = self
        self.collectionView.dataSource = self
        self.collectionView.register(UINib(nibName: "MilestoneCollectionViewCell", bundle: .main), forCellWithReuseIdentifier: "MilestoneCollectionViewCell")
        self.collectionView.contentInset = UIEdgeInsets(top: 10, left: 0, bottom: 0, right: 0)
        configure()
    }
    func configure() {
        dateFormatter.dateFormat = "yyyy/MM/dd"
        NotificationCenter.default.addObserver(self, selector: #selector(saveMilestoneData), name: .saveMilestoneData, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(setIssueCount), name: Notification.Name("setIssueCount"), object: openCount)
        saveMilestoneData()
    }
    func openDetailView(milestone: Milestone) {
        guard let vcName = self.storyboard?.instantiateViewController(withIdentifier: "MilestoneDetailViewController") as? MilestoneDetailViewController else {
            return
        }
        vcName.modalPresentationStyle = .formSheet
        vcName.milestone = milestone
        self.present(vcName, animated: true, completion: nil)
    }
    @objc func saveMilestoneData() {
        milestones.removeAll()
        milestoneRepository.getAll {
            (arrayOfMilestone) in
            if (arrayOfMilestone != nil) {
                for mileston in arrayOfMilestone! {
                    self.milestones.append(mileston.decode())
                }
            }
            self.collectionView.reloadData()
        }
    }
    @objc func setIssueCount() {
            for i in 0..<milestones.count {
                if milestones[i].id == openCount[0] {
                    milestones[i].openIssueCount = openCount[1]
                    milestones[i].closeIssueCount = openCount[2]
                }
            }
            self.collectionView.reloadData()
    }
}
extension MilestoneViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return milestones.count
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MilestoneCollectionViewCell", for: indexPath) as? MilestoneCollectionViewCell else {
            return UICollectionViewCell()
        }
        cell.nameLabel.text = milestones[indexPath.row].title
        let date = dateFormatter.string(from: milestones[indexPath.row].until).split(separator: "/")
        cell.endDateLabel.text = "\(date[0])년 \(date[1])월 \(date[2])일까지"
        cell.descriptionLabel.text = milestones[indexPath.row].contents
        let sumIssue = milestones[indexPath.row].openIssueCount + milestones[indexPath.row].closeIssueCount
        if sumIssue != 0 {
            let percent = Int(round((Float(milestones[indexPath.row].closeIssueCount) / Float(sumIssue)) * 100))
            cell.completionRateLabel.text = "\(percent)%"
        } else {
            cell.completionRateLabel.text = "0%"
        }
        cell.issueCountLabel.text = "\(milestones[indexPath.row].openIssueCount) open\n\(milestones[indexPath.row].closeIssueCount) closed"
        return cell
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width, height: 80)
    }
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        openDetailView(milestone: milestones[indexPath.row])
    }
}
