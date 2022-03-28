import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import PageLayout from './components/PageLayout';
import { AuthProvider } from './contexts/AuthContext';

import Home from './pages/Home';
import Survey from './pages/Survey';
import Admin from './pages/Admin';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <AuthProvider>
        <PageLayout>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />

            {/* Authenticated routes */}
            <Route path='/survey' element={
              <PrivateRoute>
                <Survey />
              </PrivateRoute>
            } />

            {/* Admin routes */}
            <Route path='/admin' element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } />
          </Routes>
        </PageLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
