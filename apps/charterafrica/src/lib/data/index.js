// eslint-disable-next-line import/prefer-default-export
export { getPageServerSideProps } from "./local";

// TODO(kilemensi): export getPageStaticProps from "./rest"
//                  Ideally we would also export the above method here but
//                  since we use it only when local payload is not available,
//                  the two method can not co-exist in the same file yet.
