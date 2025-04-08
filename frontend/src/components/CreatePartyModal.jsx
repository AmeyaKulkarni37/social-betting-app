import React from "react";

const CreatePartyModal = () => {
  return (
    <div>
      <dialog id="create_party_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl mb-5">Create Party</h3>
          <form
            method="dialog"
            className="flex flex-col justify-center items-left"
          >
            <label className="label">
              <span className="label-text text-white">Party Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Party Name"
              className="input input-bordered w-full max-w-xs mb-3"
            />

            <label className="label">
              <span className="label-text text-white">Upload Party Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full max-w-xs mb-3"
            />

            <div className="modal-action">
              <button className="btn bg-green-600 hover:bg-green-700">
                Create
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CreatePartyModal;
