import RootStore from "./stores/RootStore";
import { createContext, useContext } from "react";

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStores = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new Error("useStores must be used within a RootStoreProvider");
  }

  return context;
};
