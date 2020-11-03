//
//  LableViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit

class LabelViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    @IBAction func addLabelButtonAction(_ sender: Any) {
        openDetailView(label: Label())
    }
    var labels = [Label]()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.collectionView.delegate = self
        self.collectionView.dataSource = self
        self.collectionView.register(UINib(nibName: "LabelCollectionViewCell", bundle: .main), forCellWithReuseIdentifier: "LabelCollectionViewCell")
        self.collectionView.contentInset = UIEdgeInsets(top: 10, left: 0, bottom: 0, right: 0)
        configure()
    }
    func configure() {
        NotificationCenter.default.addObserver(self, selector: #selector(saveLabelData), name: .saveLabelData, object: nil)
        labels.append(Label(name: "feature", description: "기능에 대한 레이블입니다.", color: "#BEDBFD"))
        labels.append(Label(name: "bug", description: "수정할 버그에 대한 레이블입니다.", color: "#F26E6E"))
    }
    func openDetailView(label: Label) {
        if #available(iOS 14.0, *) {
            guard let vcName = self.storyboard?.instantiateViewController(withIdentifier: "LabelDetailViewController") as? LabelDetailViewController else {
                return
            }
            vcName.modalPresentationStyle = .formSheet
            vcName.label = label
            self.present(vcName, animated: true, completion: nil)
        }
    }
    @objc func saveLabelData() {
        // TODO: Label 서버에서 가져온 후 리로드
        collectionView.reloadData()
    }
}
extension LabelViewController: UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return labels.count
    }
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "LabelCollectionViewCell", for: indexPath) as? LabelCollectionViewCell else {
            return UICollectionViewCell()
        }
        cell.labelName.backgroundColor = UIColor().colorWithHexString(hex: labels[indexPath.row].color)
        cell.labelName.text = labels[indexPath.row].name
        cell.descriptionLable.text = labels[indexPath.row].description
        return cell
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width, height: 60)
    }
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        openDetailView(label: labels[indexPath.row])
    }
}
