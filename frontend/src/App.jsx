import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fix the typo
import Register from './pages/Register';
import { ToastContainer} from 'react-toastify';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
    </>
  );
}

export default App;
