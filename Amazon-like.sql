CREATE database BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id));