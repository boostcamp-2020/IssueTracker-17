//
//  UIColor+Extention.swift
//  IssueTracker
//
//  Created by 김병인 on 2020/10/28.
//
import UIKit
extension UIColor {
    func colorWithHexString (hex: String) -> UIColor {
        var str = hex
        if str.hasPrefix("#") {
            str.removeFirst()
        }
        if str.count != 6 {
            return .red
        }
        var red = "", green = "", blue = ""
        red = String(str[...str.index(str.startIndex, offsetBy: 1)])
        green = String(str[str.index(str.startIndex, offsetBy: 2)...str.index(str.index(str.startIndex, offsetBy: 2), offsetBy: 1)])
        blue = String(str[str.index(str.startIndex, offsetBy: 4)...str.index(str.index(str.startIndex, offsetBy: 4), offsetBy: 1)])
        guard let redHexValue = UInt8(red, radix: 16), let greenHexValue = UInt8(green, radix: 16), let blueHexValue = UInt8(blue, radix: 16) else {
            return .red
        }
        return UIColor(red: CGFloat(redHexValue) / 255.0, green: CGFloat(greenHexValue) / 255.0, blue: CGFloat(blueHexValue) / 255.0, alpha: CGFloat(1.0))
    }
    func toHex() -> String? {
        guard let components = cgColor.components, components.count >= 3 else {
            return nil
        }
        let red = Float(components[0])
        let green = Float(components[1])
        let blue = Float(components[2])
        return String(format: "#%02lX%02lX%02lX", lroundf(red * 255), lroundf(green * 255), lroundf(blue * 255))
    }
}
