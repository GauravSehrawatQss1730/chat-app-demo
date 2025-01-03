import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider,} from './AuthContext.js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './PageNotFound.jsx';
import PublicRoute from './PublicRoute.js';
import Chat from './pages/Chat.jsx';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
                        <Route path=":type/:id" element={<Chat />} />
          </Route>

          {/* 404 and Default Routes */}
          <Route
            path="*"
            element={<NotFound />} // "Page Not Found" is shown for invalid routes
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};


export default App;
