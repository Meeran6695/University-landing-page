# React Setup Guide

This project has been converted from vanilla HTML/CSS/JavaScript to React using Vite.

## Project Structure

```
src/
├── components/          # React components
│   ├── Hero.jsx
│   ├── Overview.jsx
│   ├── Courses.jsx
│   ├── Fees.jsx
│   ├── Placements.jsx
│   ├── Facilities.jsx
│   ├── LeadForm.jsx
│   ├── Footer.jsx
│   ├── FeesModal.jsx
│   └── UniversityPage.jsx
├── data/
│   └── universities.js  # University data configuration
├── App.jsx              # Main app with routing
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Routes

- `/` or `/university1` - TechVista University
- `/university2` - Global Excellence University

## Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_PIPEDREAM_WEBHOOK_URL=your_pipedream_webhook_url_here
```

## Features

- ✅ React 18 with functional components and hooks
- ✅ React Router for navigation
- ✅ Component-based architecture
- ✅ State management with React hooks
- ✅ Responsive design (same CSS as before)
- ✅ Form handling with validation
- ✅ Modal functionality
- ✅ API integration for fees data
- ✅ Pipedream webhook integration

## Key Changes from Vanilla JS

1. **Components**: All HTML sections converted to React components
2. **State Management**: Using `useState` and `useRef` hooks
3. **Routing**: React Router for multiple university pages
4. **Event Handlers**: Converted to React event handlers
5. **Form Handling**: Controlled components with React state
6. **Data**: Centralized in `src/data/universities.js`

## Running the Backend Server

The Express server can still be run separately:
```bash
npm run server
```

This will start the API server on port 5000 (for fees endpoints).

