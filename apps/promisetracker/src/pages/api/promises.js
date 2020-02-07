import useClient from 'lib/useClient';
import fetchPromises from 'lib/fetchPromises';

export default async (_req, res) => {
  const apolloClient = useClient();
  const { promises } = await fetchPromises({ apolloClient });
  res.json(promises);
};
