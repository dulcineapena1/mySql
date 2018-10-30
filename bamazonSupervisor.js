var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  menu();
});



function menu() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "¿Qué quieres hacer?",
      choices: [
        "Ver las ventas por departamento",
        "Crear nuevo departamento"
      ]
    })
    .then(function(usuario) {
      switch (usuario.action) {
      case "Ver las ventas por departamento":
        verventas();
        break;

      case "Crear nuevo departamento":
        creardepartamento();
        break;
      }
    });
}

function verventas(){
      

        var query= "SELECT departments.department_id, products.department_name, departments.department_name AS tres, departments.over_head_cost, products.products_sales FROM products RIGHT JOIN departments ON products.department_name = departments.department_name GROUP BY department_name";
        connection.query(query, function (err, result,fields) {
            if (err) throw err;
            console.log("ID "+ "DEPARTAMENTO " + "COSTO: " + "VENTAS: ");
           for (var i = 0; i < result.length; i++) {
               
                console.log(" " + result[i].department_id + " " + result[i].department_name + "  " + result[i].tres + "  " + result[i].over_head_cost + "  " + result[i].products_sales );              
            }
            console.log("\n");
           
           //console.log(result);
            menu();
        });










                                         //aquí le pongo las cosas a sacar de la base de datos
            //    var query = "SELECT products_sales FROM products WHERE ?";
                                             //aquí le digo que el department_name de la base de datos va a ser el que puso en este input
              //    connection.query(query, { department_name: user.ventasdepartamento}, function(err, res) {
              //       console.log("Departamento: " + user.ventasdepartamento + " || Venta: " + res[0].products_sales );
                   
              //       menu();
              //    });         
     
}


function creardepartamento(){
    inquirer
    .prompt([{
        name: "nombredepartamento",
        type: "input",
        message: "Nombre del departamento:"
      },
      {
        name: "overhead",
        type: "input",
        message: "Costo:"
      }
    
    ])
      .then(function(user) {
            console.log("Creando nuevo departamento...\n");
            var query = connection.query(
                "INSERT INTO departments SET ?",
                {
                    department_name: user.nombredepartamento, //recuerda que el primer elemento es el nombre que tiene en la base de datos
                    over_head_cost: user.overhead
                },
                function(err, res) {
                    console.log(res.affectedRows + " Departamento creado exitósamente \n");
                    menu();
                }
            );

    });
}
