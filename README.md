# BLOG - React Frontend

Frontend client application for a MERN blog platform. This is the React/frontend component that handles user interface, routing, state management, and API communication.

## Features

### Core
- User authentication (login/register)
- Blog creation and management
- User profile management
- Category-based blog organization
- Real-time updates via Socket.io
- Blog search and filtering

### Optimizations
- Skeleton loading for content fetching
- Lazy component loading
- Context API for state management
- CSS media queries for responsive design
- Efficient re-renders with React hooks
- Image optimization with .avif format

## Tech Stack

- React 18.2
- React Router v6
- Material-UI (MUI) 5.13
- Axios 1.4
- Socket.io-client 4.8
- OpenAI 4.86
- CSS3 with media queries

## 📁 Project Structure

```
client/
├── public/
│   ├── index.html          # Main HTML file
│  Directory Structure

```
src/
├── api/
│   └── api.js              Axios API configuration
├── asset/
│   ├── profileImage.avif
│   ├── BlogImage/
│   └── sound/
├── commponent/             React components
│   ├── Blog.jsx
│   ├── BlogSection.jsx
│   ├── Categories.jsx
│   ├── Featured.jsx
│   ├── Footer.jsx
│   ├── Fullblog.jsx
│   ├── IntroCard.jsx
│   ├── Introduction.js
│   ├── Login.jsx
│   ├── Navbar.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   └── SkeletonLoader.jsx
├── Context/                State management
│   ├── authContext.js
│   ├── blogContentContext.js
│   └── socketContext.js
├── Pages/
│   ├── BlogPost.js
│   ├── Home.js
│   └── Main.js
├── App.js                  Root component with routing
├── index.js                Entry point
├── app.css                 Global styles
├── socketHooks.js          Custom socket hooks
└── Category.js             Utility function
- npm or yarn package manager
- Backend server running (see backend repository)
- MongoDB instance running

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   Setup

### Requirements
- Node.js 14+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create `.env.local`:
```
REACT_APP_API_URL=https://localhost:8000

```

### Run

```bash
npm start
```

Development server runs on
Builds the app for production to the `build` folder.

### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode.
Scripts

```bash
npm start      # Development server
npm build      # Production build
npm test       # Run tests
npm eject      # Expose config (irreversible)
```
4. Protected routes verify the token before rendering
5. User data is stored in the `authContext` for global access

## 🎨 UI Components

### Key Components
- **Navbar**: Navigation with user menu
- **BlogSection**: Grid display of blog cards
- **Fullblog**: Detailed blog post view with comments
- **Profile**: User profile with posts management
- **Featured**: Highlight section for featured blogs
- **Categories**: Blog category filter
- *Routes

| Path | Component | Protected |
|------|-----------|-----------|
| `Authentication

JWT tokens stored in localStorage. Protected routes check `authContext` before rendering.

## State Management

- `authContext.js` - User auth state
- `blogContentContext.js` - Blog data
- `socketContext.js` - Real-time updates

## Performance

- Skeleton loaders during data fetch
- Context API prevents prop drilling
- Custom hooks for Socket.io
- CSS media queries: desktop (1200px+), tablet (640-900px), mobile (<640px)
- Image optimization with .avif format

## Real-time

Socket.io integration for live notifications and updat
## 🛠️ Development Guidelines

### Component Structure
- Use functional components with React Hooks
- Implement Context API for state management
- Keep components modular and reusable
- Use CSS modules or inline styles for component styling

### Best Practices
- Follow React naming conventions (PascalCase for components)
- Use async/await for API calls
- Implement proper error handling
- Add loading states with SkeletonLoader
- Validate user inputs before submission

## 📦 Dependencies

### Core Dependencies
- `react` (18.2.0) - UI framework
- `react-dom` (18.2.0) - React DOM rendering
- `react-router-dom` (6.14.1) - Routing
- `axios` (1.4.0) - HTTP client
- `socket.io-client` (4.8.1) - Real-time communication
- `@mui/material` (5.13.7) - Component library
- `@mui/icons-material` (5.13.7) - Icon library
- `openai` (4.86.1) - OpenAI API client

###Development

### Code Style
- Functional components with React Hooks
- Context API for state
- Modular, reusable components
- CSS for styling

### Best Practices
- PascalCase for components
- Async/await for API calls
- Error handling
- Input validation
- Loading states with SkeletonLoaderning
- Check network tab in browser DevTools
- Ensure firewall allows WebSocket connections

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ by thedhirajshah13
Dependencies

- react 18.2.0
- react-dom 18.2.0
- react-router-dom 6.14.1
- axios 1.4.0
- socket.io-client 4.8.1
- @mui/material 5.13.7
- @mui/icons-material 5.13.7
- openai 4.86.1
- react-scripts 5.0.1
- [ ] Blog scheduling
- [ ] Analytics dashboard

---

**HBackend API

Endpoints this frontend communicates with:

```
POST   /register
POST   /login
GET    /blogs
GET    /blogs/:id
POST   /blogs
PUT    /blogs/:id
DELETE /blogs/:id
GET    /profile
PUT    /profile
GET    /categories
```

## Troubleshooting

**Port 3000 in use**
```bash
PORT=3001 npm start
```

**CORS errors** - Verify backend CORS config and `REACT_APP_API_URL`

**Socket.io issues** - Check backend server and network tab in DevTools

## License

