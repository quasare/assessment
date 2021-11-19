//Types
interface employee {
    name: string ,
    jobTitle:string  ,
    boss: string ,
    salary: string 
}

type employeeListsType = employee | TreeNode;

/**
 * Class Treenode
 * 
 * Tree node for org chart 
 */
export class TreeNode {
    value: employee;
    descendants:any;
    parent: TreeNode;

    constructor(value : employee) {
        this.value = value
        this.parent = null;
        this.descendants = []
    }

    /**
     * 
     * @param {val} string
     * @returns {TreeNode}
     */
    findBoss(val : string) : TreeNode {
        let toVisitStack = [this];
    
        while (toVisitStack.length) {
          let current = toVisitStack.pop();
    
          if (current.value.name === val)

            return current.parent;
    
          for (let child of current.descendants)
            toVisitStack.push(child)
        }
      }

      /**
     * 
     * @param {val} string 
     * @returns {TreeNode[]}
     */
    findSubordinates(val : string) : Array<TreeNode> {
        let toVisitStack = [this];
        let subordinatesList = []
        while (toVisitStack.length) {
          let current = toVisitStack.pop();
            
          if (current.value.name === val)
            
            return current.descendants;
          for (let child of current.descendants)
            toVisitStack.push(child)
        }
      }

      /**
     * 
     * @param {employee}
     * @param {boss} string
     * @returns {string}
     */
    hireEmployee(emp : employee, boss : string) : string {
        let toVisitStack = [this];
        let subordinatesList = []
        while (toVisitStack.length) {
          let current = toVisitStack.pop();
    
          if (current.value.name === boss)
            current.descendants.push(new TreeNode(emp))

            current.descendants.forEach((el: TreeNode )  => {subordinatesList.push( el.value.name)})
            return `[hireEmployee]: Added new employee (${emp.name}) with ${boss} as their boss`;
    
          for (let child of current.descendants)
            toVisitStack.push(child)
        }
      }

      /**
     * 
     * @param {emp} string
     * @returns {string}
     */
    fireEmployee(emp : string) : string {
        let toVisitStack = [this];
        let randomIndex = null
        let replacment : any = null

        let firedName = ''
        while (toVisitStack.length) {
          let current = toVisitStack.pop();
            
          if (current.value.name === emp){
              firedName = current.value.name
              //Select random employe
             randomIndex = Math.floor(Math.random() * current.descendants.length)
             replacment = current.descendants[randomIndex]

             replacment.value.boss = current.value.boss
             current.descendants.splice(randomIndex, 1)
            current.descendants.forEach((element : TreeNode) => {
                element.value.boss = replacment.value.name
            });
            replacment.descendants = current.descendants
            current.value = replacment
            return `[fireEmployee]: Fired ${emp} and replaced with ${replacment.value.name}`
          }
          for (let child of current.descendants)
            toVisitStack.push(child)
        }
    }

    /**
     * 
     * @param {emp} string
     * @returns {string}
     */
   promoteEmployee(emp : string) : string {
    let toVisitStack = [this];
    
    while (toVisitStack.length) {
      let current = toVisitStack.pop();
      if (current.value.name === emp){
        let demoted = current.parent.value.name  
        current.parent.value.name = emp
        
        current.parent.descendants.forEach((el : TreeNode) => {
            if(el.value.name === emp){
                el.value.name = demoted
            }
            el.value.boss = emp

        })

        return `[promoteEmployee]: Promoted ${emp} and made ${demoted} his subordinate`
      }
        
      
      for (let child of current.descendants)
        toVisitStack.push(child)
    }


   }

   /**
     * 
     * @param {emp} string
     * @param {sub} string
     * @returns 
     */
   demoteEmployee(emp : string, sub : string) : string {
    let toVisitStack = [this];
    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current.value.name === emp){
   
        current.descendants.forEach((el : TreeNode) =>{
            el.value.boss = sub
            if(el.value.name === sub){
                el.value.name = emp
            }
        })

        current.value.name = sub
        return `[demoteEmployee]: Demoted employee (demoted ${emp} and replaced with ${sub})`
      }
    
      for (let child of current.descendants)
        toVisitStack.push(child)
        }
   }
}

/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
export function generateCompanyStructure( employees : Array<employee>) : TreeNode{

    //Remove emails from name
    console.log('Normalizing JSON file...')
    for (let employee of employees) {
        if(employee.name.includes('@')){
            employee.name = employee.name.split('@')[0]
            employee.name = employee.name[0].toUpperCase() + employee.name.substr(1)
        }
    }

    //Create nodes
    let empList : any  = []
    let nodesList = employees.forEach(emp => {
    empList.push(new TreeNode(emp))
       })

    //Create Hash map
    const idMapping2 = empList.reduce((acc : any, el : any, i : any) => {
    acc[el.value.name] = i;
    return acc;
     }, {});

    let root   

    console.log('Generating employee tree...');   
    empList.forEach((el : TreeNode) => {
        // Handle the root element
      if (el.value.boss === null) {
          root = el;
          return root;
        }
       
        const parentEl = empList[idMapping2[el.value.boss]];
      
        el.parent = parentEl
   
        parentEl.descendants=[...(parentEl.descendants|| []), el];
      });

    return root
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(tree : TreeNode, newEmployee : employee, bossName : string) : void {

    let res =  tree.hireEmployee(newEmployee, bossName)
    console.log(res)
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, name : string) : void {

    let res = tree.fireEmployee(name)
    console.log(res)
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(tree: TreeNode, employeeName : string) : void {
    let res = tree.promoteEmployee(employeeName)
    console.log(res)
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(tree: TreeNode, employeeName: string, subordinateName: string) : void{
    let res = tree.demoteEmployee(employeeName, subordinateName)
    console.log(res)
}
