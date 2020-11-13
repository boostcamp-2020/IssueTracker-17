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
    var activeTextFieldYPosition: CGFloat = 0.0
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var descriptionTextField: UITextField!
    @IBOutlet weak var endDatePicker: UIDatePicker!
    @IBAction func exitButtonAction(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func saveButtonAction(_ sender: UIButton) {
        milestone.title = nameTextField.text ?? ""
        milestone.contents = descriptionTextField.text ?? ""
        milestone.until = endDatePicker.date
        do {
            if milestone.id == -1 {
                try milestoneRepository.insert(item: milestone.model)
            } else {
                if milestone.title == "", milestone.contents == "" {
                    try milestoneRepository.delete(item: milestone.model)
                } else {
                    try milestoneRepository.update(item: milestone.model)
                }
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
        nameTextField.delegate = self
        descriptionTextField.delegate = self
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    func setValue(milestone: Milestone) {
        nameTextField.text = milestone.title
        descriptionTextField.text = milestone.contents
        endDatePicker.date = milestone.until
    }
    @objc func keyboardWillShow(notification: NSNotification) {
        if let keyboardSize = (notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue {
            let distanceBetweenSelectedTextFieldAndKeyboard = self.view.frame.height - activeTextFieldYPosition - keyboardSize.height
            if distanceBetweenSelectedTextFieldAndKeyboard < 0 {
                UIView.animate(withDuration: 0.4) {
                    self.view.transform = CGAffineTransform(translationX: 0.0, y: distanceBetweenSelectedTextFieldAndKeyboard)
                }
            }
        }
    }
    @objc func keyboardWillHide(notification: NSNotification) {
        UIView.animate(withDuration: 0.4) {
            self.view.transform = .identity
        }
    }
}
extension MilestoneDetailViewController: UITextFieldDelegate {
    func textFieldDidBeginEditing(_ textField: UITextField) {
        activeTextFieldYPosition = textField.frame.origin.y + textField.frame.height
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
