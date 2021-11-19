"use strict";
exports.__esModule = true;
exports.findLowestEmployee = exports.getSubordinates = exports.getBoss = void 0;
/**
 * Given an employee, will find the node above (if any).
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function getBoss(tree, employeeName) {
    var res = tree.findBoss(employeeName);
    console.log("[getBoss]: " + employeeName + "'s boss is " + res.value.name);
    return res;
}
exports.getBoss = getBoss;
/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
function getSubordinates(tree, employeeName) {
    var res = tree.findSubordinates(employeeName);
    var namesList = [];
    res.forEach(function (el) { namesList.push(el.value.name); });
    console.log("[getSubordinate]: " + employeeName + "'s subordinates are " + namesList.join(' '));
    return res;
}
exports.getSubordinates = getSubordinates;
/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {
}
exports.findLowestEmployee = findLowestEmployee;
