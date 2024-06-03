import StepperNav from "@/robots-generator/components/StepperNav";

interface FinishProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}

export default function Finish({
  handleNext,
  handleBack,
  lastStep,
}: FinishProps) {
  async function saveData() {
    // TODO: Save data to db
  }

  const next = async () => {
    await saveData();
    handleNext({});
  };

  return (
    <>
      <StepperNav
        next={next}
        handleBack={handleBack}
        isValid={true}
        lastStep={lastStep}
        back={false}
      />
    </>
  );
}
