import React from "react";

function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper d-flex justify-content-center align-items-center my-3">
      {steps.map((step, index) => {
        return (
          <div
            key={index}
            className={`stepper-step d-flex flex-row align-items-center ${
              currentStep === index + 1 ? "active" : ""
            }`}
          >
            <div
              className={`stepper-circle ${
                currentStep === index + 1 || currentStep > index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </div>
            <span className="stepper-label mt-2"></span>
            {index < steps.length - 1 && (
              <div
                className={`stepper-line ${
                  currentStep > index + 1 ? "active" : ""
                }`}
              ></div>
            )}
          </div>
        );
      })}
      <style>{`
                .stepper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .stepper-step {
                    position: relative;
                    text-align: center;
                }
                .stepper-circle {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background-color: #e0e0e0;
                    color: #000;
                    font-weight: bold;
                }
                .stepper-circle.active {
                    background-color: #007bff;
                    color: #fff;
                }
                .stepper-label {
                    font-size: 12px;
                    margin-top: 5px;
                }
                .stepper-line {
                    margin-left: 8px;
                    margin-right: 8px;
                    top: 15px;
                    left: 35px;
                    height: 2px;
                    width: 50px;
                    background-color: #e0e0e0;
                }
                .stepper-line.active {
                background-color: #007bff;
                }
                .stepper-step.active ~ .stepper-line {
                    background-color: #007bff;
                }
            `}</style>
    </div>
  );
}

export default Stepper;
