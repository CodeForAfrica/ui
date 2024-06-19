import Page, {
  getServerSideProps as sharedGetServerSideProps,
} from "./[...slugs].page";

export async function getServerSideProps(context) {
  const func = sharedGetServerSideProps.bind(this);
  return func(context);
}

export default Page;
