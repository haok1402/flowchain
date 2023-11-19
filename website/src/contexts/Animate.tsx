import React, { createContext, useContext, useState } from "react";

const AnimateContext = createContext({
  showNavItems: false,
  setShowNavItems: (showNavItems: boolean) => {},
  showFlowDiagram: false,
  setShowFlowDiagram: (showFlowDiagram: boolean) => {},
});

interface AnimateProviderProps {
  children: React.ReactNode;
}

const AnimateProvider: React.FC<AnimateProviderProps> = ({ children }) => {
  const [showNavItems, setShowNavItems] = useState(false);
  const [showFlowDiagram, setShowFlowDiagram] = useState(false);
  return (
    <AnimateContext.Provider
      value={{
        showNavItems,
        setShowNavItems,
        showFlowDiagram,
        setShowFlowDiagram,
      }}
    >
      {children}
    </AnimateContext.Provider>
  );
};

const useAnimte = () => useContext(AnimateContext);

export { AnimateProvider, useAnimte };
