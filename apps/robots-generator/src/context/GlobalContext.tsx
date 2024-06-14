import React, { createContext, useState, useContext } from "react";
import { Robot, robots } from "../lib/robots-data";

export interface GlobalState {
  shouldFetch: boolean;
  url?: string;
  robots?: any;
  crawlDelay: number | null;
  cachedDelay: number | null;
  visitTimeFrom: Date | null;
  visitTimeTo: Date | null;
  sitemaps: string[];
  disallowedPaths: string[];
  allowedPaths: string[];
  platform: string;
  bots: Robot[];
}

export const defaultState: GlobalState = {
  shouldFetch: false,
  url: "",
  robots: "",
  crawlDelay: null,
  cachedDelay: null,
  visitTimeFrom: null,
  visitTimeTo: null,
  sitemaps: [],
  disallowedPaths: ["/"],
  allowedPaths: [],
  platform: "none",
  bots: robots,
};

const GlobalContext = createContext<{
  state: GlobalState;
  setState: React.Dispatch<React.SetStateAction<GlobalState>>;
}>({
  state: defaultState,
  setState: () => {},
});

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<GlobalState>(defaultState);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
