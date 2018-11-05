CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price INT NULL,
    stock_quiantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quiantity)
VALUES ("sofa", "hogar", 1500, 1);

INSERT INTO products (product_name, department_name, price, stock_quiantity)
VALUES ("computadora", "tecnologia", 9000, 5);

INSERT INTO products (product_name, department_name, price, stock_quiantity)
VALUES ("escritorio", "oficina", 2000, 3);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

USE bamazon;

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45) NULL,
    over_head_cost INT NULL,
    PRIMARY KEY (department_id)
);

ALTER TABLE products
ADD products_sales INT NULL