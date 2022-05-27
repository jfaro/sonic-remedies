import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ConfigProvider } from 'antd';

import { AuthenticatedRoute, UnauthenticatedRoute } from './components/Routes';
import { AuthContextProvider } from './services/firebase';
import PageLayout from './components/layout/PageLayout';
import NoData from './components/common/NoData';

import Home from './components/pages/Home';
import Survey from './components/pages/Survey';
import Admin from './components/pages/Admin';
import Login from './components/pages/Login';


function App() {
  return (
    <AuthContextProvider>
      <ConfigProvider renderEmpty={NoData} space={{ size: 'large' }}>
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
