import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import ContactsList from "./components/ContactsList";
import AddContact from "./components/AddContact";
import Contact from "./components/Contact";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Contacts App
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/contacts"} className="nav-link">
              Contacts
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/contacts"} element={<ContactsList />} />
          <Route exact path={"/add"} element={<AddContact />} />
          <Route path={"/contacts/:id"} element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
