interface ProgressStepsProps {
  currentStep: number
}

export default function ProgressSteps({ currentStep }: ProgressStepsProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full ${currentStep >= 1 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"} text-white flex items-center justify-center text-sm font-medium`}
        >
          1
        </div>
        <div className={`w-12 h-1 ${currentStep >= 2 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"}`}></div>
      </div>
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full ${currentStep >= 2 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"} text-white flex items-center justify-center text-sm font-medium`}
        >
          2
        </div>
        <div className={`w-12 h-1 ${currentStep >= 3 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"}`}></div>
      </div>
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full ${currentStep >= 3 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"} text-white flex items-center justify-center text-sm font-medium`}
        >
          3
        </div>
        <div className={`w-12 h-1 ${currentStep >= 4 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"}`}></div>
      </div>
      <div
        className={`w-8 h-8 rounded-full ${currentStep >= 4 ? "bg-[#1e3a8a]" : "bg-[#94a3b8]"} text-white flex items-center justify-center text-sm font-medium`}
      >
        4
      </div>
    </div>
  )
}