import StepperNav from "@/robots-generator/components/StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";

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
  const { state } = useGlobalState();

  async function saveData() {
    await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: state }),
    });
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
