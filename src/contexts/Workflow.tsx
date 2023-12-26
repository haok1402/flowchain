import React, { createContext, useContext, useState } from "react";

const WorkflowContext = createContext<{
  buildType: "fc:input" | "fc:robot" | "fc:output";
  setBuildType: (buildType: "fc:input" | "fc:robot" | "fc:output") => void;
}>({
  buildType: "fc:input",
  setBuildType: () => {},
});

const WorkflowProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [buildType, setBuildType] = useState<
    "fc:input" | "fc:robot" | "fc:output"
  >("fc:input");

  return (
    <WorkflowContext.Provider value={{ buildType, setBuildType }}>
      {children}
    </WorkflowContext.Provider>
  );
};

const useWorkflow = () => useContext(WorkflowContext);

export { WorkflowProvider, useWorkflow };
