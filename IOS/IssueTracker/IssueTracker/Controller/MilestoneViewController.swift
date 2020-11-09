//
//  MilestoneViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/29.
//

import UIKit

class MilestoneViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    var milestones = [Milestone]()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.collectionView.delegate = self
        self.collectionView.dataSource = self
        self.collectionView.register(UINib(nibName: "MilestoneCollectionViewCell", bundle: .main), forCellWithReuseIdentifier: "MilestoneCollectionViewCell")
        self.collectionView.contentInset = UIEdgeInsets(top: 10, left: 0, bottom: 0, right: 0)
        configure()
    }
    func configure() {
        NotificationCenter.default.addObserver(self, selector: #selector(saveLabelData), name: .saveLabelData, object: nil)
        milestones.append(Milestone(name: "스프린트2", description: "이번 배포를 위한 스프린트", endDate: "2020/06/19", openIssueCount: 13, closeIssueCount: 23))
        milestones.append(Milestone(name: "스프린트3", description: "다음 배포를 위한 스프린트", endDate: "2020/06/26", openIssueCount: 0, closeIssueCount: 0))
    }
    func openDetailView(milestone: Milestone) {
        guard let vcName = self.storyboard?.instantiateViewController(withIdentifier: "MilestoneDetailViewController") as? MilestoneDetailViewController else {
            return
        }
        vcName.modalPresentationStyle = .formSheet
        vcName.milestone = milestone
        self.present(vcName, animated: true, completion: nil)
    }
    @objc func saveLabelData() {
        // TODO: Milestone 서버에서 가져온 후 리로드
        collectionView.reloadData()
    }
}
extension MilestoneViewController: UICollectionViewDelegate, UICollectionViewDataSource,UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return milestones.count
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MilestoneCollectionViewCell", for: indexPath) as? MilestoneCollectionViewCell else {
            return UICollectionViewCell()
        }
        cell.nameLabel.text = milestones[indexPath.row].name
        let date = milestones[indexPath.row].endDate.split(separator: "/")
        cell.endDateLabel.text = "\(date[0])년 \(date[1])월 \(date[2])일까지"
        cell.descriptionLabel.text = milestones[indexPath.row].description
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
