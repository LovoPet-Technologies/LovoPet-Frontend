import React from "react";

const STEP_LABELS = [
  "Personal",
  "Professional",
  "Clinical",
  "Documents",
  "Review",
];

export default function FormStepper({ currentStep }) {
  return (
    <div className="mb-8 flex items-center">
      {STEP_LABELS.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isDone = stepNumber < currentStep;

        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isDone
                    ? "bg-[#E8752E] text-white"
                    : isActive
                    ? "border-2 border-[#E8752E] text-[#E8752E]"
                    : "border-2 border-[#3D1E5C]/15 text-[#3D1E5C]/40"
                }`}
              >
                {isDone ? "✓" : stepNumber}
              </div>
              <span
                className={`hidden text-xs sm:block ${
                  isActive ? "font-medium text-[#3D1E5C]" : "text-[#3D1E5C]/40"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNumber !== STEP_LABELS.length && (
              <div
                className={`mx-2 h-0.5 flex-1 ${
                  isDone ? "bg-[#E8752E]" : "bg-[#3D1E5C]/10"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
