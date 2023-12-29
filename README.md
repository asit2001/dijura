# Dijura Library System

Dijura is a library management system built on React for the frontend and Node.js, Express, and MongoDB for the backend. Users can browse a collection of books and view their transaction history.

## Installation

Make sure you have Node.js, Git, and optionally Yarn installed.

### Node.js

Download and install [Node.js](https://nodejs.org/).

### Git

Download and install [Git](https://git-scm.com/).

### Yarn (Optional)

If you prefer Yarn, install it globally:

```bash
npm install -g yarn
```

Clone the repository:

```bash
git clone https://github.com/asit2001/dijura.git
```

Navigate to the project directory:

```bash
cd dijura
```

Install dependencies with Yarn (if available):

```bash
yarn --cwd ./backend && yarn --cwd ./frontend
```

If Yarn is not available, use npm with the --prefix command:

```bash
npm --prefix ./backend install && npm --prefix ./frontend install
```

## Usage

To start the backend, go to the backend directory and run:

```bash
cd backend
yarn dev   # or npm run dev
```

To start the frontend, go to the frontend directory and run:

```bash
cd frontend
yarn start   # or npm start
```

Access the API documentation in the browser at [https://dijura.vercel.app/api/api-doc/](https://dijura.vercel.app/api/api-doc/).

For the admin panel, navigate to /admin in the frontend after registering.

## Testing

To run backend API tests, go to the backend directory and run:

```bash
cd backend
yarn test   # or npm run test
```

Feel free to explore and contribute to the project!

### Available Routes

- /
- /login
- /register
- /transaction

#### Admin panel

- /admin
- /admin/login
- /admin/register

### Frontend Routes

**Browse Books:**

- [https://dijura.vercel.app/](https://dijura.vercel.app/)

**User Transactions:**

- [https://dijura.vercel.app/transaction](https://dijura.vercel.app/transaction)

**User Authentication:**

- [https://dijura.vercel.app/register](https://dijura.vercel.app/register)
- [https://dijura.vercel.app/login](https://dijura.vercel.app/login)

### Admin Features

- **Manage Books:**
  - Create, update, and delete books.
  - Update book images.

- **Manage Transactions:**
  - Change transaction status from borrowed to returned and vice versa.
  - Assign books to users.

**Admin Authentication:**

- [https://dijura.vercel.app/admin](https://dijura.vercel.app/admin)
- [https://dijura.vercel.app/admin/register](https://dijura.vercel.app/admin/register)
- [https://dijura.vercel.app/admin/login](https://dijura.vercel.app/admin/login)

### User Features

- **View Books:**
  - Browse the collection of available books.

- **Transaction History:**
  - View personal transaction history.

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Redux Toolkit**: State management for React applications.
- **Axios**: To connect backend api.
- **React Router**: Declarative routing for React.
- **Formik**:  handling Form.
- **PrimeReact**: UI components library.
- **TypeScript**: For type safety.

### Backend

- **Express**: To Handel HTTP request.
- **MongoDB and Mongoose**: Database and object modeling for Node.js.
- **JSON Web Tokens (JWT)**: for Authentication.
- **Bcrypt**: Password hashing.
- **Multer**: For handling multipart/form-data (used for image upload).
- **Swagger UI Express**: For serving API documentation.
- **Firebase Admin**: used for image upload.

## Hosting

The Dijura Library System is hosted at [https://dijura.vercel.app/](https://dijura.vercel.app/).

## Image Upload

Firebase Admin SDK is utilized for image upload functionality.

## Authentication

Authentication is JWT token-based, and passwords are hashed with bcrypt. Role-based authentication is implemented.
