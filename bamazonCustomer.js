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

//------INICIO PARTE MOSTRAR PRODUCTOS
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
   
    //esto muestra todo lo que está en la tabla products
    connection.query("SELECT * FROM products", function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    busqueda();
});


//estas variables están aquí para acutualizarlas en diferentes functions y usarlas en diferentes fuctions también
var elid=null;
var stockactual=null;
var costo=null;


//------INICIO PARTE BUSCAR EL ID DEL PRODUCTO
function busqueda() {
    inquirer
    .prompt({
        name: "item_id",
        type: "input",
        message: "Introduce el ID del producto"
      })
      .then(function(user) {
        //le pongo a la variable el valor que puso en input
        elid=user.item_id; 
                            //aquí le pongo las cosas a sacar de la base de datos
        var query = "SELECT item_id,product_name,department_name,price,stock_quiantity FROM products WHERE ?";
                                    //aquí le digo que el item_id de la base de datos va a ser el que puso en este input
        connection.query(query, { item_id: user.item_id }, function(err, res) {
            console.log("ITEM: " + res[0].item_id + " || PRODUCT: " + res[0].product_name + " || DEPARTMENT: " + res[0].department_name + " || PRICE: " + res[0].price + " || STOCK: " + res[0].stock_quiantity );
            //aquí pongo en esa variable el valor que ya saqué aquí en el input
            stockactual=res[0].stock_quiantity;
            costo= res[0].price;
        unidades();
        });
      });
}
  
//-------INICIO PARTE COMPRA
  function unidades() {
    inquirer
    .prompt({
        name: "quitar",
        type: "input",
        message: "Número de unidades a comprar:"
      })
      .then(function(user) {
          //aquí borro lo que está en esa variable menos el valor que puso en input
          var borrar= stockactual-user.quitar;
          //aquí muestro como costo final el costo del producto * lo que introdujo el input
          var costofinal= costo * user.quitar;

            //si es más lo que quiere comprar de lo que hay
            if(borrar<=0){
                console.log("No hay suficiente stock! Elige otro producto");
                busqueda();
            }
            //si sí hay stock suficiente
            else{          
                var query = "UPDATE products SET ? WHERE ?";
                                            //aquí pongo que el stock_quiantity va a setearse con lo que tenga la variable borrar, del item que tenga el valor de la variable elid
                connection.query(query,[ {stock_quiantity: borrar},{item_id: elid}], function(err, res) {
                   // console.log(res.affectedRows + " Producto agregado!\n");
                    console.log("Producto(s) agregado(s), Total a pagar:"+ costofinal);
                    
                    agregarproductsales();
                    function agregarproductsales(){
                        var query = "UPDATE products SET ? WHERE ?";
                        //aquí pongo que el products_sales va a setearse con lo que tenga la variable borrar, del item que tenga el valor de la variable elid
                        connection.query(query,[ {products_sales: costofinal},{item_id: elid}], function(err, res) {
                            console.log("Se agregó a la columna products_sales");

                        });
                    }//fin agregarproductssales

                    //cierra el puerto SIEMPRE HAY QUE PONERLO AL FINAL DE LA APLICACIÓN
                    connection.end();
                });
            }//fin else       
      });
  }
  



