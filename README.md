# Note Taking Web App

## Project Objective

This project is a note-taking application developed with Next.js, TypeScript, and Tailwind CSS. It aims to demonstrate the application of SOLID principles and hexagonal architecture to create a robust, maintainable, and scalable codebase that can be extended to larger projects.

## Project Structure

The project is structured according to hexagonal architecture principles, promoting a clear separation of concerns and independence from specific frameworks and technologies. Here is an overview of the main structure:

- **src/app**: Contains the application pages, organized by features (e.g., dashboard, auth).
- **src/core**: Groups reusable components, actions, and application services. This is where hexagonal architecture is primarily implemented.
- **src/config**: Contains global configurations, including routes and mocks.
- **prisma**: Manages database configuration and Prisma schemas.

## SOLID Principles and Hexagonal Architecture

- **Single Responsibility Principle (SRP)**: Each module or class has a single well-defined responsibility.
- **Open/Closed Principle (OCP)**: The system is open to extension but closed to modification, facilitating the addition of new features without altering existing code.
- **Liskov Substitution Principle (LSP)**: Objects of a derived class can replace objects of the base class without altering the program's functionality.
- **Interface Segregation Principle (ISP)**: Interfaces are client-specific, avoiding unnecessary dependencies.
- **Dependency Inversion Principle (DIP)**: High-level modules do not depend on low-level modules but on abstractions.

Hexagonal architecture allows for the separation of business logic from user interfaces and infrastructures, making the code more testable and adaptable to technological changes.

## Key Features

- **Authentication**: User management with actions for registration, login, and password reset.
- **Note Taking**: Creation, display, and management of notes with navigation and filtering features.
- **User Interface**: Utilizes Tailwind CSS for a responsive and modern design, with integrated UI components.

## Setup

To start the project locally, follow these steps:

1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Configure environment variables in a `.env` file.
4. Start the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Goal

The goal of this project is to serve as a model for modern web applications, emphasizing best development practices such as the use of reusable components, effective state management, and integration of third-party services. It is designed to be easy to set up while providing a robust foundation for more complex projects.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript for better type management and increased code safety.
- **Tailwind CSS**: A utility-first CSS framework for rapid and responsive design.
- **Prisma**: An ORM for simplified database interaction.

## Contribution

Contributions are welcome! Feel free to open an issue or a pull request to propose improvements or report bugs.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.