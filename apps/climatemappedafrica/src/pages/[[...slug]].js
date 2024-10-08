import Page from "@/climatemappedafrica/components/Page";
import { getPageServerSideProps } from "@/climatemappedafrica/lib/data";

export default function Index(props) {
  return (
    <Page {...props}>
      <h1>Pahed</h1>
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}
