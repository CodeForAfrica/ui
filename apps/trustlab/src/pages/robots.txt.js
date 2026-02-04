import { getServerSideProps as getPageServerSideProps } from "@/trustlab/lib/data";

function Robots() {
  return null;
}

export const getServerSideProps = async (context) => {
  return getPageServerSideProps({
    ...context,
    params: { slugs: ["robots.txt"] },
  });
};

export default Robots;
