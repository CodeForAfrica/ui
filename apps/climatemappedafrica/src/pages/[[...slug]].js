import Page from "@/climatemappedafrica/components/Page";
import { getPageServerSideProps } from "@/climatemappedafrica/lib/data";

export default function Index(props) {
  return <Page {...props} />;
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}
