import { getServerSideProps as getPageServerSideProps } from "@/trustlab/lib/data";

export const getServerSideProps = async (context) => {
  return getPageServerSideProps({
    ...context,
    params: { slugs: ["robots.txt"] },
  });
};

export default () => null;
