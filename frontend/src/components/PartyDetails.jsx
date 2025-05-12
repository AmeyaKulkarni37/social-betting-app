import React from "react";
import Prop from "./Prop";

const PartyDetails = () => {
  const [activeTab, setActiveTab] = React.useState("active");

  return (
    <>
      <div className="container mx-auto px-4 pt-10 w-4/5">
        <h1 className="text-3xl font-bold mb-10">[party name]</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bets Section (takes 2/3 on large screens) */}
          <div className="bg-base-300 lg:col-span-2 space-y-4 p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Props</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Example of a Prop component */}
              <Prop
                title="Test title"
                description="test description"
                option1="Over"
                odds1="+110"
                option2="Under"
                odds2="-150"
              />
              <Prop />
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
              {/* head */}
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Line</th>
                  <th>Amount</th>
                  <th>Potential Winnings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
                <tr className="hover:bg-base-300">
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartyDetails;
