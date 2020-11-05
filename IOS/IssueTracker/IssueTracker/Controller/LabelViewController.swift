//
//  LabelViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit

@available(iOS 14.0, *)
class LabelViewController: UIViewController {
    @IBOutlet weak var collectionView: UICollectionView!
    @IBAction func addLabelButtonAction(_ sender: Any) {
        openDetailView(label: Label())
    }
    var labels = [Label]()
    private let labelRepository = LabelRepository()
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
        labelRepository.getAll {
            (arrayOfLabel) in
            if (arrayOfLabel != nil) {
                for label in arrayOfLabel! {
                    self.labels.append(label.decode())
                }
                self.collectionView.reloadData()
            }
        }
    }
    func openDetailView(label: Label) {
            guard let vcName = self.storyboard?.instantiateViewController(withIdentifier: "LabelDetailViewController") as? LabelDetailViewController else {
                return
            }
            vcName.modalPresentationStyle = .formSheet
            vcName.label = label
            self.present(vcName, animated: true, completion: nil)
    }
    @objc func saveLabelData() {
        // TODO: Label 서버에서 가져온 후 리로드
        collectionView.reloadData()
    }
}
@available(iOS 14.0, *)
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
        cell.descriptionLabel.text = labels[indexPath.row].description
        return cell
    }
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: collectionView.frame.width, height: 60)
    }
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        openDetailView(label: labels[indexPath.row])
    }
}
