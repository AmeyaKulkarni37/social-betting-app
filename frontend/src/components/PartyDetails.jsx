import React from "react";
import Prop from "./Prop";

const PartyDetails = () => {
  return (
    <>
      <div className="container mx-auto px-4 pt-10 w-4/5">
        <h1 className="text-3xl font-bold mb-10">[party name]</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bets Section (takes 2/3 on large screens) */}
          <div className="bg-base-300 lg:col-span-2 space-y-4 p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Active Bets</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Example of a Prop component */}
              <Prop />
              <Prop />
              <Prop />
              <Prop />
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
      </div>
    </>
  );
};

export default PartyDetails;
