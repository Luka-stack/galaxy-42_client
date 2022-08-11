const strongPasswordFormat =
  /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
const mailFormat =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const emptyValidation = (input: string): string => {
  if (input.trim().length === 0) return 'Field cannot be empty.';

  return '';
};

export const emailValidation = (input: string): string => {
  const empty = emptyValidation(input);

  if (empty) return empty;

  if (!mailFormat.test(input)) {
    return 'Not a valid email address.';
  }

  return '';
};

export const passwordValidation = (
  inputOne: string,
  inputTwo?: string
): string => {
  if (!strongPasswordFormat.test(inputOne))
    return 'Minimum 6 characters\nAt least 1 upper case English letter\nAt least 1 lower case English letter\nAt least 1 letter\nAt least 1 special character';

  if (!inputTwo && inputTwo !== inputOne) return 'Passwords must match.';

  return '';
};
