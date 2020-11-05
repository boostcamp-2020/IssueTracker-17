//
//  LabelDetailViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit
class MilestoneDetailViewController: UIViewController {
    var milestone = Milestone()
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var descriptionTextField: UITextField!
    @IBOutlet weak var endDatePicker: UIDatePicker!
    @IBAction func exitButtonAction(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func saveButtonAction(_ sender: UIButton) {
        milestone.name = nameTextField.text ?? ""
        milestone.description = descriptionTextField.text ?? ""
        milestone.endDate = endDatePicker.date
        // TODO: 서버로 데이터 보내기
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func resetButtonAction(_ sender: UIButton) {
        setValue(milestone: Milestone())
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
    }
    func configure() {
        setValue(milestone: milestone)
    }
    func setValue(milestone: Milestone) {
        nameTextField.text = milestone.name
        descriptionTextField.text = milestone.description
        endDatePicker.date = milestone.endDate
    }
}
