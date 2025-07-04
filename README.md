# Dental Center Management Dashboard

A React-based dashboard for managing dental center operations with patient management, appointment scheduling, and file attachments.

## Features

- Role-based authentication (Admin/Dentist and Patient)
- Patient management (CRUD operations)
- Appointment/incident management
- Calendar view for appointments
- Dashboard with key metrics
- File upload and management
- Responsive design

## Technologies Used

- React (functional components)
- React Router for navigation
- Context API for state management
- Material-UI for UI components
- TailwindCSS for styling
- date-fns for date handling
- localStorage for data persistence

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the app: `npm start`

## Mock Users

- Admin: admin@entnt.in / admin123
- Patient: john@entnt.in / patient123

## Technical Decisions

1. **State Management**: Used Context API instead of Redux as the application is not complex enough to warrant Redux.
2. **Styling**: Combined Material-UI with TailwindCSS for rapid development and custom styling.
3. **Data Persistence**: localStorage was chosen as per requirements to simulate a backend.
4. **Form Handling**: Implemented custom form validation and reusable form components.
5. **File Upload**: Files are stored as base64 strings in localStorage.

## Future Improvements

1. Implement proper backend integration
2. Add more robust form validation
3. Enhance calendar view with drag-and-drop functionality
4. Add more detailed reporting
5. Implement proper user authentication
