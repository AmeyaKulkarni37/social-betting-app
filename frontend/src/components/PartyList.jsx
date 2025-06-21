import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase-client";

const PartyList = () => {
  const [parties, setParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParties = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get current user (we know they're authenticated because of ProtectedRoute)
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error("User not authenticated");
        }

        // Fetch parties for this user with host profile information
        const { data, error } = await supabase
          .from("party_members")
          .select(
            `
            party_id, 
            parties(*)
          `
          )
          .eq("user_id", user.id);

        if (error) {
          throw new Error(`Failed to load parties: ${error.message}`);
        }

        // Fetch host profiles separately for each party
        const partiesWithHosts = await Promise.all(
          (data || []).map(async (partyMember) => {
            const { data: hostProfile } = await supabase
              .from("profiles")
              .select("username, full_name, avatar_url")
              .eq("id", partyMember.parties.host_id)
              .single();

            return {
              ...partyMember,
              parties: {
                ...partyMember.parties,
                host_profile: hostProfile,
              },
            };
          })
        );

        setParties(partiesWithHosts);
      } catch (err) {
        console.error("Error fetching parties:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, []);

  const handlePartyClick = (partyId) => {
    navigate(`/parties/${partyId}`);
  };

  return (
    <>
      <Navbar onCreateProp={() => {}} />
      <div className="container mx-auto px-4 pt-10 w-4/5">
        <h1 className="text-3xl font-bold mb-10">My Parties</h1>

        {loading ? (
          <div className="text-center">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-4">Loading parties...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-lg text-red-500 mb-4">{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : parties.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              You're not in any parties yet.
            </p>
            <button
              className="btn btn-primary"
              onClick={() =>
                document.getElementById("create_party_modal").showModal()
              }
            >
              Create Your First Party
            </button>
          </div>
        ) : (
          <div className="partylist grid grid-cols-3 gap-y-10 justify-center items-center">
            {parties.map((partyMember) => (
              <div
                key={partyMember.parties.id}
                className="party w-60 h-100 border rounded-lg flex flex-col justify-evenly items-center hover:cursor-pointer hover:shadow-xl transition"
                onClick={() => handlePartyClick(partyMember.parties.id)}
              >
                <div className="party-header w-50">
                  <h2 className="text-center font-bold pb-5 text-3xl truncate">
                    {partyMember.parties.name}
                  </h2>
                  <p className="text-center text-lg text-wrap truncate">
                    Host:{" "}
                    {partyMember.parties.host_profile?.full_name ||
                      partyMember.parties.host_profile?.username ||
                      "Unknown"}
                  </p>
                </div>
                <div className="w-40 rounded-full flex justify-center">
                  {partyMember.parties.host_profile?.avatar_url ? (
                    <img
                      src={partyMember.parties.host_profile.avatar_url}
                      alt="Host avatar"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                      className="w-16 h-16"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
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
                  )}
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
