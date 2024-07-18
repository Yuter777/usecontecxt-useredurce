import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { AuthProvider } from "./hooks/useAuth";
import Posts from "./pages/Posts";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PostProvider } from "./Contexts/MainContext";
import Todos from "./components/Todos";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/students"
              element={
                <PostProvider>
                  <Todos />
                </PostProvider>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
