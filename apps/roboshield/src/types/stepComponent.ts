import { ReactNode } from "react";

export interface StepComponent {
  handleNext: (data: any) => void;
  handleSkipToLast: (data: any) => void;
  handleBack: () => void;
  hint: ReactNode;
  lastStep: boolean;
  labels?: { [key: string]: any };
  actions?: { [key: string]: any };
}
