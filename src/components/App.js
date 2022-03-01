import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from '../pages/Home';
import Survey from '../pages/Survey';
import Admin from '../pages/Admin';
import Layout from './Layout';
import { AuthProvider } from '../contexts/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/survey' element={<Survey />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
