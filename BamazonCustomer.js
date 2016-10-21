var mysql = require('mysql');
var inquirer = require('inquirer');
// var secret = require('./secret.js');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId);
});

// Show Table with all products and displays them
function start(){
  connection.query('SELECT * FROM products', function(err,res){
    for ( var i = 0; i < res.length; i++){
      console.log( 'ID: ' + res[i].ItemID + " | Product: " + res[i].ProductName + " | Department: " + res[i].DepartmentName + " | $"  + res[i].Price + ' | Available: ' + res[i].StockQuantity);
    }
    console.log('---------------------------------------------------------------------------');
    // Start node app
    inquirer.prompt({
      type: 'confirm',
      name: 'makePurchase',
      message: 'Welcome to Bamazon, would you like to purchase an item?'
    }).then(function(answer) {
      if (answer.makePurchase){
        console.log('--------------------------------------------------------')
        inquirer.prompt([
          {
            type: 'input',
            name: 'itemID',
            message: 'Type the ID of the item you would like to buy.',
            validate: function(value) {
                    if (isNaN(value) == false) {
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
                  if (isNaN(value) == false) {
                      return true;
                  } else {
                      return false;
                  }
              } 

          }
          ]).then(function(answer){
            var itemSelected = (answer.itemID)-1;
            var quantity = parseInt(answer.quantity);
            var cartTotal = (res[itemSelected].Price) * quantity;
            // Check inventory to see if there is enough stock available
            if (res[itemSelected].StockQuantity >= quantity){
              console.log('You have successfully made your purchase. Your total is $' + cartTotal + '.00. Your item(s) will be shipped within 2 business days!');
              // After purchases have been made update database
              connection.query('UPDATE products SET ? WHERE ?', [
                { StockQuantity: (res[itemSelected].StockQuantity-quantity)},
                { ItemID: answer.itemID}
                ], function(err, res){
                  if(err) throw err;
                });
              } else{
                console.log('Sorry, we do not have enough of that item in our inventory to finalize your purchase.')
              }
           });
      } else{
        console.log('Have a great day! Come shop with us on payday!');
      }
    })
  
  })
}


// function reprompt(){
//   iquirer.prompt([{
//     type: 'confirm',
//     name: 'response',
//     message: 'Would you like to purchase another item?'
//   }]).then(function(answer){
//     if (answer.response){
//       start();
//     } else {
//       console.log('Have a great die!')
//     }
//   });
// }

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

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Shoes',
//   DepartmentName: 'Clothing',
//   Price: 34.99,
//   StockQuantity: 75 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Apple Laptop',
//   DepartmentName: 'Electronics',
//   Price: 999.99,
//   StockQuantity: 10 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: '32 Inch TV',
//   DepartmentName: 'Electronics',
//   Price: 329.99,
//   StockQuantity: 20 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Video Game',
//   DepartmentName: 'Electronics',
//   Price: 49.99,
//   StockQuantity: 50 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Lamp',
//   DepartmentName: 'Appliances',
//   Price: 19.99,
//   StockQuantity: 35 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Phone Charger',
//   DepartmentName: 'Appliances',
//   Price: 9.99,
//   StockQuantity: 150 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Ab Roller',
//   DepartmentName: 'Fitness',
//   Price: 19.99,
//   StockQuantity: 10 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Flat Bench',
//   DepartmentName: 'Fitness',
//   Price: 44.99,
//   StockQuantity: 5 
// }, function(err, res){
//   console.log(res);
// });

// connection.query('INSERT INTO products SET ?',{
//   ProductName: 'Car Oil',
//   DepartmentName: 'Automotive',
//   Price: 19.99,
//   StockQuantity: 25 
// }, function(err, res){
//   console.log(res);
// });




// SQL Commands
// CREATE DATABASE Bamazon;
// USE Bamazon;
// CREATE TABLE Products(
//   ItemID INT NOT NULL AUTO_INCREMENT,
//   ProductName VARCHAR(100) NOT NULL,
//   DepartmentName VARCHAR(45) NOT NULL,
//   Price INT default 0,
//   StockQuantity INT default 0,
//   PRIMARY KEY (id)
// );



