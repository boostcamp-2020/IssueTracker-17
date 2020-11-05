//
//  FilterIssueViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/10/28.
//

import UIKit

class IssueFilterViewController: UIViewController {
    @IBOutlet weak var filterTableView: UITableView!
    let data = [[
        "열린 이슈들","내가 작성한 이슈들","나한테 할당된 이슈들","내가 댓글을 남긴 이슈들","닫힌 이슈들"
    ],
    [
        "작성자","레이블","마일스톤","담당자"
    ]]
    override func viewDidLoad() {
        super.viewDidLoad()
        filterTableView.delegate = self
        filterTableView.dataSource = self
    }
}

extension IssueFilterViewController: UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        filterTableView.deselectRow(at: indexPath, animated: true)
        if indexPath.section == 0 {
            if filterTableView.cellForRow(at: indexPath)?.accessoryType == UITableViewCell.AccessoryType.checkmark {
                filterTableView.cellForRow(at: indexPath)?.accessoryType = UITableViewCell.AccessoryType.none
            }else {
                self.filterTableView.cellForRow(at: indexPath)?.accessoryType = UITableViewCell.AccessoryType.checkmark
            }
        }
    }
}

extension IssueFilterViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, heightForHeaderInSection section: Int) -> CGFloat {
        return 50
    }
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        if section == 0 {
            return "다음 중에 조건을 고르세요"
        }else {
            return "세부 조건"
        }
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        data.count
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return data[section].count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = data[indexPath.section][indexPath.row]
        cell.backgroundColor = .white
        if indexPath.section == 1 {
            cell.accessoryType = .disclosureIndicator
        }
        return cell
    }
    
}
