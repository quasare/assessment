"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.demoteEmployee = exports.promoteEmployee = exports.fireEmployee = exports.hireEmployee = exports.generateCompanyStructure = exports.TreeNode = void 0;
/**
 * Class Treenode
 *
 * Tree node for org chart
 */
var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.parent = null;
        this.descendants = [];
    }
    /**
     *
     * @param {val} string
     * @returns {TreeNode}
     */
    TreeNode.prototype.findBoss = function (val) {
        var toVisitStack = [this];
        while (toVisitStack.length) {
            var current = toVisitStack.pop();
            if (current.value.name === val)
                return current.parent;
            for (var _i = 0, _a = current.descendants; _i < _a.length; _i++) {
                var child = _a[_i];
                toVisitStack.push(child);
            }
        }
    };
    /**
   *
   * @param {val} string
   * @returns {TreeNode[]}
   */
    TreeNode.prototype.findSubordinates = function (val) {
        var toVisitStack = [this];
        var subordinatesList = [];
        while (toVisitStack.length) {
            var current = toVisitStack.pop();
            if (current.value.name === val)
                return current.descendants;
            for (var _i = 0, _a = current.descendants; _i < _a.length; _i++) {
                var child = _a[_i];
                toVisitStack.push(child);
            }
        }
    };
    /**
   *
   * @param {employee}
   * @param {boss} string
   * @returns {string}
   */
    TreeNode.prototype.hireEmployee = function (emp, boss) {
        var toVisitStack = [this];
        var subordinatesList = [];
        while (toVisitStack.length) {
            var current = toVisitStack.pop();
            if (current.value.name === boss)
                current.descendants.push(new TreeNode(emp));
            current.descendants.forEach(function (el) { subordinatesList.push(el.value.name); });
            return "[hireEmployee]: Added new employee (" + emp.name + ") with " + boss + " as their boss";
            for (var _i = 0, _a = current.descendants; _i < _a.length; _i++) {
                var child = _a[_i];
                toVisitStack.push(child);
            }
        }
    };
    /**
   *
   * @param {emp} string
   * @returns {string}
   */
    TreeNode.prototype.fireEmployee = function (emp) {
        var toVisitStack = [this];
        var randomIndex = null;
        var replacment = null;
        var firedName = '';
        while (toVisitStack.length) {
            var current = toVisitStack.pop();
            if (current.value.name === emp) {
                firedName = current.value.name;
                //Select random employe
                randomIndex = Math.floor(Math.random() * current.descendants.length);
                replacment = current.descendants[randomIndex];
                replacment.value.boss = current.value.boss;
                current.descendants.splice(randomIndex, 1);
                current.descendants.forEach(function (element) {
                    element.value.boss = replacment.value.name;
                });
                replacment.descendants = current.descendants;
                current.value = replacment;
                return "[fireEmployee]: Fired " + emp + " and replaced with " + replacment.value.name;
            }
            for (var _i = 0, _a = current.descendants; _i < _a.length; _i++) {
                var child = _a[_i];
                toVisitStack.push(child);
            }
        }
    };
    /**
     *
     * @param {emp} string
     * @returns {string}
     */
    TreeNode.prototype.promoteEmployee = function (emp) {
        var toVisitStack = [this];
        var _loop_1 = function () {
            var current = toVisitStack.pop();
            if (current.value.name === emp) {
                var demoted_1 = current.parent.value.name;
                current.parent.value.name = emp;
                current.parent.descendants.forEach(function (el) {
                    if (el.value.name === emp) {
                        el.value.name = demoted_1;
                    }
                    el.value.boss = emp;
                });
                return { value: "[promoteEmployee]: Promoted " + emp + " and made " + demoted_1 + " his subordinate" };
            }
            for (var _i = 0, _a = current.descendants; _i < _a.length; _i++) {
                var child = _a[_i];
                toVisitStack.push(child);
            }
        };
        while (toVisitStack.length) {
            var state_1 = _loop_1();
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    /**
      *
      * @param {emp} string
      * @param {sub} string
      * @returns
      */
    TreeNode.prototype.demoteEmployee = function (emp, sub) {
        var toVisitStack = [this];
        while (toVisitStack.length) {
            var current = toVisitStack.pop();
            if (current.value.name === emp) {
                current.descendants.forEach(function (el) {
                    el.value.boss = sub;
                    if (el.value.name === sub) {
                        el.value.name = emp;
                    }
                });
                current.value.name = sub;
                return "[demoteEmployee]: Demoted employee (demoted " + emp + " and replaced with " + sub + ")";
            }
            for (var _i = 0, _a = current.descendants; _i < _a.length; _i++) {
                var child = _a[_i];
                toVisitStack.push(child);
            }
        }
    };
    return TreeNode;
}());
exports.TreeNode = TreeNode;
/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
function generateCompanyStructure(employees) {
    //Remove emails from name
    console.log('Normalizing JSON file...');
    for (var _i = 0, employees_1 = employees; _i < employees_1.length; _i++) {
        var employee = employees_1[_i];
        if (employee.name.includes('@')) {
            employee.name = employee.name.split('@')[0];
            employee.name = employee.name[0].toUpperCase() + employee.name.substr(1);
        }
    }
    //Create nodes
    var empList = [];
    var nodesList = employees.forEach(function (emp) {
        empList.push(new TreeNode(emp));
    });
    //Create Hash map
    var idMapping2 = empList.reduce(function (acc, el, i) {
        acc[el.value.name] = i;
        return acc;
    }, {});
    var root;
    console.log('Generating employee tree...');
    empList.forEach(function (el) {
        // Handle the root element
        if (el.value.boss === null) {
            root = el;
            return root;
        }
        var parentEl = empList[idMapping2[el.value.boss]];
        el.parent = parentEl;
        parentEl.descendants = __spreadArray(__spreadArray([], (parentEl.descendants || [])), [el]);
    });
    return root;
}
exports.generateCompanyStructure = generateCompanyStructure;
/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
function hireEmployee(tree, newEmployee, bossName) {
    var res = tree.hireEmployee(newEmployee, bossName);
    console.log(res);
}
exports.hireEmployee = hireEmployee;
/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
function fireEmployee(tree, name) {
    var res = tree.fireEmployee(name);
    console.log(res);
}
exports.fireEmployee = fireEmployee;
/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
function promoteEmployee(tree, employeeName) {
    var res = tree.promoteEmployee(employeeName);
    console.log(res);
}
exports.promoteEmployee = promoteEmployee;
/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
function demoteEmployee(tree, employeeName, subordinateName) {
    var res = tree.demoteEmployee(employeeName, subordinateName);
    console.log(res);
}
exports.demoteEmployee = demoteEmployee;
