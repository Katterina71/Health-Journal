# **Health Journal**

## **Overview**

The Health Journal is a server application designed to track and manage personal health data. Built with Node.js, Express, and MongoDB, this application provides a robust backend API that supports CRUD operations for managing user profiles, sleep logs, and other health-related data. The application ensures data integrity and performance through MongoDB validation rules and efficient querying with indexes.

## **Features**

- **CRUD API**: Create, read, update, and delete user data and health logs.
- **Data Validation**: Ensures the consistency and integrity of the data stored in the database.
- **Efficient Queries**: Utilizes MongoDB indexes to enhance performance, especially on large datasets.

## **Technology Stack**

- **Node.js**: JavaScript runtime environment that executes JavaScript code outside a web browser.
- **Express.js**: Web application framework for Node.js, designed for building web applications and APIs.
- **MongoDB**: NoSQL database used for high volume data storage.
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.

## **Getting Started**

### **Prerequisites**

- Node.js
- MongoDB
- npm (Node package manager)

## **API Documentation**

### **User Endpoints**

- **POST /api/users/add**: Create a new user.
- **GET /api/users/**: Retrieve all users.
- **GET /api/users/:id**: Retrieve a single user by ID.
- **PATCH /api/users/edit/:userId**: Update a user by ID.
- **DELETE /api/delete/:userId**: Delete a user with all information from other collections.

### **Sleep Log Endpoints**

- **POST /api/sleeplogs/add/:username**: Create a new sleep log.
- **GET /api/sleeplogs/**: Retrieve all sleep logs.
- **GET /api/sleeplogs/:id**: Retrieve a sleep log by ID.
- **PATCH /api/sleeplogs/edit/:id**: Update a sleep log by ID.
- **DELETE /api/sleeplogs/delete/:username**: Delete a sleep log by ID.

## **Database Collections**

### **Users Collection**

- **username**: Unique identifier for the user.
- **email**: User's email address.

### **Sleep Logs Collection**

- **userId**: Reference to the User collection.
- **date**: Date of the sleep log.
- **hoursSlept**: Number of hours the user slept.

## **Validation Rules**

- **Users**: Username must be unique and email must be a valid email format.
- **Sleep Logs**: Ensure that each log for a user is unique by date.

## **Indexes**

- Users: Index on **`username`** and **`email`** for quick lookup.
- Sleep Logs: Compound index on **`userId`** and **`date`** for efficient querying.

## **Contributing**

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (**`git checkout -b feature/AmazingFeature`**)
3. Commit your Changes (**`git commit -m 'Add some AmazingFeature'`**)
4. Push to the Branch (**`git push origin feature/AmazingFeature`**)
5. Open a Pull Request
