import React from "react";

const Prop = () => {
  return (
    <>
      <div class="card card-border bg-base-100 w-100%">
        <div class="card-body">
          <h2 class="card-title">Prop Title</h2>
          <p>Prop description goes here</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary flex flex-col items-center w-1/3 p-7">
              <h3>Over</h3>
              <p>-110</p>
            </button>
            <button class="btn btn-primary flex flex-col items-center w-1/3 p-7">
              <h3>Under</h3>
              <p>-110</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Prop;
