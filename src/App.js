import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import Details from './Details';
import Login from './Login';
import Register from './Register';
import Add from './Add';
import Events from './Events'
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

function App() {
  const { isLogin } = useAuth(); // Assuming isLogin is part of your authentication state

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={isLogin ? <Navigate to="/" /> : <Register />} />
          <Route path="/add-event" element={isLogin ? <Add /> : <Navigate to="/login" />} />
          <Route path="/" element={isLogin ? <Events /> : <Events/>} />
          <Route path="/event-detail/:name" element={isLogin ? <Details /> : <Navigate to="/login" />} /> {/*login shalgaad nevtreh*/}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
