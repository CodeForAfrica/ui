export default function findStatus(statusParam) {
  const foundEdge = statusParam.tasks.edges.find(
    ({ node: task }) => task.label === 'What is the status of the promise?'
  );
  return (foundEdge && foundEdge.node.first_response_value) || '';
}
