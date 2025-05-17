import React from "react";
import Prop from "./Prop";
import { useState } from "react";
import PropModal from "./PropModal";
import Navbar from "./Navbar";

const PartyDetails = () => {
  const [activeTab, setActiveTab] = useState("active");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [propData, setPropData] = useState(null);

  const handleEditClick = (prop) => {
    setPropData(prop);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleAddProp = () => {
    setPropData(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handlePropSubmit = async (newPropData) => {
    // UPDATE THIS
    console.log("Submitted prop data:", newPropData);
    // if (modalMode === "add") {
    //   try {
    //     const response = await axios.post(
    //       "http://localhost:3000/api/props",
    //       newPropData
    //     );
    //   } catch (err) {
    //     console.error("Error adding prop:", err);
    //   }
    //   console.log("modal mode add");
    // } else {
    //   try {
    //     const response = await axios.put(
    //       `http://localhost:3000/api/props/${propData.id}`,
    //       newPropData
    //     );
    //   } catch (err) {
    //     console.error("Error updating prop:", err);
    //   }
    //   console.log("modal mode edit");
    // }
  };

  const propBets = [
    {
      title: "Prop A",
      description: "test description",
      option1: "Over",
      odds1: "+110",
      option2: "Under",
      odds2: "-150",
    },
    {
      title: "Prop B",
      description: "test description",
      option1: "Over",
      odds1: "-1500",
      option2: "Under",
      odds2: "+700",
    },
  ];

  const yourBets = [
    {
      prop: "Prop A",
      line: "Over",
      amount: 100,
      odds: "+110",
      result: "active",
    },
    {
      prop: "Prop B",
      line: "Under",
      amount: 200,
      odds: "-1500",
      result: "Win",
    },
  ];

  return (
    <>
      <Navbar onCreateProp={handleAddProp} />
      <div className="container mx-auto px-4 pt-10 w-4/5">
        <h1 className="text-3xl font-bold mb-10">[party name]</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bets Section (takes 2/3 on large screens) */}
          <div className="bg-base-300 lg:col-span-2 space-y-4 p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Props</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {propBets.map((prop, index) => (
                <Prop
                  key={index}
                  {...prop}
                  onEdit={() => handleEditClick(prop)}
                />
              ))}
            </div>
          </div>

          {/* Right Panel: Leaderboard & Invite */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-base-300 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
              <ol className="text-sm list-decimal list-inside space-y-1">
                {/* <li>Sarah - $150</li> */}
              </ol>
            </div>
            {/* Invite */}
            <div className="bg-base-300 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">
                Invite Your Friends!
              </h2>
            </div>
          </div>
        </div>

        {/* Your Bets */}
        <div className="bg-base-300 p-5 rounded-xl shadow mt-10">
          <h2 className="text-xl font-semibold mb-4">Your Bets</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex mb-4">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "active"
                    ? "border-b-2 border-primary text-primary"
                    : "text-base-content/60"
                }`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`px-4 py-2 font-medium ml-4 ${
                  activeTab === "cleared"
                    ? "border-b-2 border-primary text-primary"
                    : "text-base-content/60"
                }`}
                onClick={() => setActiveTab("cleared")}
              >
                Cleared
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Line</th>
                  <th>Amount</th>
                  {activeTab === "active" ? <th>Odds</th> : <th>Result</th>}
                </tr>
              </thead>
              <tbody>
                {activeTab === "active"
                  ? yourBets
                      .filter((prop) => prop.result === "active")
                      .map((prop, index) => (
                        <tr key={index}>
                          <td>{prop.prop}</td>
                          <td>{prop.line}</td>
                          <td>${prop.amount}</td>
                          <td>{prop.odds}</td>
                        </tr>
                      ))
                  : yourBets
                      .filter((prop) => prop.result !== "active")
                      .map((prop, index) => (
                        <tr key={index}>
                          <td>{prop.prop}</td>
                          <td>{prop.line}</td>
                          <td>${prop.amount}</td>
                          <td>{prop.result}</td>
                        </tr>
                      ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PropModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handlePropSubmit}
        propData={propData}
      />
    </>
  );
};

export default PartyDetails;
