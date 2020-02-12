import config from 'config';

export default function findTerm(termParam) {
  const foundEdge = termParam.tasks.edges.find(
    ({ node: task }) => task.label === config.termLabel
  );
  return (foundEdge && foundEdge.node.first_response_value) || '';
}
