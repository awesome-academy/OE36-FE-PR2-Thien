export default function serializeForm(form) {
  let result = {};
  for (const input of form) {
    if (input.name && input.value) {
      result[input.name] = input.files || input.value;
    }
  }
  return result;
}
