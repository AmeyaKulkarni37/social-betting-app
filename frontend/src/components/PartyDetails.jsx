import React, { useEffect, useState } from "react";
import Prop from "./Prop";
import PropModal from "./PropModal";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import supabase from "../supabase-client";

const PartyDetails = () => {
  const { partyId } = useParams();
  const [activeTab, setActiveTab] = useState("active");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [propData, setPropData] = useState(null);

  // State for fetched data
  const [party, setParty] = useState(null);
  const [propBets, setPropBets] = useState([]);
  const [yourBets, setYourBets] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [joinCode, setJoinCode] = useState(null);

  useEffect(() => {
    const fetchPartyData = async () => {
      setLoading(true);

      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not logged in");
        return;
      }

      setUserId(user.id);

      // Fetch party details
      const { data: partyData, error: partyError } = await supabase
        .from("parties")
        .select("*")
        .eq("id", partyId)
        .single();

      if (partyError) {
        console.error("Error fetching party:", partyError.message);
      } else {
        setParty(partyData);
        console.log("partyID: ", partyId);
      }

      const { data, error } = await supabase
        .from("parties")
        .select("join_code")
        .eq("id", partyId)
        .single();
      if (error) {
        console.error("Error fetching party join code:", error.message);
      } else {
        console.log("Party join code:", data.join_code);
        setJoinCode(data.join_code);
      }

      // Fetch props (bets) for this party
      const { data: propsData, error: propsError } = await supabase
        .from("bets")
        .select("*")
        .eq("party_id", partyId);

      if (propsError) {
        console.error("Error fetching props:", propsError.message);
      } else {
        setPropBets(propsData);

        // Now fetch wagers after we have the props
        if (propsData && propsData.length > 0) {
          // Fetch user's wagers by joining with bets table to filter by party_id
          const { data: wagersData, error: wagersError } = await supabase
            .from("wagers")
            .select(
              `
              wager_id,
              user_id,
              bet_id,
              choice,
              odds,
              amount,
              placed_at,
              status,
              bets(*)
            `
            )
            .eq("user_id", userId)
            .in(
              "bet_id",
              propsData.map((prop) => prop.bet_id)
            );

          if (wagersError) {
            console.error("Error fetching wagers:", wagersError.message);
          } else {
            setYourBets(wagersData);
          }
        }
      }

      // Fetch leaderboard TODO: This would typically be a query that aggregates user winnings in this party

      setLoading(false);
    };

    if (partyId) {
      fetchPartyData();
    }
  }, [partyId]);

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

  const handlePropSubmit = async (formData) => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not authenticated");
        return;
      }

      if (modalMode === "add") {
        const betInsertData = {
          party_id: partyId,
          created_by: userId,
          bet_info: formData,
          created_at: new Date(),
          resolved_at: null,
        };

        const { data, error } = await supabase
          .from("bets")
          .insert(betInsertData)
          .select();

        if (error) {
          console.error("Error adding bet:", error);
          return;
        }

        // Update local state
        setPropBets([...propBets, data[0]]);
      } else {
        // Update mode (adjust this based on how you're editing)
        const { error } = await supabase
          .from("bets")
          .update({
            bet_info: formData,
          })
          .eq("bet_id", propData.bet_id);

        if (error) {
          console.error("Error updating bet:", error);
          return;
        }

        // Update local state
        setPropBets(
          propBets.map((prop) =>
            prop.bet_id === propData.bet_id
              ? { ...prop, bet_info: formData }
              : prop
          )
        );
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error in prop submission:", err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar onCreateProp={handleAddProp} />
        <div className="container mx-auto px-4 pt-10 w-4/5">
          <p className="text-xl">Loading party details...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar onCreateProp={handleAddProp} />
      <div className="container mx-auto px-4 pt-10 w-4/5">
        <h1 className="text-3xl font-bold mb-10">{party?.name || "Party"}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bets Section (takes 2/3 on large screens) */}
          <div className="bg-base-300 lg:col-span-2 space-y-4 p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Props</h2>
            {propBets.length === 0 ? (
              <p className="text-base-content/70">
                No props have been created for this party yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {propBets.map((prop) => (
                  <Prop
                    key={prop.bet_id}
                    title={prop.bet_info.title}
                    description={prop.bet_info.description}
                    option1={prop.bet_info.option1}
                    odds1={prop.bet_info.odds1}
                    option2={prop.bet_info.option2}
                    odds2={prop.bet_info.odds2}
                    onEdit={() => handleEditClick(prop)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: Leaderboard & Invite */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-base-300 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
              {leaderboard.length === 0 ? (
                <p className="text-sm text-base-content/70">No results yet</p>
              ) : (
                <ol className="text-sm list-decimal list-inside space-y-1">
                  {leaderboard.map((entry, index) => (
                    <li key={index}>
                      {entry.username} - ${entry.balance}
                    </li>
                  ))}
                </ol>
              )}
            </div>
            {/* Invite */}
            <div className="bg-base-300 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-2">
                Invite Your Friends!
              </h2>
              <div className="mt-2">
                <div className="p-4 bg-base-100 rounded-lg flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-white my-2 tracking-[.2em]">
                    {joinCode || "Loading..."}
                  </p>
                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={() => {
                      navigator.clipboard.writeText(joinCode || "");
                    }}
                  >
                    Copy Join Code
                  </button>
                </div>
              </div>
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
                {yourBets.length > 0 ? (
                  activeTab === "active" ? (
                    yourBets
                      .filter((wager) => wager.status === "active")
                      .map((wager) => (
                        <tr key={wager.wager_id}>
                          <td>{wager.bets.title}</td>
                          <td>{wager.choice}</td>
                          <td>${wager.amount}</td>
                          <td>{wager.odds}</td>
                        </tr>
                      ))
                  ) : (
                    yourBets
                      .filter((wager) => wager.status !== "active")
                      .map((wager) => (
                        <tr key={wager.wager_id}>
                          <td>{wager.bets.title}</td>
                          <td>{wager.choice}</td>
                          <td>${wager.amount}</td>
                          <td
                            className={
                              wager.status === "win"
                                ? "text-success"
                                : "text-error"
                            }
                          >
                            {wager.status === "win" ? "Win" : "Loss"}
                          </td>
                        </tr>
                      ))
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-base-content/70"
                    >
                      {activeTab === "active"
                        ? "No active bets"
                        : "No cleared bets"}
                    </td>
                  </tr>
                )}
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
