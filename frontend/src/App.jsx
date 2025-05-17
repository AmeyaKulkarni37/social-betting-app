import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import PartyList from "./components/PartyList";
import CreatePartyModal from "./components/CreatePartyModal";
import JoinPartyModal from "./components/JoinPartyModal";
import PartyDetails from "./components/PartyDetails";

const App = () => {
  return (
    <Router>
      <CreatePartyModal />
      <JoinPartyModal />
      <Routes>
        <Route path="/" element={<Navigate to="/parties" />} />
        <Route path="/parties" element={<PartyList />} />
        <Route path="/parties/:partyId" element={<PartyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
