# BAMazon

Week 12 HW for Rutgers Coding Bootcamp. The goal was to create an Amazon-like store using Node.js and MySQL.

## Getting Started

### Bamazon Options

1. `BamazonCustomer.js`

    * Prints the products in the store.

    * Prompts customer which product they would like to purchase by ID number.

    * Asks for the quantity.

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
      * However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
      * If the purchase goes through, it updates the stock quantity to reflect the purchase.
      * It will also update the product sales in the department table.

-----------------------

2. `BamazonManager.js`

    * Starts with a list of options:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product
        * End Session

    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it will list all the products with less than five items in its StockQuantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `End Session`, it ends the session and doesn't go back to the menu.

-----------------------

3. `BamazonExecutive.js`

    * Starts with a list of options:
        * View Product Sales by Department
        * Create New Department
        * End Session

    * If the manager selects `View Product Sales by Department`, it lists the Department Sales and calculates the total sales from the overhead cost and product sales.

    * If the manager selects `Create New Department`, it allows the manager to create a new department and input current overhead costs and product sales. If there are none, by default it will set at 0.

    * If the manager selects `End Session`, it ends the session and doesn't go back to the menu.

## Demo Images

### BamazonCustomer.js 
  * ![1](/images/Customer1.PNG)
  * ![2](/images/Customer2.PNG)
  * ![3](/images/Customer3.PNG)
  * ![4](/images/Customer4.PNG)

### BamazonManager.js 
  * ![1](/images/Manager3.PNG)
  * ![2](/images/Manager4.PNG)

### ExecutiveManager.js 

## Technologies used
- Node.js
- npm inquirer (https://www.npmjs.com/package/inquirer)
- npm mysql (https://www.npmjs.com/package/mysql)

### Prerequisites

```
See package.json
```

## Built With

* MySQLWorkbench
* Terminal/Gitbash
* Sublime Text - Text Editor

## Authors

* **Muhammet Aydin** - *JS/MySQL/Node.js* - [Muhammet Aydin](https://github.com/muhammeta7/Node.js-MySQL)