// ==UserScript==
// @name         APIdebug
// @namespace    https://github.com/List-KR/Debugger
// @homepageURL  https://github.com/List-KR/Debugger
// @supportURL   https://github.com/List-KR/Debugger/issues
// @updateURL    https://github.com/List-KR/Debugger/raw/main/APIdebug.user.js
// @downloadURL  https://github.com/List-KR/Debugger/raw/main/APIdebug.user.js
// @license      MIT
//
// @version      1.0
// @author       PiQuark6046 and contributors
//
// @match        *://*/*
//
// @description  APIdebug logs activities of a website by overriding Javascript API
//
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(() => {
    const win = unsafeWindow != undefined ? unsafeWindow : window

    win.JSON.parse = new Proxy(
    win.JSON.parse,
    {
        apply: (target, thisArg, argsList) =>
        {
            const original = Reflect.apply(target, thisArg, argsList)
            console.debug("JSON.parse -> ", original)
            return original
        }
    })

    win.TextDecoder.prototype.decode = new Proxy(
    win.TextDecoder.prototype.decode,
    {
        apply: (target, thisArg, argsList) =>
        {
            const original = Reflect.apply(target, thisArg, argsList)
            console.debug("TextDecoder.prototype.decode -> ", original)
            return original
        }
    })

    win.Element.prototype.append = new Proxy(
    win.Element.prototype.append,
    {
        apply: (target, thisArg, argsList) =>
        {
            console.debug("Element.prototype.append -> ", [target, thisArg, argsList])
            Reflect.apply(target, thisArg, argsList)
        }
    })

    win.EventTarget.prototype.addEventListener = new Proxy(
    win.EventTarget.prototype.addEventListener,
    {
        apply: (target, thisArg, argsList) =>
        {
            console.debug("EventTarget.prototype.addEventListener -> ", [target, thisArg, argsList])
            Reflect.apply(target, thisArg, argsList)
        }
    })
})();