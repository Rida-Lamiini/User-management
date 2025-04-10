# User Management System

## Overview

This is a React-based User Management System that allows creating, updating, deleting, and listing users. The backend is assumed to be a REST API running on `http://localhost:5000/api/`.

## Features

- Create a new user
- List all users
- Update user details
- Delete a user
- User authentication (login)

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express (Assumed API)
- **Database:** MongoDB or any other (Assumed API)

## Installation & Setup

### Prerequisites

- Node.js & npm installed
- Backend API running at `http://localhost:5000/api/`

### Clone Repository

```sh
git clone <your-repo-url>
cd user-management-system
```

### Install Dependencies

```sh
npm install
```

### Run the Application

```sh
npm start
```

## API Endpoints

### Get All Users

**Request:**

```sh
GET /api/users
```

**Response:**

```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": true
  }
]
```

### Create User

**Request:**

```sh
POST /api/users
Content-Type: application/json
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass"
}
```

**Response:**

```json
{
  "message": "User created successfully",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Update User

**Request:**

```sh
PUT /api/users/:id
Content-Type: application/json
```

**Body:**

```json
{
  "name": "John Updated",
  "email": "f@example.com",
  "password": "newpass",
  "isAdmin": 1
}
```

**Response:**

```json
{
  "message": "User updated successfully",
  "user": {
    "id": "9",
    "name": "John Updated",
    "email": "f@example.com"
  }
}
```

### Delete User

**Request:**

```sh
DELETE /api/users/:id
```

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

### User Login

**Request:**

```sh
POST /api/users/login
Content-Type: application/json
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "securepass"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "jwt-token-here"
  }
}
```
