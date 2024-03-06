import { useEffect, useRef, useState } from 'react';

const Checkout = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const setRef = useRef([]);

  useEffect(() => {
    setMargin({
      marginLeft: setRef.current[0].offsetWidth / 2,
      marginRight: setRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
  }, [setRef, stepsConfig.length]);

  if (stepsConfig.length === 0) return <></>;

  const handleNext = () => {
    setCurrentStep((lastStep) => {
      console.log(lastStep);
      if (lastStep === stepsConfig.length) {
        console.log(lastStep);
        setIsComplete(true);
        return lastStep;
      } else {
        return lastStep + 1;
      }
    });
  };

  const calculateProgressBar = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => {
          return (
            <div
              ref={(el) => (setRef.current[index] = el)}
              key={step.name}
              className={`step ${
                currentStep > index + 1 || isComplete ? 'complete' : ''
              }${currentStep === index + 1 ? 'active' : ''}`}
            >
              <h2 className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </h2>
              <h2 className="step-name">{step.name}</h2>
            </div>
          );
        })}

        <div
          className="progress-bar"
          style={{
            width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
          }}
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBar()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      {!isComplete && (
        <button className="btn" onClick={handleNext}>
          {isComplete === stepsConfig.length ? 'Finish' : 'Next'}
        </button>
      )}
    </>
  );
};

export default Checkout;
