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
        "Crear nuevo departamento",
        //"ver todo departamentos"
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

      //case "ver todo dpts":
      //  vertododepartments();
      //break;


      }
    });
}


var utilidad=null;
var costos=[];
var ventas=[];


//function vertododepartments(){
 
    //esto muestra todo lo que está en la tabla products
//    connection.query("SELECT * FROM departments", function (err, result) {
//        if (err) throw err;
//        console.log(result);
//    });
//    menu();

//}






function verventas(){
        //Hay dos tablas que tienen una columna que se llama igual, hay que juntar el resultado de las dos tablas en una sola y por lo tanto las dos columanas en una sola.
        //Para ello le pongo un alias (AS) a una de las dos columnas que se llamann igual (department.name / uno en products y otro en departments, solo le puse el alias al departments), de 
        //forma que se interpretará como nombres distintos. 
        //También la la SUM le pongo un alias, porque para consolegear abajo tengo que vincularla con el alias, porque una SUM no se vincula por si sola.
        //Adentro del loop que está más abajo, lo que hago es solo llamar a una de las dos columnas (la "tres"), ya que si llamara a las dos,
        //me mostraría doble el resultado. Checa que hice un RIGHT JOIN, si hubiera hecho otro tipo de JOIN no hubiera resultado.
        var query= "SELECT departments.department_id, products.department_name, departments.department_name AS tres, departments.over_head_cost, SUM(products.products_sales) AS products_sales FROM products RIGHT JOIN departments ON products.department_name = departments.department_name GROUP BY departments.department_name ";
        connection.query(query, function (err, result,fields) {
            if (err) throw err;
          
           for (var i = 0; i < result.length; i++) {
                costos = result[i].over_head_cost;
                ventas = result[i].products_sales;
                utilidad= ventas-costos;

                //lo siguiente evita que te salga en negativo utilidad
                if (ventas===null){
                  result[i].products_sales=0;
                  utilidad=0;
                }
                console.log("\n");
                console.log("  ID:  " + result[i].department_id + "  DEPARTAMENTO:  " + result[i].tres + "  COSTO:  " + result[i].over_head_cost + "  VENTAS: " + result[i].products_sales + "  UTILIDAD: " + utilidad);              
                
              }
            
            
            console.log("\n");
            menu();
        });     
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
