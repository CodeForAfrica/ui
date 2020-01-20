export default function Validate(values) {
  const response = {};
  if (!values.description) {
    response.description = 'Please fill in a description';
  }
  if (!values.source) {
    response.source = 'Please fill in a source link';
  }
  if (values.source && values.description) {
    response.submit = 'Thanks for the submission!';
  }
  return response;
}
