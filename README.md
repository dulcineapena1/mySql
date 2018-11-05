# mySql

NODE + SQL 
APLICACIÓN DE REGISTRO DE VENTAS, MANEJO DE INVENTARIO Y DEPARTAMENTOS.


VER EL FUNCIONAMIENTO DE LA APLICACIÓN Y EL RESULTADO EN LA BASE DE DATOS
  -Parte Costumer y Manager
  https://drive.google.com/file/d/14sXx2lyBLoFj-WEEB8na3dsrdik1Eism/view
  -Parte Supervisor:
  https://drive.google.com/file/d/19DvwouTnglhUBO8iQRlKZOU8c6nmG7Ul/view
  
FUNCIONALIDADES:
  -bamazonCostumer:
    1.-Despliega todos los elementos disponibles para vender.
    2.-Pregunta unidades a comprar, y lo resta del stock en SQL.
    3.-Muestra el total de compra. Si no hay suficiente stock muestra un mensaje sobre ello.
    
  -bamazonManager:
    A) Opción 'Ver productos a la venta'. Muestra productos disponibles con ID, nombre, precio y stock.
    B) Opción 'Ver bajo inventario'. Muestra solo los productos con stock menor a 5.
    C) Opción 'Agregar a inventario'. Pregunta ID y stock a agregar, mismos que se agregan a la base de datos.
    D) Opción 'Agregar nuevo producto'. Pregunta ID, nombre, departamento, precio, stock; mismos que se agregan a la base de datos.
  
  -bamazonSupervisor:
    A) Opción 'Ver ventas por departamento'. Muestra la unión de la tabla 'departments' y 'products', así como un agrupado de todos los   departamentos, para así poder ver las ventas por departamento ('product_sales'). Adicional agrega una columna que NO está en la base de datos, donde se observa la utilidad (que es la resta del total de las ventas menos el costo).
    B) Opción 'Agregar nuevo departamento'. Agrega el departamento y el costo indroducido (se agregará a la tabla 'departments'). Si se consultara nuevamente la primera opción del menú 'Ver ventas por departamento', agregará este nuevo elemento insertado.
    
    
-HERRAMIENTAS UTILIZADAS: NODE / MYSQL WORKBENCH 
-EN CÓDIGO VERÁS: NPM INQUIRER Y MYSQL / SWITCH / MYSQL JOIN, SELECT, GROUP BY, SUM, INSERT INTO...


