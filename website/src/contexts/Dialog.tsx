import React, { createContext, useCallback, useContext, useState } from "react";

import AuthDialog from "@components/Dialog/Authentication";

const DialogContext = createContext<{
  triggerAuthDialog: () => void;
}>({
  triggerAuthDialog: () => {},
});

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [authOpen, setAuthOpen] = useState(false);
  const triggerAuthDialog = useCallback(() => setAuthOpen(true), [setAuthOpen]);
  const authOnClose = useCallback(() => setAuthOpen(false), [setAuthOpen]);

  return (
    <DialogContext.Provider value={{ triggerAuthDialog }}>
      <AuthDialog open={authOpen} onClose={authOnClose} />
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);
