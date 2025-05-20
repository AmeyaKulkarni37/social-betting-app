import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase-client";

const PartyList = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParties = async () => {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not logged in");
        return;
      }

      // UPDATE THIS QUERY
      const { data, error } = await supabase
        .from("parties")
        .select("*")
        .or(`host_id.eq.${user.id},members.cs.{${user.id}}`); // UPDATE THIS

      if (error) {
        console.error("Error fetching parties:", error.message);
      } else {
        setParties(data);
      }

      setLoading(false);
    };

    fetchParties();
  }, []);

  const handlePartyClick = (partyId) => {
    navigate(`/parties/:${partyId}`);
  };

  return (
    <>
      <Navbar onCreateProp={() => {}} />
      <div className="container mx-auto px-4 pt-10 w-4/5">
        <h1 className="text-3xl font-bold mb-10">My Parties</h1>

        {loading ? (
          <p>Loading parties...</p>
        ) : parties.length === 0 ? (
          <p className="text-lg text-gray-600">
            You're not in any parties yet.
          </p>
        ) : (
          <div className="partylist grid grid-cols-3 gap-y-10 justify-center items-center">
            {parties.map((party) => (
              <div
                key={party.id}
                className="party w-60 h-100 border rounded-lg flex flex-col justify-evenly items-center hover:cursor-pointer hover:shadow-xl transition"
                onClick={() => handlePartyClick(party.id)}
              >
                <div className="party-header w-50">
                  <h2 className="text-center font-bold pb-5 text-3xl truncate">
                    {party.name}
                  </h2>
                  <p className="text-center text-lg text-wrap truncate">
                    Host: {party.host_name || "Unknown"}
                  </p>
                </div>
                <div className="w-40 rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        opacity="0.4"
                        d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"
                        fill="#ffffff"
                      ></path>{" "}
                      <path
                        d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PartyList;
