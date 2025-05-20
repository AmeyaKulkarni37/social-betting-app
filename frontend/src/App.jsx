import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PartyList from "./components/PartyList";
import PartyDetails from "./components/PartyDetails";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/parties" />} />
        <Route path="/parties" element={<PartyList />} />
        <Route path="/parties/:partyId" element={<PartyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
