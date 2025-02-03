import { GoogleAnalytics } from "@next/third-parties/google";

function GA(props) {
  const { gaId } = props;
  return (
    process.env.NODE_ENV === "production" &&
    gaId && <GoogleAnalytics {...props} />
  );
}

export default GA;
