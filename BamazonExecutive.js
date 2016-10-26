var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root", //Your username
  password: "Paswerd7?2790", //Your password
  database: "bamazon"
});

connection.connect(function(err){
  if (err) throw err;
});

function start(){
  inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['View Product Sales by Department', 'Create New Department', 'End Session'] 
  }]).then(function(answer){
    switch(answer.action){
      case 'View Product Sales by Department' : viewProductByDepartment();
      break;
      case 'Create New Department' : createNewDepartment();
      break;
      case 'End Session' : console.log('Have a Great Day!');
    }
  });
}

// View Product Sales By Department
function viewProductByDepartment(){
  connection.query('SELECT * FROM departments', function(err, res){
    if (err) throw err;
    console.log('-------------------Product Sales By Department------------------');
    for (var i = 0; i < res.length; i++){
      console.log("DepID: 0" + res[i].DepartmentID + " | " + "DepName: " + res[i].DepartmentName + " | " + "OverHeadCost: " + (res[i].OverHeadCosts).toFixed(2) + "| TotalProfits: " + (res[i].TotalProfit - res[i].OverHeadCosts).toFixed(2));
      console.log('------------------------------------------------------------------------------------------');
    }
    start();
  })
}

// Create New Department
function createNewDepartment(){
  console.log('-------------------Create New Department------------------');
  // inquirer prompt to add DepartmentName, default value is 0 for no input
  inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Department Name: '
  }, {
    type: 'input',
    name: 'overHeadCosts',
    message: 'Over Head Costs: ',
    validate: function(value){
      if(isNaN(value) == false){return true;}
      else{return false;}
    }
  }, {
    type: 'input',
    name: 'productSales',
    message: 'Product Sales: ',
    default: 0,
    validate: function(value){
      if(isNaN(value) == false){return true;}
      else{return false;}
    }
  }
  ]).then(function(answer){
    connection.query('INSERT INTO departments SET ?',{
      DepartmentName: answer.name,
      OverHeadCosts: answer.overHeadCosts,
      TotalProfit: answer.productSales
    }, function(err, res){
      if(err) throw err;
      console.log(answer.name + 'department was added.');
    })
    start();
  });
}

start();
