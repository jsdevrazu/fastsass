# FastSaaS Project

A full-stack SaaS application built with FastAPI for backend, featuring user authentication, subscription management, job posting, and file uploads. This project provides a clean and organized codebase with a modular structure to easily extend and maintain.

## Project Structure

```md
uploads/ # Folder for file uploads (e.g., images, documents)
app/ # Application core logic
├── auth/ # Authentication-related logic
├── configs/ # Configuration files (API settings) 
├── constants/ # Constant values and enums
├── db/ # Database-related logic and connection
├── dependencies/ # Dependency injection utilities (e.g., user authentication) 
├── models/ # Data models (schemas and DB models) 
├── routes/ # API routes (endpoints) 
├── services/ # Business logic and services 
├── utils/ # Utility functions
├── validation_schema/ # Pydantic schemas for data validation
└── tsconfig.json
.env # Environment variables configuration (e.g., DB URI, secret keys) 
.python-version # Python version used for the project
.gitignore # Git ignore file to avoid unwanted files in version control
main.py # Entry point for the FastAPI app 
uv.lock # Uvicorn lock file for deployment
```



## Setup and Installation

### Prerequisites

- Python 3.x
- MongoDB (or other databases as per configuration)

### Steps to Set Up

1. Clone the repository:
    ```bash
    git clone https://your-repository-url.git
    cd your-project-directory
    ```

2. Create a virtual environment and activate it:
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate  # On Windows use .venv\Scripts\activate
    ```

3. Install the required dependencies:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    - Create a `.env` file in the root directory and add the necessary environment variables:
      ```bash
        MONGO_URI = your-secret-url
        DB_NAME = fastsasss
        SECRET_KEY = your-secret-key
        ALGORITHM = HS256
        API_KEY = your-api-key
        GOOGLE_CLIENT_ID = your_client_id
        GOOGLE_CLIENT_SECRET = your_client_secret
        STRIPE_SECRET_KEY= stripe-secret
        STRIPE_WEBHOOK_SECRET= webhook-secret
        STRIPE_SUCCESS_URL=client-side-url/success
        STRIPE_CANCEL_URL=client-side-url/cancel
      ```

5. Create the `uploads` folder for storing file uploads:
    ```bash
    mkdir uploads
    ```

6. Run the application:
    ```bash
    uvicorn main:app --reload
    ```

7. The app will be running on `http://localhost:8000`.

## Features

- **User Authentication**: JWT-based authentication, including login, registration, and password reset.
- **Subscription Management**: Integration with Stripe for managing subscriptions and payments.
- **Job Posting**: Create and manage job posts with rich details.
- **File Uploads**: Handle file uploads for various resources like images, resumes, etc.
- **REST API**: Fully functional REST API for interacting with the system.

## File Upload

- All file uploads (e.g., images, documents) are saved in the `uploads/` directory.
- You can configure file size limits and types within the app's settings.

## API Endpoints

### Authentication

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Login and receive a JWT token
- **POST /auth/forgot-password**: Reset password via email
- **POST /auth/reset-password**: Reset password with a token

### Jobs

- **POST /jobs/post**: Post a new job
- **GET /jobs**: Fetch all job posts
- **GET /jobs/{id}**: Fetch a single job post by ID

### Subscription

- **POST /pay/subcribe**: Start a new subscription
- **POST /pay/webhook**: Stripe webhook to handle payment confirmations