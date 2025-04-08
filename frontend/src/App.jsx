import React from "react";
import Navbar from "./components/Navbar";
import PartyList from "./components/PartyList";
import CreatePartyModal from "./components/CreatePartyModal";
import JoinPartyModal from "./components/JoinPartyModal";

const App = () => {
  return (
    <div>
      <Navbar />
      <PartyList />
      <CreatePartyModal />
      <JoinPartyModal />
    </div>
  );
};

export default App;
