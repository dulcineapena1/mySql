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
        "Ver productos a la venta",
        "Ver bajo inventario",
        "Agregar a inventario",
        "Agregar nuevo producto"
      ]
    })
    .then(function(usuario) {
      switch (usuario.action) {
      case "Ver productos a la venta":
        vertodo();
        break;

      case "Ver bajo inventario":
        bajoinvenatario();
        break;

      case "Agregar a inventario":
        agregarinventario();
        break;

      case "Agregar nuevo producto":
        agregarnuevoproducto();
        break;
      }
    });
}

function vertodo(){   
          //esto muestra todo lo que está en la tabla products
          connection.query("SELECT * FROM products", function (err, result) {
              if (err) throw err;
              console.log(result);
          });
          menu();
         
}




function bajoinvenatario(){
                                                                                                        //DONDE inventario sea igual o menor a 5
    var query = "SELECT item_id,product_name,department_name,price,stock_quiantity FROM products WHERE stock_quiantity <= 5 ";
    connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("ITEM: " + res[i].item_id + " || PRODUCT: " + res[i].product_name + " || DEPARTMENT: " + res[i].department_name + " || PRICE: " + res[i].price + " || STOCK: " + res[i].stock_quiantity );
      }
      menu();
    });
}



//estas variables son para obtener los valores que se utilizarán en la function agregarinventario
var elid=null;
var stockactual=0; 


function agregarinventario(){
    inquirer
    .prompt([{
        name: "idparainventario",
        type: "input",
        message: "Escríbe el ID al cuál deseas agregar stock:"
      },
      {
        name: "agregarstock",
        type: "input",
        message: "Unidades a agregar:"
      }
    
    ])
      .then(function(user) {   
            //--INICIO LEER EL STOCK
                //le pongo a la variable el valor que puso en input
                elid=user.idparainventario; 
                                        //aquí le pongo las cosas a sacar de la base de datos
                var query = "SELECT item_id,product_name,department_name,price,stock_quiantity FROM products WHERE ?";
                                             //aquí le digo que el item_id de la base de datos va a ser el que puso en este input
                connection.query(query, { item_id: user.idparainventario}, function(err, res) {
                    //console.log("ITEM: " + res[0].item_id + " || PRODUCT: " + res[0].product_name + " || DEPARTMENT: " + res[0].department_name + " || PRICE: " + res[0].price + " || STOCK: " + res[0].stock_quiantity );
                    //aquí pongo en esa variable el valor que ya saqué aquí en el input
                    stockactual=res[0].stock_quiantity;
                    var paraagregar= stockactual + parseInt(user.agregarstock);
                    //esta función que va a correr es importante que esté aquí pues si no se saldría del connection query y lo que esté aquí adentro como valor, se perdería para próximos usos
                    agregando();

                     //--INICIO ACTUALIZAR STOCK
                function agregando(){   
                    var query = "UPDATE products SET ? WHERE ?";
                    //aquí pongo que el stock_quiantity va a setearse con lo que tenga la variable borrar, del item que tenga el valor de la variable elid
                    connection.query(query,[ {stock_quiantity: paraagregar},{item_id: elid}], function(err, res) {
                        // console.log(res.affectedRows + " Producto agregado!\n");
                        console.log("Se agregó al ID:"+ user.idparainventario + "el stock de:" + user.agregarstock);

                        menu();
                    });
                }//--FIN ACTUALIZAR STOCK   

                }); //---FIN LEER EL STOCK               
      });
}



function agregarnuevoproducto(){
    inquirer
    .prompt([{
        name: "producto",
        type: "input",
        message: "Nombre del producto:"
      },
      {
        name: "departamento",
        type: "input",
        message: "Nombre del departamento:"
      },
      {
        name: "precio",
        type: "input",
        message: "Precio:"
      },
      {
        name: "stockinicial",
        type: "input",
        message: "Stock inicial:"
      }
    
    ])
      .then(function(user) {

            console.log("Creando nuevo producto...\n");
            var query = connection.query(
                "INSERT INTO products SET ?",
                {
                    product_name: user.producto,
                    department_name: user.departamento,
                    price: user.precio,
                    stock_quiantity: user.stockinicial
                },
                function(err, res) {
                    console.log(res.affectedRows + " Productos insertados exitósamente \n");
                    menu();
                }
            );

    });
}
