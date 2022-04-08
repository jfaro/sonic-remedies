import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { AuthenticatedRoute, UnauthenticatedRoute } from './components/Routes';
import { AuthContextProvider } from './services/firebase';

import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { ConfigProvider } from 'antd';
import NoData from './components/NoData';


function App() {
  return (
    <AuthContextProvider>
      <ConfigProvider renderEmpty={NoData}>
        <Router>
          <PageLayout>
            <Routes>

              {/* Home */}
              <Route path='/' element={<Home />} />

              {/* Unauthenticated routes */}
              <Route path='/login' element={
                <UnauthenticatedRoute>
                  <Login />
                </UnauthenticatedRoute>
              } />

              {/* Authenticated routes */}
              <Route path='/survey' element={
                <AuthenticatedRoute>
                  <Survey />
                </AuthenticatedRoute>
              } />
              <Route path='/admin' element={
                <AuthenticatedRoute>
                  <Admin />
                </AuthenticatedRoute>
              } />
            </Routes>
          </PageLayout>
        </Router>
      </ConfigProvider>
    </AuthContextProvider>
  );
}

export default App;
