//
//  LabelDetailViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit
@available(iOS 14.0, *)
class LabelDetailViewController: UIViewController {
    var labelRepository = LabelRepository()
    var label = Label()
    var activeTextFieldYPosition: CGFloat = 0.0
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var descriptionTextField: UITextField!
    @IBOutlet weak var colorTextField: UITextField!
    @IBOutlet weak var colorPickerButton: UIButton!
    @IBAction func colorPickerButtonAction(_ sender: UIButton) {
        let picker = UIColorPickerViewController()
        picker.delegate = self
        picker.selectedColor = UIColor().colorWithHexString(hex: label.color)
        picker.supportsAlpha = false
        present(picker, animated: true, completion: nil)
    }
    @IBOutlet weak var randomColorButton: UIButton!
    @IBAction func randomColorButtonAction(_ sender: UIButton) {
        let hex = String(format: "#%02lX%02lX%02lX", lroundf(Float.random(in: 0...256)), lroundf(Float.random(in: 0...256)), lroundf(Float.random(in: 0...256)))
        colorTextField.text = hex
        colorPickerButton.backgroundColor = UIColor().colorWithHexString(hex: hex)
    }
    @IBAction func exitButtonAction(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func saveButtonAction(_ sender: UIButton) {
        label.title = nameTextField.text ?? ""
        label.contents = descriptionTextField.text ?? ""
        label.color = colorTextField.text ?? "#000000"
        do {
            if(label.id == -1) {
                try labelRepository.insert(item: label.model)
            } else {
                try labelRepository.update(item: label.model)
            }
        } catch (let error) {
            print(error)
        }
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func resetButtonAction(_ sender: UIButton) {
        setValue(label: Label())
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
    }
    func configure() {
        randomColorButton.layer.cornerRadius = randomColorButton.frame.height / 2
        colorPickerButton.layer.borderColor = UIColor.black.cgColor
        colorPickerButton.layer.borderWidth = 2
        setValue(label: label)
        nameTextField.delegate = self
        descriptionTextField.delegate = self
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)
        
    }
    func setValue(label: Label) {
        nameTextField.text = label.title
        descriptionTextField.text = label.contents
        colorTextField.text = label.color
        colorPickerButton.backgroundColor = UIColor().colorWithHexString(hex: label.color)
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
@available(iOS 14.0, *)
extension LabelDetailViewController: UIColorPickerViewControllerDelegate {
    func colorPickerViewControllerDidSelectColor(_ viewController: UIColorPickerViewController) {
        let color = viewController.selectedColor
        colorTextField.text = color.toHex()!
        colorPickerButton.backgroundColor = color
        dismiss(animated: true, completion: nil)
    }
}
extension LabelDetailViewController: UITextFieldDelegate {
    func textFieldDidBeginEditing(_ textField: UITextField) {
        activeTextFieldYPosition = textField.frame.origin.y + textField.frame.height
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
}
