import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Survey from '../pages/Survey';
import Admin from '../pages/Admin';
import Layout from './Layout';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../pages/Login';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />

            {/* Private routes */}
            <Route path='/survey' element={
              <PrivateRoute>
                <Survey />
              </PrivateRoute>
            } />
            <Route path='/admin' element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
