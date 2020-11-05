//
//  IssueItemViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/03.
//

import UIKit

class IssueItemViewController: UIViewController {

    @IBOutlet weak var issueItemCollectionView: UICollectionView!
    var data: [String] = ["댓글1", "댓글2", "댓글3", "댓글4"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        issueItemCollectionView.delegate = self
        issueItemCollectionView.dataSource = self
        issueItemCollectionView.register(UINib(nibName: "IssueItemCollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "IssueItemCollectionViewCell")
        setupFlowLayout()
    }
}

extension IssueItemViewController: UICollectionViewDelegate, UICollectionViewDataSource {
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1 //카테코리 수
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return data.count //카테고리 별 아이템 수
    }
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        guard let issueHeaderView = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "IssueHeaderCollectionViewCell", for: indexPath) as? IssueHeaderCollectionViewCell else{
            return UICollectionReusableView()
        }
        issueHeaderView.setupHeaderSection()
        return issueHeaderView
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "IssueItemCollectionViewCell", for: indexPath) as? IssueItemCollectionViewCell else {
            return UICollectionViewCell()
        }
        cell.setupCellValues()
        return cell
    }
    
    
    
    private func setupFlowLayout() { //cell layout 지정
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.headerReferenceSize = CGSize(width: view.bounds.width, height: 170)
        flowLayout.itemSize = CGSize(width: view.bounds.width, height: 120)
       // flowLayout.minimumInteritemSpacing = 10
        flowLayout.minimumLineSpacing = 20
        flowLayout.sectionInset = UIEdgeInsets(top: 15, left: 0, bottom: 0, right: 0)

        self.issueItemCollectionView.collectionViewLayout = flowLayout
    }
}
