var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "E_M_S"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "opt",
      type: "list",
      message: "Please chose an option?",
      choices: ["ADD a department, employee, or a role", "VIEW a department, employee, or a role", "UPDATE employee role", "EXIT"]
    })
    .then(function (answer) {
      if (answer.opt === "ADD a department, employee, or a role") {
        add();
      }
      else if (answer.opt === "VIEW a department, employee, or a role") {
        view()
      }
       else if (answer.opt === "UPDATE employee role") {
      update()
      } 
      else {
        connection.end();

      }
    });
}
function add() {
  inquirer
    .prompt({
      name: "adding",
      type: "list",
      message: "Please chose an option.",
      choices: ["ADD a department", "ADD an employee", "ADD a role"]
    })
    .then(function (answer) {

      if (answer.adding === "ADD a department") {
        inquirer
          .prompt([
            {
              name: "department",
              type: "input",
              message: "Department name:"
            }

          ]).then(function (answer) {
            connection.query(
              "INSERT INTO department SET ?",
              {
                name: answer.department
              },

              function (err) {
                if (err) throw err;
                start();
              }
            );
          }

          )
      }
      else if (answer.adding === "ADD an employee") {
        connection.query(`SELECT * FROM role`, function(err, results) {
          if (err) throw err;
        
        let roles=results.map(function(results){
          return {name: results.title,
           value:results.id}
         })

        
        connection.query(`SELECT * FROM employee`, function(err, results) {
        if (err) throw err
        
        let employees=results.map(function(results){
         return ({name: `${results.first_name} ${results.last_name}`,
          value:results.id})
        })
        employees.unshift({
          name: "None",
          value: ""
        })
        
        inquirer
          .prompt([
            {
              name: "name",
              type: "input",
              message: "Employee's first name:"
            },
            {
              name: "last",
              type: "input",
              message: "Employee's last name:"
            },
            {
              name: "id",
              type: "rawlist",
              choices: roles,
              message: "Employee's department:"
            },
            {
              name: "mid",
              type: "rawlist",
              choices: employees,
              message: "Employee's Manager:"
            }

          ]).then(function (answer) {
            if(answer.mid===""){
              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answer.name,
                  last_name: answer.last,
                  role_id: answer.id
                },
  
                function (err) {
                  if (err) throw err;
                  start();
                }
              );
            }else{
            connection.query(
              "INSERT INTO employee SET ?",
              {
                first_name: answer.name,
                last_name: answer.last,
                role_id: answer.id,
                manager_id: answer.mid
              },

              function (err) {
                if (err) throw err;
                start();
              }
            );
          }
          })
        })
        })
       } else {
            connection.query(`SELECT * FROM department`, function(err, results) {
              if (err) throw err;
              
              const department=results.map(function(results){
               return ({name:results.name,
                value:results.id})
              })
              
        inquirer.prompt([
          
            {
              name: "title",
              type: "input",
              message: "New role's title:"
            },
            {
              name: "salary",
              type: "input",
              message: "New role's salary:"
            },
            {
              name: "depId",
              type: "rawlist",
              choices: department,
              message: "New role's department"
            }

          ]).then(function (answer) {

            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.depId
              },

              function (err) {
                if (err) throw err;
                start();
              }
            );
          })
        });

      }

    });
}
function view(){
  inquirer
  .prompt({
    name: "view",
    type: "list",
    message: "Please chose an option?",
    choices: ["department", "employee", "role"]
  }).then(function(answer){
    
      connection.query(`SELECT * FROM ${answer.view}`, function(err, res) {
        if (err) throw err;
        console.table(res);
        start()
      });


  })
}
function update(){
  connection.query(`SELECT * FROM role`, function(err, results) {
    if (err) throw err;
  
  let roles=results.map(function(results){
    return {name: results.title,
     value:results.id}
   })

  
  connection.query(`SELECT * FROM employee`, function(err, results) {
  if (err) throw err
  
  let employees=results.map(function(results){
   return ({name: `${results.first_name} ${results.last_name}`,
    value:results.id})
  })

  inquirer
  .prompt([
    {
      name: "empId",
      type: "rawlist",
      choices: employees,
      message: "Choose employee:"
    },{
      name: "newRoleId",
      type: "rawlist",
      choices: roles,
      message: "Choose new role:"
    }

  ]).then(function(answer){
    
    connection.query(
      "UPDATE employee SET ? WHERE ?",
      [
        {
          role_id:answer.newRoleId
        },
        {
          id: answer.empId
        }
      ],
      function(err, res) {
        if (err) throw err;
        
        
        start();
      }
    );
  })
})
})
}
