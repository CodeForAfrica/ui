import React, { createContext, useState, useContext } from "react";
import { startOfToday, addMinutes } from "date-fns";
import {
  Robot,
  allowedCategories,
  robots,
} from "@/robots-generator/lib/robots";

export interface GlobalState {
  shouldFetch: boolean;
  url?: string;
  robots?: any;
  defaultAccess?: string;
  crawlDelay: number | null;
  cachedDelay: number | null;
  visitTimeFrom: Date;
  visitTimeTo: Date;
  sitemaps: string[];
  disallowedPaths: string[];
  platform: string;
  bots: Robot[];
}

export const defaultState: GlobalState = {
  shouldFetch: false,
  url: "",
  robots: "",
  defaultAccess: "disallowed",
  crawlDelay: null,
  cachedDelay: null,
  visitTimeFrom: startOfToday(),
  visitTimeTo: addMinutes(startOfToday(), 30),
  sitemaps: [],
  disallowedPaths: [],
  platform: "none",
  bots: robots.map((robot) => ({
    ...robot,
    allow: allowedCategories.includes(robot.category),
  })),
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
