//
//  LableViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit

class LableViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    var lables: [Lable] {
        var lables : [Lable] = []
        lables.append(Lable(name: "feature", description: "기능에 대한 레이블입니다.", color: "#BEDBFD"))
        lables.append(Lable(name: "bug", description: "수정할 버그에 대한 레이블입니다.", color: "#F26E6E"))
        return lables
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        self.collectionView.delegate = self
        self.collectionView.dataSource = self
        self.collectionView.register(UINib(nibName: "LableCollectionViewCell", bundle: .main), forCellWithReuseIdentifier: "LableCollectionViewCell")
        
    }
}
extension LableViewController: UICollectionViewDelegate, UICollectionViewDataSource,UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return lables.count
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "LableCollectionViewCell", for: indexPath) as? LableCollectionViewCell else {
            return UICollectionViewCell()
        }
        cell.lableColor = lables[indexPath.row].color
        cell.nameText = lables[indexPath.row].name
        cell.descriptionText = lables[indexPath.row].description
        return cell
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width, height: 60)
    }
}
