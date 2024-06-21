export interface StepComponent {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}
