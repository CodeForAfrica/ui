import React, { createContext, useState, useContext } from "react";
import { startOfToday } from "date-fns";
import {
  Robot,
  allowedCategories,
  robots,
} from "@/robots-generator/lib/robots";

export interface RobotRule {
  robot: Robot;
  allow: boolean;
}

export interface GlobalState {
  url?: string;
  robots?: string;
  defaultAccess?: string;
  crawlDelay: number;
  cachedDelay: number;
  visitTime: Date;
  sitemaps: string[];
  disallowedPaths: string[];
  platform: string;
  bots: RobotRule[];
}

const defaultState: GlobalState = {
  url: "",
  robots: "",
  defaultAccess: "disallowed",
  crawlDelay: 10,
  cachedDelay: 10,
  visitTime: startOfToday(),
  sitemaps: [],
  disallowedPaths: [],
  platform: "none",
  bots: robots.map((robot) => ({
    robot,
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
