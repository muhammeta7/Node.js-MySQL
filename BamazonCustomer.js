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
connection.query('SELECT * FROM products', function(err,res){
  for ( var i = 0; i < res.length; i++){
    console.log( 'ID: ' + res[i].ItemID + " | Name: " + res[i].ProductName + " | Department: " + res[i].DepartmentName + " | $"  + res[i].Price + ' | Available: ' + res[i].StockQuantity);
  }
  console.log('---------------------------------------------------------------------------');
  start();
});


// Start node app
var start = function() {
  inquirer.prompt({
    type: 'confirm',
    name: 'makePurchase',
    message: 'Would you like to purchase an item from Bamazon?'
  }).then(function(answer) {
    console.log(answer.makePurchase)
    if (answer.makePurchase == true){
      pickByItemID();
    } else{
      console.log('Have a great day! Come shop with us on payday!')
    }
  })
}

// User selects item by ID
// function pickByItemID(){
//   inquirer.prompt(
//   {
//     var questions = [
//     {
//     type: 'input',
//     name: 'itemID',
//     message: 'Welcome to Bamazon. Type the Item ID that you would like to add to your cart.'
//     },
//     {

//     }
//     ]
//     type: 'input',
//     name: 'itemID',
//     message: 'Welcome to Bamazon. Type the Item ID that you would like to add to your cart.'
//   }.then(function(answer){
//     if ( answer.itemID == )
//   }
// }
//    if ( answer.firstChoice == 'Post an Item'){
//       var questions = [
//       {
//         type: 'input',
//         name: 'itemName',
//         message: 'What is the item?'
//       },

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






// var start = function(){
//   inquirer.prompt({
//     name: ''
//   }) 
// }

// var start = function() {
//     inquirer.prompt({
//         name: "postOrBid",
//         type: "rawlist",
//         message: "Welcome to Bamazon",
//         choices: ["POST", "BID"]
//     }).then(function(answer) {
//         if (answer.postOrBid.toUpperCase() == "POST") {
//             postAuction();
//         } else {
//             bidAuction();
//         }
//     })
// }

// var postAuction = function() {
//     inquirer.prompt([{
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?"
//     }, {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?"
//     }, {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function(value) {
//             if (isNaN(value) == false) {
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     }]).then(function(answer) {
//         connection.query("INSERT INTO auctions SET ?", {
//             itemname: answer.item,
//             category: answer.category,
//             startingbid: answer.startingBid,
//             highestbid: answer.startingBid
//         }, function(err, res) {
//             console.log("Your auction was created successfully!");
//             start();
//         });
//     })
// }




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