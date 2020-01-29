export default function validateForm(values) {
  const response = {};
  if (!values.quote) {
    response.quote = 'Please fill in a description';
  }
  if (!values.source) {
    response.source = 'Please fill in a source link';
  }
  if (values.source && values.quote) {
    response.submit = 'Thank you for your submission!';
  }
  return response;
}
