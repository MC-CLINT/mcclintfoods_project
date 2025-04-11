import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { useAuth } from "./context/AuthContext";


function App() {
     const { session, signOutUser } = useAuth();
            console.log(session);

    return (
      <BrowserRouter>
      <nav>
      <h1>McCLINT Foods</h1>
      <Routes>
      <Route
        path="/home"
        element={
        <>
        <Link to="/create">Add New Food</Link>
        <Link to="/signup" onClick={signOutUser}>Sign Out</Link>
        </>
        }
      />
      <Route
        path="/create"
        element={
        <>
        <Link to="/home">Home</Link>
        </>
        }
      />
      <Route
        path="/:id"
        element={
        <>
        <Link to="/home">Home</Link>
        </>
        }
      />
      </Routes>
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
