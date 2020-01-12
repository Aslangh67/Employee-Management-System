# Employee-Management-System

This program is generated with Javascript, node, and mysql.

The Data base is build out of three parts:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(x) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(x) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(x) to hold employee first name
  * **last_name** - VARCHAR(x) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
The command-line application allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles


We can frame this challenge as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

To download this program simply clone this repo, and type **node server.js** in the command line.