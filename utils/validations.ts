export const emptyValidation = (input: string): string => {
  if (input.trim().length === 0) return 'Field cannot be empty.';

  return '';
};

export const emailValidation = (input: string): string => {
  const empty = emptyValidation(input);

  if (empty) return empty;

  // proper email validation

  return '';
};

export const passwordValidation = (
  inputOne: string,
  inputTwo?: string
): string => {
  // proper password validation

  if (inputTwo && inputTwo !== inputOne) return 'Passwords must match.';

  return '';
};
