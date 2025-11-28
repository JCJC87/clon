# Marquesina Vintage

## Overview
This is a React + Vite frontend application for displaying a vintage-style marquee (like old movie theater signs). The project connects to an external backend API hosted on Vercel to fetch and send messages for the marquee display. It appears to be designed as a Twitch extension panel.

## Project Structure
- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.4.20
- **Language**: JavaScript (JSX)
- **Entry Point**: `index.html` → `src/main.jsx` → `src/App.jsx`
- **Components**:
  - `src/components/Marquesina.jsx` - Main marquee component
  - `src/components/Mensaje.jsx` - Message component
- **API Layer**: `src/api.js` - Handles communication with backend on Vercel
- **Styling**: `src/styles/marquesina.css`

## Backend Integration
The frontend connects to an external backend API at:
- URL: `https://bmark-1-six.vercel.app`
- Endpoints:
  - `GET /messages` - Fetch messages
  - `POST /messages` - Send new messages

## Development Setup (Replit)
- **Dev Server**: Runs on port 5000 with host 0.0.0.0
- **Workflow**: "Frontend Dev Server" runs `npm run dev`
- **Hot Module Replacement**: Configured for Replit's HTTPS proxy (port 443, WSS protocol)
- **Proxy Support**: Configured to work with Replit's iframe proxy

## Deployment Configuration
- **Type**: Static site deployment
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Preview Command**: `npm run preview`

## Recent Changes (November 28, 2025)
- Configured Vite to run on port 5000 with host 0.0.0.0 for Replit environment
- Added HMR configuration for Replit proxy compatibility
- Created .gitignore for Node.js project
- Set up workflow for frontend dev server
- Configured static site deployment

## User Preferences
None documented yet.

## Notes
- This project was imported from GitHub
- The manifest.json file suggests this is designed for Twitch integration
- Backend is hosted separately on Vercel and is not part of this repository
