# AI Chatbot Application

## Overview

This project is a custom AI-powered chatbot application inspired by ChatGPT. It is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and integrates OpenAI’s powerful language model. 

The chatbot allows users to interact with an AI in real-time, and features secure storage of user conversations, including the ability to retrieve and delete previous messages. Security measures such as JWT tokens, HTTP-only cookies, signed cookies, and password encryption ensure that user data is protected.

## Features

- **Customizable Chatbot:** Powered by OpenAI's language model, delivering intelligent and dynamic responses.
- **User Message Management:** User messages are stored in a MongoDB database, and users can retrieve or delete their messages as needed.
- **Security Features:** 
  - JWT (JSON Web Tokens) for secure user authentication.
  - HTTP-only cookies and signed cookies for additional protection against XSS attacks.
  - Password encryption using industry-standard hashing algorithms.
  - Middleware chains that handle authentication, authorization, and data validation.
  
## Tech Stack

- **Frontend:** React.js, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** OpenAI API
- **Security:** JWT Tokens, HTTP-Only Cookies, Signed Cookies, Password Encryption

## Getting Started

### Prerequisites

To run this application, you will need the following installed:

- Node.js (v14+)
- MongoDB (local or cloud)
- OpenAI API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ai-chatbot-mern.git
   cd ai-chatbot-mern
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Configuration

1. **Backend Configuration:**  
   Create a `.env` file in the `server` directory and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDB
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

## Application Structure

### Backend (Node.js & Express.js)
- **`app.ts`**: Entry point for the server and routing.
- **`routes/`**: Contains API routes for handling user activities, CRUD operations, etc.
- **`models/`**: MongoDB models for users and messages.
- **`db/`**: Database connectivity.
- **`controllers/`**: Handles the logic and action methods for each API route.
- **`utils/`**: JWT token, HTTP-only cookies implemented for authentication, validation, and error handling.
  
## Security Considerations

This application uses the following security measures to ensure data protection:
- **JWT Tokens:** Secure user authentication and authorization.
- **HTTP-Only Cookies:** Prevent access to cookies via JavaScript, mitigating XSS attacks.
- **Signed Cookies:** Add tamper protection to cookies, ensuring integrity.
- **Password Encryption:** All user passwords are hashed using bcrypt before being stored in the database.
- **Middleware Chains:** Middleware functions handle authentication, authorization, input validation, and more.

## Future Improvements

- **User Roles and Permissions:** Introduce roles such as admin or moderator for advanced message management.
- **Multi-language Support:** Extend AI capabilities to respond in multiple languages.
- **Real-time Notifications:** Notify users when their messages are successfully stored, retrieved, or deleted.
- **AI Training:** Allow users to provide feedback that helps improve the AI model over time.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for feedback, suggestions, or bugs.
