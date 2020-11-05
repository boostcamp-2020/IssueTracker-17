//
//  IssueItemViewController.swift
//  IssueTracker
//
//  Created by 이상윤 on 2020/11/03.
//

import UIKit

class IssueItemViewController: UIViewController {
    enum ViewState {
        case expanded
        case collapsed
    }
    @IBOutlet weak var issueItemCollectionView: UICollectionView!
    var data: [String] = ["댓글1", "댓글2", "댓글3", "댓글4", "댓글5"]
    var issueAddCommentViewController: IssueAddCommentViewController!
    var visualEffectView: UIVisualEffectView!
    var issueAddCommentViewHeight: Int = 0
    let issueAddCommentViewHandleAreaHeight = 150
    var issueAddCommentViewVisible = false
    var nextState:ViewState {
        return issueAddCommentViewVisible ? .collapsed : .expanded
    }
    var runningAnimations = [UIViewPropertyAnimator]()
    var animationProgressWhenInterrupted:CGFloat = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.tabBarController?.tabBar.isHidden = true
        issueAddCommentViewHeight = Int(self.view.frame.height - 150)
        issueItemCollectionView.delegate = self
        issueItemCollectionView.dataSource = self
        issueItemCollectionView.register(UINib(nibName: "IssueItemCollectionViewCell", bundle: nil), forCellWithReuseIdentifier: "IssueItemCollectionViewCell")
        setupFlowLayout()
        setupIssueAddCommentView()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        self.visualEffectView.isUserInteractionEnabled = false
    }
    
    func setupIssueAddCommentView() {
        visualEffectView = UIVisualEffectView()
        visualEffectView.frame = self.view.frame
        self.view.addSubview(visualEffectView)
        issueAddCommentViewController = IssueAddCommentViewController(nibName: "IssueAddCommentSubView", bundle: nil)
        self.addChild(issueAddCommentViewController)
        self.view.addSubview(issueAddCommentViewController.view)
        issueAddCommentViewController.view.frame = CGRect(x: 0, y: Int(self.view.frame.height) - issueAddCommentViewHandleAreaHeight, width: Int(self.view.bounds.width), height: issueAddCommentViewHeight)
        issueAddCommentViewController.view.clipsToBounds = true
        let panGestureRecognizer = UIPanGestureRecognizer(target: self, action: #selector(handleViewPan(recognizer:)))
        issueAddCommentViewController.handleArea.addGestureRecognizer(panGestureRecognizer)
    }
    
    @objc
    func handleViewPan (recognizer:UIPanGestureRecognizer) {
        switch recognizer.state {
        case .began:
            startInteractiveTransition(state: nextState, duration: 0.9)
        case .changed:
            let translation = recognizer.translation(in: self.issueAddCommentViewController.handleArea)
            var fractionComplete = translation.y / CGFloat(issueAddCommentViewHeight)
            fractionComplete = issueAddCommentViewVisible ? fractionComplete : -fractionComplete
            updateInteractiveTransition(fractionCompleted: fractionComplete)
        case .ended:
            continueInteractiveTransition()
        default:
            break
        }
        
    }
    
    func animateTransitionIfNeeded (state:ViewState, duration:TimeInterval) {
        if runningAnimations.isEmpty {
            let frameAnimator = UIViewPropertyAnimator(duration: duration, dampingRatio: 1) {
                switch state {
                case .expanded:
                    self.issueAddCommentViewController.view.frame.origin.y = self.view.frame.height - CGFloat(self.issueAddCommentViewHeight)
                case .collapsed:
                    self.issueAddCommentViewController.view.frame.origin.y = self.view.frame.height - CGFloat(self.issueAddCommentViewHandleAreaHeight)
                }
            }
            
            frameAnimator.addCompletion { _ in
                self.issueAddCommentViewVisible = !self.issueAddCommentViewVisible
                self.runningAnimations.removeAll()
            }
            
            frameAnimator.startAnimation()
            runningAnimations.append(frameAnimator)
            
            let cornerRadiusAnimator = UIViewPropertyAnimator(duration: duration, curve: .linear) {
                switch state {
                case .expanded:
                    self.issueAddCommentViewController.view.layer.cornerRadius = 12
                case .collapsed:
                    self.issueAddCommentViewController.view.layer.cornerRadius = 0
                }
            }
            cornerRadiusAnimator.startAnimation()
            runningAnimations.append(cornerRadiusAnimator)
            let blurAnimator = UIViewPropertyAnimator(duration: duration, dampingRatio: 1) {
                switch state {
                case .expanded:
                    self.visualEffectView.effect = UIBlurEffect(style: .dark)
                case .collapsed:
                    self.visualEffectView.effect = nil
                }
            }
            blurAnimator.startAnimation()
            runningAnimations.append(blurAnimator)
        }
    }
    
    func startInteractiveTransition(state:ViewState, duration:TimeInterval) {
        if runningAnimations.isEmpty {
            animateTransitionIfNeeded(state: state, duration: duration)
        }
        for animator in runningAnimations {
            animator.pauseAnimation()
            animationProgressWhenInterrupted = animator.fractionComplete
        }
    }
    
    func updateInteractiveTransition(fractionCompleted:CGFloat) {
        for animator in runningAnimations {
            animator.fractionComplete = fractionCompleted + animationProgressWhenInterrupted
        }
    }
    
    func continueInteractiveTransition (){
        for animator in runningAnimations {
            animator.continueAnimation(withTimingParameters: nil, durationFactor: 0)
        }
    }
}

extension IssueItemViewController: UICollectionViewDelegate, UICollectionViewDataSource {
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        return 1 //카테코리 수
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return data.count //카테고리 별 아이템 수
    }
    
    func collectionView(_ collectionView: UICollectionView, viewForSupplementaryElementOfKind kind: String, at indexPath: IndexPath) -> UICollectionReusableView {
        guard let issueHeaderView = collectionView.dequeueReusableSupplementaryView(ofKind: kind, withReuseIdentifier: "IssueHeaderCollectionViewCell", for: indexPath) as? IssueHeaderCollectionViewCell else{
            return UICollectionReusableView()
        }
        issueHeaderView.setupHeaderSection()
        return issueHeaderView
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        guard let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "IssueItemCollectionViewCell", for: indexPath) as? IssueItemCollectionViewCell else {
            return UICollectionViewCell()
        }
        cell.setupCellValues()
        return cell
    }
    
    
    
    private func setupFlowLayout() { //cell layout 지정
        let flowLayout = UICollectionViewFlowLayout()
        flowLayout.headerReferenceSize = CGSize(width: view.bounds.width, height: 170)
        flowLayout.itemSize = CGSize(width: view.bounds.width, height: 120)
        // flowLayout.minimumInteritemSpacing = 10
        flowLayout.minimumLineSpacing = 20
        flowLayout.sectionInset = UIEdgeInsets(top: 15, left: 0, bottom: 0, right: 0)
        
        self.issueItemCollectionView.collectionViewLayout = flowLayout
    }
}
