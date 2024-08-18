# Full Stack Project

This project is a full-stack application with a Node.js backend and an Angular frontend. The project structure is organized into two main directories:
- **Backend**: Located in the `backend` folder
- **Frontend**: Located in the `frontend` folder

## Prerequisites

Before starting, make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (for managing the Angular frontend)

## Getting Started

### 1. Setting Up the Backend

The backend is a Node.js application that connects to a MongoDB database and handles authentication.

#### Step 1: Create the `config/default.json` File

The backend requires a configuration file to store the database connection string and the JWT secret. 

- Navigate to the `backend/config` directory.
- Create a file named `default.json` with the following content:

```json
{
  "mongoURI": "your-mongo-uri",
  "jwtSecret": "yourSecretToken"
}
```

Replace "your-mongo-uri" with your MongoDB connection string and "yourSecretToken" with a secure secret token for JWT authentication.

#### Step 2: Install Backend Dependencies
Navigate to the backend directory and install the necessary dependencies:

**cd backend**

**npm install**

Step 3: Start the Backend Server
After installing the dependencies, start the backend server with:

**npm start**

### 2. Setting Up the Frontend
The frontend is an Angular application located in the frontend directory.

#### Step 1: Install Frontend Dependencies
Navigate to the frontend directory and install the required dependencies:

**cd frontend**

**npm install**

#### Step 2: Configure the Frontend (Optional)
If the frontend requires any environment-specific settings (like API URLs), you may need to configure the environment files located in frontend/src/environments/.

#### Step 3: Start the Frontend Server
Once the dependencies are installed, start the Angular development server with:

**npm start**

The frontend will be accessible at http://localhost:4200.

## Demo Video
You can watch a video of the demo application working, which is located in the root directory of the project.