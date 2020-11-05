//
//  LabelDetailViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit
class MilestoneDetailViewController: UIViewController {
    var milestone = Milestone()
    var milestoneRepository = MilestoneRepository()
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
        do {
            if milestone.id == -1 {
                try milestoneRepository.insert(item: MilestoneVO(name: milestone.name, description: milestone.description, endDate: milestone.endDate, id: milestone.id, status: milestone.status))
            } else {
                try milestoneRepository.update(item: MilestoneVO(name: milestone.name, description: milestone.description, endDate: milestone.endDate, id: milestone.id, status: milestone.status))
            }
        } catch (let error) {
            print(error)
        }
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
