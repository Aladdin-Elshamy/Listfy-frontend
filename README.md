# Listfy Todo App

<img width="3465" height="1824" alt="Image" src="https://github.com/user-attachments/assets/c28829c4-b9a2-47c1-acf5-204f9f1c3a9a" />

## Overview
Listfy is a full-stack to-do application designed to help users manage their tasks efficiently. Users can register, log in, create, edit, delete, and sort their to-dos, with pagination for a seamless experience. The frontend is deployed on Vercel, while the backend is powered by Strapi, a headless CMS, ensuring a robust and scalable architecture.

## Features
- **User Authentication**: Secure user registration and login functionality.
- **Task Management**:
  - Create new to-dos with details like title, description, and status.
  - Edit existing to-dos to update details.
  - Delete to-dos when no longer needed.
- **Task Sorting**: Sort to-dos based on various criteria (e.g., date, status, or priority).
- **Pagination**: Navigate through large lists of to-dos with efficient pagination.
- **Task Generation**: Generate sample to-dos for testing or quick setup.
- **Responsive Design**: Accessible on both desktop and mobile devices.
- **Backend with Strapi**: A headless CMS for managing to-do data, user accounts, and API endpoints.
- **Query-Based Filtering**: Use query parameters to filter and retrieve specific to-dos.

## Tech Stack
- **Frontend**:
  - Framework: [React](https://reactjs.org/)
  - Language: Typescript
  - Deployment: [Vercel](https://vercel.com/)
  - Styling: Tailwind CSS
- **Backend**:
  - CMS: [Strapi](https://strapi.io/) (headless CMS for API management)
- **API**: RESTful API provided by Strapi for CRUD operations.
- **Authentication**: JWT-based authentication for secure user sessions.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or Yarn
- Git
- A Vercel account for frontend deployment
- A Strapi-compatible database

### Installation

#### Backend (Strapi)
1. **Clone the Repository** (if available):
   ```bash
   git clone <repository-url>
   cd listfy-backend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   - Create a `.env` file in the `listfy-backend` directory.
   - Add necessary configurations (e.g., database settings, JWT secret):
     ```env
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     ```
4. **Run Strapi**:
   ```bash
   npm run develop
   ```
   - Access the Strapi admin panel at `http://localhost:1337/admin`.
   - Set up an admin user and configure the to-do and user content types.

#### Frontend
1. **Clone the Repository** (if separate):
   ```bash
   git clone <frontend-repository-url>
   cd listfy-frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   - Create a `.env` file in the `listfy-frontend` directory.
   - Add the Strapi API URL:
     ```env
     REACT_APP_API_URL=http://localhost:1337
     ```
4. **Run the Frontend**:
   ```bash
   npm run dev
   ```
   - The app will be available at `http://localhost:5173`.

### Deployment
- **Frontend (Vercel)**:
  1. Push the frontend code to a GitHub, GitLab, or Bitbucket repository.
  2. Log in to [Vercel](https://vercel.com/) and import the repository.
  3. Configure build settings (e.g., framework preset for React).
  4. Deploy the app, and Vercel will provide a URL (e.g., `https://listfy-nine.vercel.app/`).
- **Backend (Strapi)**:
  1. Deploy Strapi to its cloud provider.
  2. Configure the production database and environment variables.
  3. Update the frontend `.env` file with the production Strapi API URL.

## Usage
1. **Register/Login**: Create an account or log in to access the dashboard.
2. **Manage To-Dos**:
   - Add a new to-do via the "Create To-Do" form.
   - Edit or delete existing to-dos from the list.
   - Use sorting options to organize tasks.
   - Navigate through pages of to-dos using pagination controls.
3. **Generate Sample To-Dos**: Use the generate feature to populate the list with sample tasks.
4. **API Interaction**: The frontend communicates with Strapi’s REST API for all CRUD operations.

## API Endpoints
The Strapi backend provides the following key endpoints:
- `POST /api/auth/local/register`: Register a new user.
- `POST /api/auth/local`: Log in and receive a JWT.
- `GET /api/todos`: Retrieve a list of to-dos (supports query parameters for filtering and pagination).
- `POST /api/todos`: Create a new to-do.
- `PUT /api/todos/:id`: Update an existing to-do.
- `DELETE /api/todos/:id`: Delete a to-do.

Refer to the Strapi documentation for detailed API configuration.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.


## Contact
For questions or support, contact the project maintainer at [aladdinelshamy@gmail.com] or open an issue on the repository.
