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
        // Do any additional setup after loading the view.
    }
}
extension LoginViewController: ASAuthorizationControllerDelegate {
    func authorizationController(controller: ASAuthorizationController, didCompleteWithAuthorization authorization: ASAuthorization) {
        if let credential = authorization.credential as? ASAuthorizationAppleIDCredential {
            let user = credential.user
            print("User : \(user)")
            if let email = credential.email {
                print("Email : \(email)")
            }
            if let fullName = credential.fullName {
                print("Full Name : \(fullName)")
            }
        }
    }
    func authorizationController(controller: ASAuthorizationController, didCompleteWithError error: Error) {
        print(error)
    }
}
