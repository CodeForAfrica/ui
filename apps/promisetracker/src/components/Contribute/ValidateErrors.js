export default function ValidateErrors(values) {
  const errors = {};
  if (!values.description) {
    errors.description = 'Please fill in a description';
  }
  if (!values.source) {
    errors.source = 'Please fill in a source link';
  }
  return errors;
}
