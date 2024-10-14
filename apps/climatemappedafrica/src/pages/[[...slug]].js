import DataVisualisationGuide from "@/climatemappedafrica/components/DataVisualisationGuide";
import Page from "@/climatemappedafrica/components/Page";
import { getPageServerSideProps } from "@/climatemappedafrica/lib/data";

const componentsBySlugs = {
  "data-visualisation-guide": DataVisualisationGuide,
};
export default function Index({ blocks, fallback, ...props }) {
  if (!blocks?.length) {
    return null;
  }
  return (
    <Page {...props}>
      {blocks.map((block) => {
        const Component = componentsBySlugs[block.slug];
        if (!Component) {
          return null;
        }
        return <Component key={block.id} {...block} />;
      })}
    </Page>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}
