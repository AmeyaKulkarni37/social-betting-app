import React from "react";

const PropModal = () => {
  return (
    <div>
      <dialog id="prop_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl mb-5">Create A Prop</h3>
          <form
            method="dialog"
            className="flex flex-col justify-center items-left w-full"
          >
            <label className="label">
              <span className="label-text text-white">Prop Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter Prop Title"
              className="input input-bordered w-100% max-w-xs mb-3"
            />

            <label className="label">
              <span className="label-text text-white">Prop Description</span>
            </label>
            <textarea
              className="input input-bordered w-full max-w-xs mb-3 h-32 p-3 resize-none whitespace-pre-wrap"
              id="prop_desc"
              placeholder="Enter a party description..."
              rows="4"
              cols="50"
              wrap="soft"
            ></textarea>

            <div className="grid grid-cols-2">
              <div>
                <label className="label text-white">Option 1:</label>
                <input
                  type="text"
                  placeholder="Ex: Over, Under, Win, etc."
                  className="input input-bordered w-55 max-w-xs mb-3"
                />
              </div>
              <div>
                <label className="label text-white">Option 2:</label>
                <input
                  type="text"
                  placeholder="Ex: Over, Under, Win, etc."
                  className="input input-bordered w-55 max-w-xs mb-3"
                />
              </div>
              <div>
                <label className="label text-white">Option 1 Odds:</label>
                <input
                  type="number"
                  placeholder="Ex: -110, +150, etc."
                  className="input input-bordered w-55 max-w-xs mb-3"
                />
              </div>
              <div>
                <label className="label text-white">Option 2 Odds:</label>
                <input
                  type="number"
                  placeholder="Ex: -110, +150, etc."
                  className="input input-bordered w-55 max-w-xs mb-3"
                />
              </div>
            </div>

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

export default PropModal;
