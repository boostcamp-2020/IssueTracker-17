//
//  UIColor+Extention.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//
import UIKit
extension UIColor {
    func colorWithHexString (hex:String) -> UIColor {
        var str = hex
        if (str.hasPrefix("#")) {
            str.removeFirst()
        }
        if (str.count != 6) {
            return .red
        }
        var r="" ,g="" ,b = ""
        r = String(str[...str.index(str.startIndex, offsetBy: 1)])
        g = String(str[str.index(str.startIndex,offsetBy: 2)...str.index(str.index(str.startIndex,offsetBy: 2), offsetBy: 1)])
        b = String(str[str.index(str.startIndex,offsetBy: 4)...str.index(str.index(str.startIndex,offsetBy: 4), offsetBy: 1)])
        guard let R = UInt8(r, radix: 16), let G = UInt8(g, radix: 16), let B = UInt8(b, radix: 16) else {
            return .red
        }
        return UIColor(red: CGFloat(R) / 255.0, green: CGFloat(G) / 255.0, blue: CGFloat(B) / 255.0, alpha: CGFloat(1.0))
    }
    func toHex() -> String? {
        guard let components = cgColor.components, components.count >= 3 else {
            return nil
        }
        let r = Float(components[0])
        let g = Float(components[1])
        let b = Float(components[2])
        return String(format: "#%02lX%02lX%02lX", lroundf(r * 255), lroundf(g * 255), lroundf(b * 255))
    }
}
