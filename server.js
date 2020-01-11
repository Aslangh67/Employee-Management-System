var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "E_M_S"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
    inquirer
      .prompt({
        name: "opt",
        type: "list",
        message: "Please chose an option?",
        choices: ["ADD a department, employee, or a role", "VIEW a department, employee, or a role", "UPDATE employee role"]
      })
      .then(function(answer) {
        if (answer.opt === "ADD a department, employee, or a role") {
          add();
        }
        else if(answer.opt === "VIEW a department, employee, or a role") {
        //   view();
        } else{
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
      .then(function(answer) {

        if (answer.adding === "ADD a department") {
            inquirer
            .prompt([
              {
                name: "department",
                type: "input",
                message: "Please Provide a name for the department?"
              }
            
            ]).then(function(answer) {
                console.log(answer);
                          connection.query(
          "INSERT INTO department SET ?",
          {
            name: answer.department
          },
    
          function(err) {
            if (err) throw err;
            console.log("Your department was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
            }

            )}
          else if(answer.adding === "ADD an employee") {

            
          } else{
            connection.end();
          }
        

        // connection.query(
        //   "INSERT INTO auctions SET ?",
        //   {
        //     item_name: answer.item,
        //     category: answer.category,
        //     starting_bid: answer.startingBid || 0,
        //     highest_bid: answer.startingBid || 0
        //   },
        //   function(err) {
        //     if (err) throw err;
        //     console.log("Your auction was created successfully!");
        //     // re-prompt the user for if they want to bid or post
        //     start();
        //   }
        // );
      });
  }
          // connection.query(
        //   "INSERT INTO department SET ?",
        //   {
        //     name: answer.item,
        //     category: answer.category,
        //     starting_bid: answer.startingBid || 0,
        //     highest_bid: answer.startingBid || 0
        //   },
        //   function(err) {
        //     if (err) throw err;
        //     console.log("Your auction was created successfully!");
        //     // re-prompt the user for if they want to bid or post
        //     start();
        //   }
        // );