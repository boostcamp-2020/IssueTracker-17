//
//  LabelDetailViewController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//

import UIKit
@available(iOS 14.0, *)
class LabelDetailViewController: UIViewController {
    var label = Label()
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var descriptionTextField: UITextField!
    @IBOutlet weak var colorTextField: UITextField!
    @IBOutlet weak var colorPickerButton: UIButton!
    @IBAction func colorPickerButtonAction(_ sender: UIButton) {
        let picker = UIColorPickerViewController()
        picker.delegate = self
        present(picker, animated: true, completion: nil)
    }
    @IBOutlet weak var randomColorButton: UIButton!
    @IBAction func randomColorButtonAction(_ sender: UIButton) {
        let hex =  String(format: "#%02lX%02lX%02lX", lroundf(Float.random(in: 0...256)), lroundf(Float.random(in: 0...256)), lroundf(Float.random(in: 0...256)))
        colorTextField.text = hex
        colorPickerButton.backgroundColor = UIColor().colorWithHexString(hex: hex)
    }
    @IBAction func exitButtonAction(_ sender: UIButton) {
        self.dismiss(animated: true, completion: nil)
    }
    @IBAction func saveButtonAction(_ sender: UIButton) {
        label.name = nameTextField.text ?? ""
        label.description = descriptionTextField.text ?? ""
        label.color = colorTextField.text ?? "#000000"
        // TODO: 서버로 데이터 보내기
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
    }
    func setValue(label : Label){
        nameTextField.text = label.name
        descriptionTextField.text = label.description
        colorTextField.text = label.color
        colorPickerButton.backgroundColor = UIColor().colorWithHexString(hex: label.color)
    }
}
@available(iOS 14.0, *)
extension LabelDetailViewController : UIColorPickerViewControllerDelegate {
    func colorPickerViewControllerDidFinish(_ viewController: UIColorPickerViewController) {
        dismiss(animated: true, completion: nil)
    }
    func colorPickerViewControllerDidSelectColor(_ viewController: UIColorPickerViewController) {
        let color = viewController.selectedColor
        colorTextField.text = color.toHex()!
        colorPickerButton.backgroundColor = color
    }
}
