import config from 'config';

export default function findStatus(statusParam) {
  const foundEdge = statusParam.tasks.edges.find(
    ({ node: task }) => task.label === config.statusLabel
  );
  return (foundEdge && foundEdge.node.first_response_value) || '';
}
