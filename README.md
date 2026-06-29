# JMD Digital Library Management System

A comprehensive digital library management system built with modern web technologies to streamline library operations, seat management, attendance tracking, and student services.

## 📋 Overview

JMD Digital Library Management System is a full-stack web application designed to manage digital library operations efficiently. The system provides separate interfaces for administrators and students, enabling seamless management of library resources, seat bookings, attendance tracking, and fee management.

## ✨ Features

### For Administrators
- **Dashboard**: Overview of library statistics and activities
- **Seat Management**: Create, update, and manage library seating arrangements
- **Student Management**: View and manage student records
- **Attendance Tracking**: Monitor student attendance in real-time
- **Fee Management**: Track and manage student fee payments
- **Time Slot Management**: Configure library operating hours and time slots
- **Booking Requests**: Approve or reject seat booking requests
- **QR Code Integration**: Generate and scan QR codes for quick access
- **Real-time Notifications**: Instant updates via Socket.io

### For Students
- **Student Dashboard**: Personal overview of library activities
- **Seat Booking**: Book available seats in the library
- **Attendance View**: Check personal attendance history
- **Fee Status**: View fee payment status and history
- **Profile Management**: Update personal information
- **QR Code Scanner**: Scan QR codes for quick check-in/check-out

### General Features
- **User Authentication**: Secure login and registration system
- **Real-time Updates**: Live notifications and updates using Socket.io
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Secure API**: Protected routes with JWT authentication
- **Rate Limiting**: API protection against abuse
- **QR Code Generation**: Automatic QR code creation for bookings

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Styling and responsive design
- **Axios** - HTTP client for API requests
- **HTML5-QRCode** - QR code scanning functionality
- **React Icons** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **Socket.io** - Real-time bidirectional communication
- **JWT** - User authentication
- **Bcrypt** - Password hashing
- **QRCode** - QR code generation
- **Helmet** - Security headers
- **Express Rate Limit** - API rate limiting
- **CORS** - Cross-origin resource sharing
- **Brevo** - Email service integration

## 📁 Project Structure

```
jmd-digital-library-management-system/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── assets/        # Images and static files
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Scanner.jsx
│   │   │   └── SideMenuPanel.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── admin/     # Admin pages
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminLoginPage.jsx
│   │   │   │   ├── LibraryViewPage.jsx
│   │   │   │   ├── SeatManagementPage.jsx
│   │   │   │   ├── SeatRequestsPage.jsx
│   │   │   │   └── TotalStudentsDetailsPage.jsx
│   │   │   ├── auth/      # Authentication pages
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   └── RegisterPage.jsx
│   │   │   └── client/    # Student pages
│   │   │       ├── StudentAttendancePage.jsx
│   │   │       ├── StudentDashboard.jsx
│   │   │       ├── StudentFeesPage.jsx
│   │   │       └── StudentProfilePage.jsx
│   │   ├── App.jsx        # Main app component
│   │   ├── App.css
│   │   ├── main.jsx       # Entry point
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                # Backend Express application
    ├── .env.example
    ├── server.js          # Server entry point
    ├── package.json
    └── src/
        ├── config/        # Database and app configuration
        ├── controllers/   # Route controllers
        ├── middleware/    # Custom middleware
        ├── models/        # Mongoose models
        ├── routes/        # API routes
        │   ├── auth.routes.js
        │   ├── student.routes.js
        │   ├── admin.routes.js
        │   ├── seat.routes.js
        │   ├── attendance.routes.js
        │   ├── fees.routes.js
        │   ├── slot.routes.js
        │   ├── booking.routes.js
        │   ├── notification.routes.js
        │   └── qr.routes.js
        └── utils/         # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ddubeynitin/jmd-digital-library-management-system.git
   cd jmd-digital-library-management-system
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   BREVO_API_KEY=your_brevo_api_key
   ```

5. **Start the development servers**

   Terminal 1 - Start backend:
   ```bash
   cd server
   npm start
   ```

   Terminal 2 - Start frontend:
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📦 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm start` - Start server with nodemon

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Admin
- `GET /api/admin/dashboard` - Admin dashboard data
- Various admin management endpoints

### Seats
- `GET /api/seats` - Get all seats
- `POST /api/seats` - Create new seat
- `PUT /api/seats/:id` - Update seat
- `DELETE /api/seats/:id` - Delete seat

### Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Fees
- `GET /api/fees` - Get fee records
- `POST /api/fees` - Create fee record
- `PUT /api/fees/:id` - Update fee status

### Time Slots
- `GET /api/slots` - Get all time slots
- `POST /api/slots` - Create time slot
- `PUT /api/slots/:id` - Update time slot

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/approve` - Approve booking
- `PUT /api/bookings/:id/reject` - Reject booking

### Notifications
- `GET /api/notifications` - Get notifications
- Real-time notifications via Socket.io

### QR Codes
- `POST /api/qr/generate` - Generate QR code
- `POST /api/qr/scan` - Scan and process QR code

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/library-management

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Email Service (Brevo)
BREVO_API_KEY=your_brevo_api_key

# Client URL
CLIENT_URL=http://localhost:5173
```

## 🎨 Features in Detail

### Seat Management
- Visual seat layout management
- Real-time seat availability
- Booking request system
- QR code-based check-in/check-out

### Attendance System
- Automatic attendance marking via QR scan
- Attendance history tracking
- Real-time attendance updates

### Fee Management
- Track student fee payments
- Payment status monitoring
- Automated notifications for pending fees

### Time Slot Management
- Configure library operating hours
- Multiple time slots support
- Branch-specific time slots

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Nitin Dubey**

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

## 🚧 Roadmap

- [ ] Add advanced analytics and reporting
- [ ] Implement barcode support alongside QR codes
- [ ] Add multi-branch support
- [ ] Integrate payment gateway for online fee payment
- [ ] Mobile app development
- [ ] Advanced search and filtering
- [ ] Export reports to PDF/Excel
- [ ] Email notifications for booking confirmations

---

**Built with ❤️ using React, Node.js, Express, and MongoDB**