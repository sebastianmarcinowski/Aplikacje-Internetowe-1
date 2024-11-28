/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var msg = "Hello";
// alert(msg);
var styles = new Map([["default", "LabE-Style/page1.css"], ["dark", "LabE-Style/page2.css"], ["light", "LabE-Style/page3.css"], ["colorful", "LabE-Style/page4.css"]]);
function styleSwap(style) {
  var oldLink = document.querySelector("link[rel='stylesheet']");
  if (oldLink) {
    oldLink.remove();
  }
  var newLink = document.createElement("link");
  newLink.rel = "stylesheet";
  newLink.href = styles.get(style) || "";
  document.head.appendChild(newLink);
}
function addStyle(name, path) {
  var _a;
  styles.set(name, path);
  var button = document.createElement("button");
  button.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  button.addEventListener("click", function () {
    return styleSwap(name);
  });
  (_a = document.querySelector("footer")) === null || _a === void 0 ? void 0 : _a.appendChild(button);
}
document.addEventListener("DOMContentLoaded", function () {
  var footer = document.querySelector("footer");
  if (footer) {
    var styleSelector = document.createElement("div");
    footer.appendChild(styleSelector);
    styles.forEach(function (_, style) {
      addStyle(style, styles.get(style) || "");
    });
  }
});
/******/ })()
;