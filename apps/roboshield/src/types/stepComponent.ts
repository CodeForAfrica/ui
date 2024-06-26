export interface StepComponent {
  handleNext: (data: any) => void;
  handleSkipToLast: (data: any) => void;
  handleBack: () => void;
  hint: String;
  lastStep: boolean;
}
