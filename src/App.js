import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>McCLINT Foods</h1>
        <Link to="/">Sign Up</Link>
        <Link to="/login">Login</Link>
        <Link to="/create">Add New Food</Link>
      </nav>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
