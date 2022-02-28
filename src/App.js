import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Survey from './pages/Survey';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="survey" element={<Survey />} />
      </Routes>
    </Router>
  );
}

export default App;
