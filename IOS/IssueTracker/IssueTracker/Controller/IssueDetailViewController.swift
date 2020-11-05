//
//  NewIssueViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/10/28.
//

import UIKit
import MarkdownView
class IssueDetailViewController: UIViewController {
    @IBOutlet weak var navigationItemOutlet: UINavigationItem!
    @IBAction func cancleButton(_ sender: UIBarButtonItem) {
        self.dismiss(animated: true)
    }
    @IBAction func submitButton(_ sender: Any) {
        // TODO: 이슈 생성 및 저장
        self.dismiss(animated: true)
    }
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
        navigationItemOutlet.title = "새 이슈!"
        registerMenu()
        configureIssueContentTextView()
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
    
}
extension IssueDetailViewController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
        guard let image = info[.originalImage] as? UIImage else {
            return
        }
        pickerView.dismiss(animated: true, completion: nil)
        // TODO: 서버 전송
    }
}
