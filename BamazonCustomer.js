var mysql = require('mysql');
var inquirer = require('inquirer');
// var secret = require('./secret.js');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root", //Your username
  password: "Paswerd7?2790", //Your password
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
});

// Show Table with all products and displays them
function start(){
  connection.query('SELECT * FROM products', function(err,res){
    if (err) throw err;
    for ( var i = 0; i < res.length; i++){
      console.log('---------------------------------------------------------------------------');
      console.log('ID: ' + res[i].ItemID + "| Product: " + res[i].ProductName + "| Department: " + res[i].DepartmentName + "| $"  + res[i].Price + '| Available: ' + res[i].StockQuantity + '\n');
    }
    console.log('---------------------------------------------------------------------------');
    // Start node app
    console.log('');
    inquirer.prompt([
      {
        type: 'input',
        name: 'itemID',
        message: 'Type the ID of the item you would like to buy.',
        validate: function(value) {
          if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many of this item would you like to purchase?',
        validate: function(value) {
          if (isNaN(value)) {
              return false;
          } else {
              return true;
          }
        } 
      }
      ]).then(function(answer){
        var itemSelected = (answer.itemID)-1;
        var quantity = parseInt(answer.quantity);
        var cartTotal = (res[itemSelected].Price) * quantity;
        // Check inventory to see if there is enough stock available
        if (res[itemSelected].StockQuantity >= quantity){
          // After purchases have been made update database
          connection.query('UPDATE products SET ? WHERE ?', [
            { StockQuantity: (res[itemSelected].StockQuantity-quantity)},
            { ItemID: answer.itemID}
            ], function(err, res){
              if(err) throw err;
              reprompt();
              console.log('\n'+ '\n'+ 'You have successfully made your purchase. Your total is $' + cartTotal.toFixed(2) +'. Your item(s) will be shipped within 2 business days!');
          });

          connection.query('SELECT * FROM departments', function(err,departmentRes){
            if (err) throw err;
            var index;
            for(var i = 0; i<departmentRes.length; i++){
              if(departmentRes[i].DepartmentName == res[itemSelected].DepartmentName){
                index = i;
              }
            }

            // Updates totalSales in Departments Table
            connection.query('UPDATE departments SET ? WHERE ?', [
            {TotalProfit: departmentRes[index].TotalProfit + cartTotal},
            {DepartmentName: res[itemSelected].DepartmentName}
            ], function(err, departmentRes){
              if (err) throw err;
            });
          });
        } else{
          console.log('Sorry, we do not have enough of that item in our inventory to finalize your purchase.');
          reprompt();
        }      
      });
  })
}

function reprompt(){
  inquirer.prompt([{
    type: 'confirm',
    name: 'response',
    message: 'Would you like to purchase another item?'
  }]).then(function(answer){
    if (answer.response){
      start();
    } else {
      console.log('Have a great day!')
    }
  });
}

start();



// Populate Products table with ten random items
// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Hoodies',
//   DepartmentName: 'Clothing',
//   Price: 19.99,
//   StockQuantity: 100 
// }, function(err, res){
//   console.log(res);
// });





