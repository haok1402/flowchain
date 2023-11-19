import React, { createContext, useContext, useState } from "react";

const AnimateContext = createContext({
  showNavItems: false,
  setShowNavItems: (showNavItems: boolean) => {},
  showFlowDiagram: false,
  setShowFlowDiagram: (showFlowDiagram: boolean) => {},
  showKeyFeatures: false,
  setShowKeyFeatures: (showKeyFeatures: boolean) => {},
  showFooter: false,
  setShowFooter: (showFooter: boolean) => {},
});

interface AnimateProviderProps {
  children: React.ReactNode;
}

const AnimateProvider: React.FC<AnimateProviderProps> = ({ children }) => {
  const [showNavItems, setShowNavItems] = useState(false);
  const [showFlowDiagram, setShowFlowDiagram] = useState(false);
  const [showKeyFeatures, setShowKeyFeatures] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  return (
    <AnimateContext.Provider
      value={{
        showNavItems,
        setShowNavItems,
        showFlowDiagram,
        setShowFlowDiagram,
        showKeyFeatures,
        setShowKeyFeatures,
        showFooter,
        setShowFooter,
      }}
    >
      {children}
    </AnimateContext.Provider>
  );
};

const useAnimte = () => useContext(AnimateContext);

export { AnimateProvider, useAnimte };
