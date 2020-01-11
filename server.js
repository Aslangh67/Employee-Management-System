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
        update()
      }
       else if (answer.opt === "UPDATE employee role") {
      
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
      message: "Please chose an option?",
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
              type: "input",
              message: "Employee's ID#:"
            },
            {
              name: "mid",
              type: "input",
              message: "The Manager's ID#:"
            }

          ]).then(function (answer) {
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
          })


      } else {
        inquirer
          .prompt([
            {
              name: "title",
              type: "input",
              message: "New role's title:"
            },
            {
              name: "salary",
              type: "input",
              message: "New role's salary:"
            }

          ]).then(function (answer) {
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.title,
                salary: answer.salary,
              },

              function (err) {
                if (err) throw err;
                start();
              }
            );
          })

      }

    });
}
function update(){
  inquirer
  .prompt({
    name: "view",
    type: "list",
    message: "Please chose an option?",
    choices: ["View departments", "View employees", "View roles"]
  }).then(function(answer){
    if(answer.view==="View departments"){
      connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        start()
      });

    }else if(answer.view==="View employees"){
      connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        start()
      });
    }else{
      connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        start()
      });
    }
  })
}
