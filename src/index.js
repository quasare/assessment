"use strict";
exports.__esModule = true;
// Main code goes here
var manageEmployees_1 = require("./manageEmployees");
var getEmployees_1 = require("./getEmployees");
var employeesDb = require('./employees.json');
var newEmp = {
    "name": "Jeb",
    "jobTitle": "Brand Manager",
    "boss": "Sarah",
    "salary": "50000"
};
function main() {
    var tree = manageEmployees_1.generateCompanyStructure(employeesDb.employees);
    manageEmployees_1.hireEmployee(tree, newEmp, 'Sara');
    manageEmployees_1.fireEmployee(tree, 'Alicia');
    manageEmployees_1.promoteEmployee(tree, 'Jared');
    manageEmployees_1.demoteEmployee(tree, 'Xavier', 'Maria');
    getEmployees_1.getBoss(tree, 'Bill');
    getEmployees_1.getSubordinates(tree, 'Maria');
    console.log('main');
}
main();
