import React from "react";
import { useRef, useImperativeHandle, forwardRef } from "react";

const PlaceBetModal = forwardRef(
  ({ betName = "", choice, odds, onSubmit }, ref) => {
    const modalRef = useRef();

    // Allow parent to call modalRef.current.showModal()
    useImperativeHandle(ref, () => ({
      showModal: () => modalRef.current?.showModal(),
      close: () => modalRef.current?.close(),
    }));

    const handleSubmit = (event) => {
      event.preventDefault();
      const amount = Number(event.target.amount.value);
      onSubmit({ betName, choice, odds, amount });
      // Add logic to handle the bet placement here
      modalRef.current.close();
    };

    return (
      <div>
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h2 className="font-bold text-xl mb-5">{betName}</h2>
            <p className="text-lg mb-5">
              {choice} at odds {odds}
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label text-white">Amount</label>
                <input
                  name="amount"
                  type="number"
                  className="input input-bordered w-55 max-w-xs ml-3"
                  required
                  placeholder="Enter Amount"
                />
              </div>
              <div className="modal-action">
                <button className="btn bg-green-600 hover:bg-green-700">
                  Confirm Bet
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    );
  }
);

export default PlaceBetModal;
