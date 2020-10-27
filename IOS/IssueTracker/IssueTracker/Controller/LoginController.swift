//
//  LoginController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/27.
//

import UIKit

class LoginController: UIViewController {

    @IBAction func githubLoginButtonTouch(_ sender: UIButton) {
        LoginManager.shared.requestCodeToGithub()
    }
    
  

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }


}
