-- SQL Commands
CREATE DATABASE Bamazon;
USE Bamazon;
-- Creates Products Table
CREATE TABLE Products(
  ItemID INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(100) NOT NULL,
  DepartmentName VARCHAR(45) NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  StockQuantity INT(10) NOT NULL,
  PRIMARY KEY (ItemID)
);

-- Hardcoding values into Products Table
INSERT INTO Products(ProductName,DepartmentName,Price,StockQuantity)
VALUES ('Laptop', 'Electronics', 999.99, 100),
       ('Tablet', 'Electronics', 99.99, 100),
       ('SmartPhone', 'Electronics', 199.99, 100),
       ('VideoGame', 'Electronics', 59.99, 100),
       ('Television', 'Electronics', 329.99, 100),
       ('Slow-Cooker', 'Kitchen', 29.99, 100),
       ('Blender', 'Kitchen', 19.99, 100),
       ('Shorts', 'Clothing', 19.99, 100),
       ('Jeans', 'Clothing', 29.99, 100),
       ('Hoodies', 'Clothing', 34.99, 100);

-- Creates Departments Table
CREATE TABLE Departments(
  DepartmentID INT AUTO_INCREMENT NOT NULL,
  DepartmentName VARCHAR(45) NOT NULL,
  OverHeadCosts Decimal(10,2) NOT NULL,
  TotalProfit Decimal(10,2) NOT NULL,
  PRIMARY KEY (DepartmentID)
);

-- Hardcoding values into Products Table
INSERT INTO Departments(DepartmentName,OverHeadCosts,TotalProfit)
VALUES ('Electronics', 1000.00, 10000),
       ('Kitchen', 200.00, 2000),
       ('Clothing', 199.99, 2500);