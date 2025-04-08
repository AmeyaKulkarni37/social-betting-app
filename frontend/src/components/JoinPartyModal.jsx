import React from "react";

const JoinPartyModal = () => {
  return (
    <div>
      <dialog id="join_party_modal" className="modal">
        <div className="modal-box w-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl mb-5">Join Party</h3>
          <form method="dialog flex flex-col justify-center items-left">
            <label className="label">
              <span className="label-text text-white">Party ID</span>
            </label>
            <input
              type="text"
              placeholder="Enter Party ID"
              className="input input-bordered w-full max-w-xs mb-3"
            />

            <div className="modal-action">
              <button className="btn bg-green-600 hover:bg-green-700">
                Join
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default JoinPartyModal;
