var mysql = require('mysql');
var inquirer = require('inquirer')

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "Paswerd7?2790", //Your password
    database: "bamazon"
});

function start(){
  inquirer.prompt([{
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Products", "End Session"]
  }]).then(function(answer){
    console.log(answer);
    if (answer.menu == 'View Products for Sale'){
      viewProducts();
    } else if (answer.menu == 'View Low Inventory'){
      viewLowInventory();
    } else if (answer.menu == 'Add to Inventory'){
      addToInventory();
    } else if (answer.menu == 'Add New Product'){
      addNewProducts();
    } else{
      console.log('Until Next Time!')
    }
  });
}

// Shows all products and inventory
function viewProducts(){
  console.log('-------------------Product Inventory------------------');
  connection.query('SELECT * FROM products', function(err,res){
    if (err) throw err;
    console.log('-----------------------------------------------------');
    for ( var i = 0; i < res.length; i++){
      console.log( 'ID: ' + res[i].ItemID + "| Product: " + res[i].ProductName + "| Department: " + res[i].DepartmentName + "| $"  + res[i].Price + '| Available: ' + res[i].StockQuantity);
      console.log('--------------------------------------------------------------------------------');
    }
    start();
  });
}

// Checks inventory for products that have a low stock
function viewLowInventory(){
  console.log('-------------------Checking for Low Inventory---------------');
  connection.query('SELECT * FROM products', function(err,res){
    if(err) throw err;
    console.log('-----------------------------------------------------');
    for ( var i = 0; i < res.length; i++){
      if (res[i].StockQuantity <= 5){
        console.log( 'ID: ' + res[i].ItemID + "| Product: " + res[i].ProductName + "| Department: " + res[i].DepartmentName + "| $"  + res[i].Price + '| Available: ' + res[i].StockQuantity);
        console.log('--------------------------------------------------------------------------------');
      }
    }
    start();
  });
}

// Displays prompt to add more stock to items that have low inventory
function addToInventory(){
  console.log('-------------------Adding to Inventory---------------');
  connection.query('SELECT * FROM products', function(err, res){
  if(err) throw err;
  var productArray = [];
  //pushes each item into a productArray
  for(var i=0; i<res.length; i++){
    productArray.push(res[i].ProductName);
  }
  inquirer.prompt([{
    type: "list",
    name: "product",
    choices: productArray,
    message: "Which item would you like to add inventory?"
  }, {
    type: "input",
    name: "quantity",
    message: "How many of this item would you like to add?",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
    }]).then(function(ans){
      var currentQty;
      for(var i=0; i<res.length; i++){
        if(res[i].ProductName === ans.product){
          currentQty = res[i].StockQuantity;
        }
      }
      connection.query('UPDATE Products SET ? WHERE ?', [
        {StockQuantity: currentQty + parseInt(ans.quantity)},
        {ProductName: ans.product}
        ], function(err, res){
          if(err) throw err;
          console.log('The inventory has been updated.');
          start();
        });
      })
  });
}

// Allows manager to add a new product to inventory
function addNewProduct(){
  console.log('-------------------Adding New Product---------------');
  inquirer.prompt([{
    type: "input",
    name: "product",
    message: "Product: ",
    validate: function(value){
      if(value){return true;}
      else{return false;}
    }
  }, {
    type: "input",
    name: "department",
    message: "Department: "
  }, {
    type: "input",
    name: "price",
    message: "Price: ",
    validate: function(value){
      if(isNaN(value) === false){return true;}
      else{return false;}
    }
  }, {
    type: "input",
    name: "quantity",
    message: "Quantity: ",
    validate: function(value){
      if(isNaN(value) == false){return true;}
      else{return false;}
    }
  }]).then(function(answer){
    connection.query('INSERT INTO Products SET ?',{
      ProductName: answer.product,
      DepartmentName: answer.department,
      Price: answer.price,
      StockQuantity: answer.quantity
    }, function(err, res){
      if(err) throw err;
      console.log('You added a new item item!');
    })
    start();
  });
}

start();