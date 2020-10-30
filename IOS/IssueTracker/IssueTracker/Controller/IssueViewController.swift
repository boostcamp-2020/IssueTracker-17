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
    var selectData: [tempData] = Array()
    var selectAllCheck: Bool = false
    private let searchController = UISearchController(searchResultsController: nil)
    let data = [tempData.init(title: "테스트1", contents: "테스트1입니다"),
                tempData.init(title: "테스트2", contents: "테스트2입니다"),
                tempData.init(title: "테스트3", contents: "테스트3입니다")]

    @IBAction func tabTableEditButton(_ sender: UIBarButtonItem) {
        if issueTableView.isEditing {
            issueTableView.setEditing(false, animated: true)
            self.navigationItem.leftBarButtonItem = issueFilterButton
            self.tabBarController?.tabBar.isHidden = false
        }else{
            let button = UIBarButtonItem(title: "Select All", style: .plain, target: self, action: #selector(tabSelectAllButton))
            self.navigationItem.leftBarButtonItem = button
            
            
            self.tabBarController?.tabBar.isHidden = true
            issueTableView.setEditing(true, animated: true)
            issueTableView.allowsMultipleSelectionDuringEditing = true
        }
    }
    
    @objc func tabSelectAllButton(_ sender: UIButton) {
        if selectAllCheck {
            selectAllCheck = false
            self.navigationItem.leftBarButtonItem?.title = "Select All"
            for i in 0..<data.count {
                self.issueTableView.deselectRow(at: IndexPath(row: i, section: 0), animated: false)
            }
        }else{
            selectAllCheck = true
            self.navigationItem.leftBarButtonItem?.title = "Deselect All"
            for i in 0..<data.count {
                self.issueTableView.selectRow(at: IndexPath(row: i, section: 0), animated: false, scrollPosition: .none)
            }
        }
    }
        
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationItem.searchController = searchController
        
        issueTableView.dataSource = self
        issueTableView.delegate = self
        issueTableView.allowsMultipleSelectionDuringEditing = true
    }
    
    func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
        print(searchText)
    }
}

extension IssueViewController: UITableViewDataSource, UITableViewDelegate {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return data.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "IssueViewCustomCell", for: indexPath) as? IssueViewCustomCell else {
            return UITableViewCell()
        }
        cell.issueTitleLabel.text = data[indexPath.row].title
        cell.issueContentsLabel.text = data[indexPath.row].contents
        return cell
    }
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 100
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        self.selectSelectCell(tableView: tableView, indexPath: indexPath)
        print("select", indexPath)
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
    
    func tabbar
}

extension IssueViewController {
    func selectSelectCell(tableView: UITableView, indexPath: IndexPath) {
        self.selectData.removeAll()
        if let selectTableData = issueTableView.indexPathsForSelectedRows {
            for index in selectTableData {
                selectData.append(data[index.row])
            }
        }
        print(selectData)
    }
}

struct tempData {
    var title: String
    var contents: String
}
