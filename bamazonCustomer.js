var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Kasra1388",
  database: "BamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
});

var GetNewOrder = function()
{
//here we creat a basic text promp
inquirer.prompt([
  
  {
    type: "input",
    message: "What is your ID of the product you would like to buy?",
    name: "item_id"
  },
  {
    type: "input",
    message: "How many units of the product you would like to buy?",
    name: "product_units"
}
  
  ]).then(function(customer) {

connection.query("SELECT * FROM products where item_id = ?",[customer.item_id],function(err,res)
{
   if (err){throw err;}
   console.log("**********************************************");
   console.log("the specification of your item is:");
   console.log(res[0].item_id + "|" + res[0].product_name + "|" + res[0].department_name + "|" + res[0].price + "|" + res[0].stock_quantity);
   console.log("**********************************************");
   if(customer.product_units <= res[0].stock_quantity )
    {

     var neworder_quantity = customer.product_units;
     var total = neworder_quantity * res[0].price ;
     var newstock_quantity = res[0].stock_quantity - neworder_quantity ;
     connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[newstock_quantity,customer.item_id],function(err,res)
      {
        if (err){throw err;}
        console.log("Your New Order is Registerd and your total is  " + total + "$" );
      });
     
    }
    else
    {
      console.log("Your Order is More than stock")
    }
});
});
}

var seeProduct = function()
{
  inquirer.prompt([
  {
    type: "confirm",
    name: "seeProduct",
    message: "would you like to see our products list?"
  }
  ]).then(function(confirm) {
    if (confirm) {
       connection.query("SELECT * FROM products", function(err, res) {
       if (err){throw err;}

       var table = new Table({
           head: ['item_id', 'product_name','department_name','price','stock_quantity']
           , colWidths: [20,20,20,20,20]
                            });
  
      for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity]);
       }
       console.log(table.toString());
       console.log("************************************************************");
       GetNewOrder();
                                                                     
                });
     }
    else
   {
  console.log("We Hope to see you soon");
   }

});
}
     
      
seeProduct();



