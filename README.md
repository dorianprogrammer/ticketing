# Microservices Architecture Project

This project demonstrates a robust microservices architecture using Docker, Kubernetes, Skaffold, NATS, Express, TypeScript, and user authentication.

## Architecture Overview

Our application is built on a microservices architecture, leveraging the following technologies:

- **Docker**: Containerization of services
- **Kubernetes**: Orchestration and management of containers
- **Skaffold**: Continuous development for Kubernetes applications
- **NATS**: Messaging system for inter-service communication
- **Express**: Web application framework for Node.js
- **TypeScript**: Typed superset of JavaScript for improved developer experience
- **User Authentication**: Secure user management and access control

## Services

1. **User Service**: Handles user registration, authentication, and profile management
2. **Product Service**: Manages product catalog and inventory
3. **Order Service**: Processes and manages customer orders
4. **Payment Service**: Handles payment processing and transactions
5. **Notification Service**: Manages email and push notifications

## Technologies Used

- **Docker**: Each service is containerized for consistency across environments
- **Kubernetes**: Orchestrates our containers, manages scaling, and handles service discovery
- **Skaffold**: Facilitates continuous development with automated deployments and quick iterations
- **NATS**: Provides a lightweight pub/sub system for inter-service communication
- **Express**: Powers our API endpoints in each service
- **TypeScript**: Enhances code quality and developer productivity
- **JWT**: Implements secure user authentication

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
