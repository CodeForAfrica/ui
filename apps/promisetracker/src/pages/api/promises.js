import useClient from 'lib/useClient';
import fetchPromises from 'lib/fetchPromises';
import putPromise from 'lib/putPromise';

export default async (req, res) => {
  const apolloClient = useClient();
  switch (req.method) {
    case 'GET': {
      const { promises } = await fetchPromises({
        apolloClient,
        limit: req.query.limit
      });
      res.json(promises);
      break;
    }
    case 'POST':
      await putPromise({ apolloClient, data: req.body });
      res.sedStatus(200);
      break;
    default:
      res.status(405).end();
      break;
  }
};
