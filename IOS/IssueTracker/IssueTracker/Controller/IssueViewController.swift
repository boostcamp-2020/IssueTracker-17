//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/10/27.
//

import UIKit

class IssueViewController: UIViewController, UISearchBarDelegate {
    
    @IBOutlet weak var issueTableView: UITableView!
    @IBOutlet var issueFilterButton: UIBarButtonItem!
    @IBAction func addIssueButtonAction(_ sender: Any) {
        openDetailView(issue: Issue())
    }
    var selectData: [Issue] = Array()
    var selectAllCheck: Bool = false
    let toolbar = UIToolbar()
    private let searchController = UISearchController(searchResultsController: nil)
    var issues = [Issue]()
    var tempIssues = [Issue]()
    private let issueRepository = IssueRepository()
    
    @IBAction func tabTableEditButton(_ sender: UIBarButtonItem) {
        if issueTableView.isEditing {
            issueTableView.setEditing(false, animated: true)
            self.navigationItem.leftBarButtonItem = issueFilterButton
            self.tabBarController?.tabBar.alpha = 1
            toolbar.alpha = 0
        }else{
            let button = UIBarButtonItem(title: "Select All", style: .plain, target: self, action: #selector(tabSelectAllButton))
            self.navigationItem.leftBarButtonItem = button
            self.tabBarController?.tabBar.alpha = 0
            let flexibleSpace = UIBarButtonItem(barButtonSystemItem: .flexibleSpace, target: self, action: nil)
            let buttonIssue = UIBarButtonItem(title: "선택 이슈 닫기", style: .plain, target: self, action: nil)
            toolbar.setItems([flexibleSpace, buttonIssue], animated: true)
            toolbar.topAnchor.constraint(equalTo: issueTableView.bottomAnchor).isActive = true
            toolbar.alpha = 1
            issueTableView.setEditing(true, animated: true)
            issueTableView.allowsMultipleSelectionDuringEditing = true
        }
    }
    
    @objc func tabSelectAllButton(_ sender: UIButton) {
        if selectAllCheck {
            selectAllCheck = false
            self.navigationItem.leftBarButtonItem?.title = "Select All"
            for i in 0..<issues.count {
                self.issueTableView.deselectRow(at: IndexPath(row: i, section: 0), animated: false)
            }
        }else{
            selectAllCheck = true
            self.navigationItem.leftBarButtonItem?.title = "Deselect All"
            for i in 0..<issues.count {
                self.issueTableView.selectRow(at: IndexPath(row: i, section: 0), animated: false, scrollPosition: .none)
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tabBarController?.tabBar.isHidden = false
        configure()
    }
    
    override func viewWillAppear(_ animated: Bool) {
        self.tabBarController?.tabBar.isHidden = false
    }
    
    override func shouldPerformSegue(withIdentifier identifier: String, sender: Any?) -> Bool {
        if issueTableView.isEditing {
            return false
        }else{
            return true
        }
    }
    
    private func configure() {
        self.navigationItem.searchController = searchController
        searchController.searchBar.delegate = self
        issueTableView.dataSource = self
        issueTableView.delegate = self
        issueTableView.allowsMultipleSelectionDuringEditing = true
        NotificationCenter.default.addObserver(self, selector: #selector(saveIssueData), name: .saveIssueData, object: nil)
        getIssue()
        configToolbar()
    }
    
    func getIssue() {
        self.issues.removeAll()
        issueRepository.getAll {
            (arrayOfIssue) in
            if (arrayOfIssue != nil) {
                for issue in arrayOfIssue! {
                    self.issues.append(issue.decode())
                    self.tempIssues.append(issue.decode())
                }
            }
            self.issueTableView.reloadData()
        }
        self.issueTableView.reloadData()
    }
    
    func openDetailView(issue: Issue) {
        guard let vcName = self.storyboard?.instantiateViewController(withIdentifier: "IssueDetailViewController") as? IssueDetailViewController else {
            return
        }
        vcName.modalPresentationStyle = .formSheet
        vcName.issue = issue
        self.present(vcName, animated: true, completion: nil)
    }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        issues = tempIssues.filter({$0.title.lowercased().contains(searchText.lowercased()) })
        if searchText == "" {
            issues = tempIssues
        }
        issueTableView.reloadData()
    }
    
    func searchBarTextDidBeginEditing(_ searchBar: UISearchBar) {
        issues = tempIssues
        issueTableView.reloadData()
    }
    
    func configToolbar() {
        self.view.addSubview(toolbar)
        toolbar.translatesAutoresizingMaskIntoConstraints = false
        //toolbar.topAnchor.constraint(equalTo: self.tabBarController?.tabBar.topAnchor!).isActive = true
        toolbar.bottomAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.bottomAnchor).isActive = true
        toolbar.leadingAnchor.constraint(equalTo: self.view.leadingAnchor, constant: 0).isActive = true
        toolbar.trailingAnchor.constraint(equalTo: self.view.trailingAnchor, constant: 0).isActive = true
        toolbar.alpha = 0
    }
    
    @objc func saveIssueData() {
        getIssue()
        issueTableView.reloadData()
    }
}

extension IssueViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return issues.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "IssueViewCustomCell", for: indexPath) as? IssueViewCustomCell else {
            return UITableViewCell()
        }
        cell.issueTitleLabel.text = issues[indexPath.row].title
        cell.issueContentsLabel.text = issues[indexPath.row].contents
        cell.selectionStyle = .default
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 80
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        issueTableView.deselectRow(at: indexPath, animated: false)
        if issueTableView.isEditing {
            self.selectSelectCell(tableView: tableView, indexPath: indexPath)
            print("select", indexPath)
        }else{
            let vc = self.storyboard?.instantiateViewController(identifier: "IssueItemViewController") as! IssueItemViewController
            vc.issue = issues[indexPath.row]
            present(vc, animated: true, completion: nil)
        }
    }
    
    func tableView(_ tableView: UITableView, didDeselectRowAt indexPath: IndexPath) {
        self.selectSelectCell(tableView: tableView, indexPath: indexPath)
        print("deselect", indexPath)
    }
    
    func tableView(_ tableView: UITableView, trailingSwipeActionsConfigurationForRowAt indexPath: IndexPath) -> UISwipeActionsConfiguration? {
        let delete = deleteAction(at: indexPath)
        return UISwipeActionsConfiguration(actions: [delete])
    }
    
    func deleteAction(at indexPath: IndexPath) -> UIContextualAction {
        let action = UIContextualAction(style: .destructive, title: "Delete", handler: { (action, view, completion) in
            completion(true)
        })
        return action
    }
}

extension IssueViewController {
    func selectSelectCell(tableView: UITableView, indexPath: IndexPath) {
        self.selectData.removeAll()
        if let selectTableData = issueTableView.indexPathsForSelectedRows {
            for index in selectTableData {
                selectData.append(issues[index.row])
            }
        }
    }
}
