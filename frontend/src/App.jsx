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
import PropModal from "./components/PropModal";

const App = () => {
  return (
    <Router>
      <Navbar />
      <CreatePartyModal />
      <JoinPartyModal />
      <PropModal />
      <Routes>
        <Route path="/" element={<Navigate to="/parties" />} />
        <Route path="/parties" element={<PartyList />} />
        <Route path="/parties/:partyId" element={<PartyDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
