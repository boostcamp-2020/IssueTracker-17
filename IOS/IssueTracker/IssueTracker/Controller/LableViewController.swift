//
//  LableViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit

class LabelViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    @IBAction func addLableButtonAction(_ sender: Any) {
        NotificationCenter.default.post(name: .loadLableData, object: nil)
        openDetailView()
    }
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
        self.collectionView.contentInset = UIEdgeInsets(top: 10, left: 0, bottom: 0, right: 0)
    }
    func openDetailView() {
        if #available(iOS 14.0, *) {
            guard let vcName = self.storyboard?.instantiateViewController(withIdentifier: "LableDetailViewController") as? LableDetailViewController else {
                return
            }
            vcName.modalPresentationStyle = .formSheet
            vcName.lable.name = "123"
            self.present(vcName, animated: true, completion: nil)
        }
    }
    
}
extension LabelViewController: UICollectionViewDelegate, UICollectionViewDataSource,UICollectionViewDelegateFlowLayout {
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
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        openDetailView()
        NotificationCenter.default.post(name: .loadLableData, object: lables[indexPath.row])
        NotificationCenter.default.post(name: .test, object: nil)
        NotificationCenter.default.post(name: Notification.Name("NotificationIdentifier"), object: nil)
    }
}
