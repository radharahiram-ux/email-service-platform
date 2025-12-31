# Email Service Platform

A professional, modern email client built with React, TypeScript, and Tailwind CSS, featuring a complete backend API.

## 🚀 Quick Start

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Running the Application

1. **Start the Backend API:**
   ```bash
   cd backend
   npm install
   npm start
# Deploy to Vercel (easiest)
npm install -g vercel
vercel login
vercel
```
The API will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal):**
   ```bash
   npm install
   npm start
   ```
   The app will open at `http://localhost:3000`

## 📁 Project Structure

```
email-service-platform/
├── backend/                 # Express.js API server
│   ├── server.js           # Main API server
│   ├── package.json        # Backend dependencies
│   └── README.md           # API documentation
├── src/                    # React frontend
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React Context for state management
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Application entry point
├── public/                 # Static assets
├── package.json            # Frontend dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # This file
```

## ✨ Features

- **Modern UI**: Clean, responsive design with professional styling
- **TypeScript**: Full type safety for better development experience
- **Component Architecture**: Modular, maintainable code structure
- **Real-time Notifications**: Simulated real-time email notifications
- **Search Functionality**: Search through emails by sender, subject, or content
- **Email Management**: Star, mark as read, delete emails
- **Compose Emails**: Full compose interface with CC/BCC support
- **RESTful API**: Complete backend API with CRUD operations
- **State Management**: React Context API for centralized state

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Backend**: Node.js with Express.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **State Management**: React Context API

## 🔌 API Integration

The frontend automatically connects to the backend API running on `http://localhost:5000`. If the API is unavailable, it falls back to mock data for development.

### API Endpoints

- `GET /api/emails` - Get all emails
- `POST /api/emails` - Send new email
- `PUT /api/emails/:id/read` - Mark as read/unread
- `PUT /api/emails/:id/star` - Star/unstar email
- `DELETE /api/emails/:id` - Delete email
- `POST /api/emails/simulate` - Simulate new email (for testing)

This application follows modern React best practices:

- **Functional Components**: Uses React hooks for state management
- **TypeScript**: Provides type safety and better developer experience
- **Component Composition**: Modular components that can be easily maintained and tested
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Future Enhancements

- Backend integration with real email APIs
- User authentication and authorization
- Email threading and conversations
- Attachments support
- Advanced search and filtering
- Dark mode support
- Offline functionality with service workers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License


This project is licensed under the MIT License.

