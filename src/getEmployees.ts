import { TreeNode } from "./manageEmployees";

/**
 * Given an employee, will find the node above (if any).
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(tree : TreeNode, employeeName : string) : TreeNode {
    let res = tree.findBoss(employeeName)
    console.log(`[getBoss]: ${employeeName}'s boss is ${res.value.name}`)
    return res
    
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(tree: TreeNode, employeeName : string) : Array<TreeNode>{
    let res = tree.findSubordinates(employeeName)
    let namesList : any = []
    res.forEach(el => {namesList.push( el.value.name)})
    console.log(`[getSubordinate]: ${employeeName}'s subordinates are ${namesList.join(' ')}`)
    return res
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function findLowestEmployee() {

}