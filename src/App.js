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
import CreateSurvey from './pages/admin/CreateSurvey';
import Surveys from './pages/admin/Surveys';


function App() {
  return (
    <Router>
      <AuthProvider>
        <PageLayout>
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
            <Route path='/admin/surveys' element={
              <PrivateRoute>
                <Surveys />
              </PrivateRoute>
            } />
            <Route path='/admin/create-survey' element={
              <PrivateRoute>
                <CreateSurvey />
              </PrivateRoute>
            } />
          </Routes>
        </PageLayout>
      </AuthProvider>
    </Router>
  );
}

export default App;
