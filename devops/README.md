
# Part 2: DevOps

## 2a. CI/CD Pipeline Sketch

This document outlines a CI/CD pipeline for the backend microservices using GitHub Actions.

### Stages

1.  **Code Commit:** Developers push code to a feature branch in the GitHub repository.
2.  **Pull Request:** A pull request is created to merge the feature branch into the `main` branch.
3.  **Build & Test:** A GitHub Actions workflow is triggered on the pull request. The workflow performs the following steps for each microservice:
    *   **Build:** Builds the Docker image for the microservice.
    *   **Test:** Runs unit and integration tests.
4.  **Merge:** If the build and test stages pass, the pull request is merged into the `main` branch.
5.  **Deploy to Staging:** A GitHub Actions workflow is triggered on a push to the `main` branch. The workflow deploys the new Docker images to a staging environment.
6.  **Manual Approval:** A manual approval step is required to promote the build to production.
7.  **Deploy to Production:** After manual approval, a GitHub Actions workflow deploys the Docker images to the production environment.

### Tools

*   **Version Control:** Git, GitHub
*   **CI/CD:** GitHub Actions
*   **Containerization:** Docker
*   **Cloud Provider:** AWS (or any other cloud provider)

### Microservice Management

Each microservice has its own directory in the monorepo. The CI/CD pipeline is configured to build, test, and deploy each microservice independently. This is achieved by using separate workflows for each microservice or by using a single workflow that is triggered by changes in the respective microservice's directory.

## 2b. Dockerization

See the `Dockerfile` in the `user-authentication-service` directory for an example of how to dockerize a microservice.

**Instructions to build and run the Docker image:**

1.  Navigate to the `user-authentication-service` directory.
2.  Build the Docker image:

    ```bash
    docker build -t user-authentication-service .
    ```

3.  Run the Docker container:

    ```bash
    docker run -p 3001:3001 -e MONGO_URI="your_mongodb_connection_string" -e JWT_SECRET="your_jwt_secret" user-authentication-service
    ```

## 2c. Linux Hosting Considerations

### Key Considerations

*   **Process Manager:** Use a process manager like **PM2** to keep the Node.js applications running in the background and to manage clustering.
*   **Reverse Proxy:** Use **Nginx** as a reverse proxy to route traffic to the different microservices based on the request path. Nginx can also handle SSL termination and load balancing.
*   **Environment Variables:** Store sensitive information like database connection strings and API keys in environment variables. Do not hardcode them in the application code.

### Strategies for Managing Multiple Microservices

*   **Single Server:** On a single server, each microservice can run on a different port. Nginx can be configured to route traffic to the correct microservice based on the domain or path.
*   **Multiple Servers:** For better scalability and fault tolerance, deploy each microservice on its own server. A load balancer can be used to distribute traffic among the servers.
*   **Container Orchestration:** For large-scale deployments, use a container orchestration tool like **Kubernetes** or **Docker Swarm** to manage the containers across a cluster of servers.

## 2d. Kafka Usage (Conceptual)

Apache Kafka could be beneficial in this microservices architecture for inter-service communication and data streaming.

### Examples

*   **Asynchronous User Signup:** When a new user signs up, the `user-authentication-service` can publish a `user_created` event to a Kafka topic. Other microservices can subscribe to this topic to perform actions like creating a user profile or sending a welcome email. This decouples the services and improves responsiveness.
*   **Centralized Logging:** Each microservice can publish its logs to a dedicated Kafka topic. A separate logging service can then consume these logs and store them in a centralized location like Elasticsearch for analysis and monitoring.
*   **Event-Driven Architecture:** Kafka can be used to build an event-driven architecture where microservices communicate with each other through events. This can lead to a more scalable and resilient system.
