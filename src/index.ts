// Main code goes here
import {demoteEmployee, hireEmployee, promoteEmployee, TreeNode,
     generateCompanyStructure, fireEmployee} from './manageEmployees';
import {getBoss, getSubordinates} from './getEmployees';

const employeesDb = require('./employees.json');

const newEmp = {
    "name": "Jeb",
    "jobTitle": "Brand Manager",
    "boss": "Sarah",
    "salary": "50000"
  }

function main() {
    let tree = generateCompanyStructure(employeesDb.employees)
    hireEmployee(tree, newEmp, 'Sara')
    fireEmployee(tree, 'Alicia')
    promoteEmployee(tree,'Jared')
    demoteEmployee(tree, 'Xavier', 'Maria')

    getBoss(tree, 'Bill')
    getSubordinates(tree, 'Maria')
 
}

main()
