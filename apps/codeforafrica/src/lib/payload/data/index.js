import { getPageStaticProps } from "@/codeforafrica/lib";
// import api from "@/codeforafrica/lib/payload";
// import getPageProps from "@/codeforafrica/lib/payload/data/local";
// import { api } from "@/codeforafrica/lib/payload/data/rest";

// eslint-disable-next-line no-unused-vars
export default async function getPageServerSideProps(context, slug) {
  // return getPageStaticProps({ slug });
  // const props = await getPageProps(api, context);
  // if (!props) {
  //   return { notFound: true };
  // }
  const { props: staticProps } = await getPageStaticProps({ slug });
  return {
    props: { ...staticProps },
  };
}
