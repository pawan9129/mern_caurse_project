
# MERN Full-Stack Technical Assessment

This project is a MERN stack application with a microservices architecture, created as a technical assessment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker
- MongoDB
- Elasticsearch
- Redis

### Installation & Running

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Backend Microservices:**

    For each microservice (`user-authentication-service`, `course-recommendation-service`, `course-management-service`):

    -   Navigate to the service's directory:

        ```bash
        cd <service-name>
        ```

    -   Install dependencies:

        ```bash
        npm install
        ```

    -   Create a `.env` file and add the following environment variables:

        **user-authentication-service:**

        ```
        MONGO_URI="your_mongodb_connection_string"
        JWT_SECRET="your_jwt_secret"
        ```

        **course-recommendation-service:**

        ```
        GEMINI_API_KEY="your_gemini_api_key"
        ```

        **course-management-service:**

        ```
        MONGO_URI="your_mongodb_connection_string"
        ELASTICSEARCH_NODE="http://localhost:9200"
        REDIS_URL="redis://localhost:6379"
        ```

    -   Start the service:

        ```bash
        npm start
        ```

3.  **Frontend:**

    -   Navigate to the `frontend` directory:

        ```bash
        cd frontend
        ```

    -   Install dependencies:

        ```bash
        npm install
        ```

    -   Start the frontend development server:

        ```bash
        npm run dev
        ```

    The frontend will be available at `http://localhost:5173`.

## DevOps Setup

For details on the CI/CD pipeline, Dockerization, and hosting considerations, please refer to the `devops/README.md` file.

## Part 3: Frontend - Acknowledgment

As I was unable to download the provided frontend from the Google Drive link, I have created a placeholder frontend using Vite and React. This frontend includes the basic structure and functionality required by the assessment, such as API integration, state management, and a basic UI.
