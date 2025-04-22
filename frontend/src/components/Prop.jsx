import React from "react";

const Prop = () => {
  return (
    <>
      <div class="card card-border bg-base-100 w-100%">
        <div class="card-body pt-3 pb-5 px-5">
          <div className="flex justify-between items-top">
            <h2 class="card-title">Ameya O/U 5.5 Rebounds</h2>
            <div className="dropdown dropdown-start">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle border-none avatar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#ffffff"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-more-vertical"
                >
                  <circle cx="12" cy="12" r="1.5"></circle>
                  <circle cx="12" cy="5" r="1.5"></circle>
                  <circle cx="12" cy="19" r="1.5"></circle>
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-300 rounded-box z-1 w-20 p-2 shadow-sm"
              >
                <li>
                  <a>Edit</a>
                </li>
                <li>
                  <a className="text-red-400">Delete</a>
                </li>
              </ul>
            </div>
          </div>

          <p className="py-2">Will Ameya get 5.5 rebounds in Brodie today</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary flex flex-col items-center w-1/3 p-7 border-none hover:bg-indigo-700">
              <h3>Over</h3>
              <p>+120</p>
            </button>
            <button class="btn btn-primary flex flex-col items-center w-1/3 p-7 border-none hover:bg-indigo-700">
              <h3>Under</h3>
              <p>-150</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prop;
