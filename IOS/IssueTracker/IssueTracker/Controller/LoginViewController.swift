//
//  LoginController.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/27.
//

import UIKit
import AuthenticationServices
class LoginViewController: UIViewController {
    @IBAction func signInWithGithubButtonTouch(_ sender: UIButton) {
        LoginManager.shared.requestCodeToGithub()
    }
    @IBAction func signInWithAppleButtonTouch(_ sender: UIButton) {
        let request = ASAuthorizationAppleIDProvider().createRequest()
        request.requestedScopes = [.fullName, .email]
        let controller = ASAuthorizationController(authorizationRequests: [request])
        controller.delegate = self as ASAuthorizationControllerDelegate
        controller.presentationContextProvider = self as? ASAuthorizationControllerPresentationContextProviding
        controller.performRequests()
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self, selector: #selector(moveTabBarView), name: .loginSuccess, object: nil)
    }
    override func viewDidAppear(_ animated: Bool) {
        if UserDefaults.standard.value(forKey: "UserToken") != nil {
            moveTabBarView()
        }
    }
    
    @objc func moveTabBarView() {
        guard let vcName = self.storyboard?.instantiateViewController(withIdentifier: "tabBarController") else {
            return
        }
        vcName.modalPresentationStyle = .overFullScreen
        self.present(vcName, animated: true, completion: nil)
        
    }
}
extension LoginViewController: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        if let credential = authorization.credential as? ASAuthorizationAppleIDCredential {
            var userVO = UserVO(type: 2)
            userVO.identifier = credential.user
            if let fullName = credential.fullName {
                userVO.name = fullName.description
            } else {
                userVO.name = "appleUser" + credential.user
            }
            let userRepository = UserRepository()
            do {
                try userRepository.insert(item: userVO)
            } catch(let error) {
                print(error)
            }
        }
    }
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        print(error)
    }
}
