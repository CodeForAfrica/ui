export default function findTerm(termParam) {
  const foundEdge = termParam.tasks.edges.find(
    ({ node: task }) =>
      task.label ===
      'What term was the elected official serving when making the promise?'
  );
  return (foundEdge && foundEdge.node.first_response_value) || '';
}
