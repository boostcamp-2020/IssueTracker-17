//
//  NewIssueViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/10/28.
//

import UIKit
import MarkdownView
import Alamofire
class IssueDetailViewController: UIViewController {
    var activeTextFieldYPosition: CGFloat = 0.0
    @IBOutlet weak var navigationItemOutlet: UINavigationItem!
    @IBAction func cancleButton(_ sender: UIBarButtonItem) {
        self.dismiss(animated: true)
    }
    @IBAction func submitButton(_ sender: Any) {
        issue.title = titleTextField.text ?? ""
        issue.contents = issueContentTextView.text ?? ""
        do {
            if issue.id == -1 {
                try issueRepository.insert(item: issue.model)
            } else {
                try issueRepository.update(item: issue.model)
            }
        } catch (let error) {
            print(error)
        }
        self.dismiss(animated: true, completion: nil)
    }
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var issueContentTextView: IssueContentTextView!
    @IBAction func markdownSegmentedControl(_ sender: UISegmentedControl) {
        switch sender.selectedSegmentIndex {
        case 0:
            markdownPreview?.removeFromSuperview()
            markdownPreview = nil
            issueContentTextView.isHidden = false
        case 1:
            issueContentTextView.isHidden = true
            showMarkdownPreview()
        default:
            break
        }
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        configure()
    }
    var issue = Issue()
    private let issueRepository = IssueRepository()
    private var pickerView = UIImagePickerController()
    private var markdownPreview: MarkdownView? {
        willSet {
            guard let markdownPreview = newValue else { return }
            view.addSubview(markdownPreview)
            markdownPreview.translatesAutoresizingMaskIntoConstraints = false
            
            NSLayoutConstraint.activate([
                markdownPreview.topAnchor.constraint(equalTo: issueContentTextView.topAnchor),
                markdownPreview.bottomAnchor.constraint(equalTo: issueContentTextView.bottomAnchor),
                markdownPreview.leadingAnchor.constraint(equalTo: issueContentTextView.leadingAnchor),
                markdownPreview.trailingAnchor.constraint(equalTo: issueContentTextView.trailingAnchor)
            ])
        }
    }
    private func configure() {
        pickerView.delegate = self
        self.navigationItem.largeTitleDisplayMode = .automatic
        navigationItemOutlet.title = issue.id == -1 ? "새 이슈" : "#\(issue.id)"
        registerMenu()
        configureIssueContentTextView()
        setValue(issue: issue)
        titleTextField.delegate = self
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide), name: UIResponder.keyboardWillHideNotification, object: nil)

    }
    func setValue(issue: Issue) {
        titleTextField.text = issue.title
        issueContentTextView.text = issue.contents
    }
    private func showMarkdownPreview() {
        markdownPreview = MarkdownView()
        guard let markdownPreview = markdownPreview,
              let text = issueContentTextView.text else { return }
        markdownPreview.load(markdown: text)
    }
    private func registerMenu() {
        let menuItem = UIMenuItem(title: "Insert Photo", action: #selector(IssueContentTextView.openGallery))
        UIMenuController.shared.menuItems = [menuItem]
    }
    private func configureIssueContentTextView() {
        issueContentTextView.openGalleryHandler = { [weak self] in
            guard let self = self else { return }
            self.pickerView.sourceType = .photoLibrary
            self.present(self.pickerView, animated: true, completion: nil)
        }
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
extension IssueDetailViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        guard let image = info[.originalImage] as? UIImage else {
            return
        }
        pickerView.dismiss(animated: true, completion: nil)
        let url = RestApiServerURL.image
        let imgData = image.jpegData(compressionQuality: 0.2)!
        AF.upload(multipartFormData: { multipartFormData in
            multipartFormData.append(Data("value".utf8), withName: "img")
            multipartFormData.append(imgData, withName: "img",fileName: "a.jpg", mimeType: "image/jpg")
        }, to: url).responseJSON() {
            response in
            switch response.result {
            case .success:
                if let jsonArray = try! response.result.get() as? [String: Any]{
                    if let imageUrl = jsonArray["result"] as? String {
                        self.issueContentTextView.text.append(imageUrl)
                    }
                }
            case .failure(let error):
                print(error)
            }
        }
    }
}
extension IssueDetailViewController: UITextFieldDelegate {
    func textFieldDidBeginEditing(_ textField: UITextField) {
        activeTextFieldYPosition = textField.frame.origin.y + textField.frame.height
    }
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        textField.resignFirstResponder()
        return true
    }
   override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?){
         self.view.endEditing(true)
   }
}
