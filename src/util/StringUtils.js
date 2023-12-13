const EMAIL_MAX_LENGTH = 40;

export const validateLength = (text, minLength, maxLength) => {
  let errorMsg = null;
  if (text.length < minLength) {
    errorMsg = `Name is too short (Minimum ${minLength} characters needed.)`;
  } else if (text.length > maxLength) {
    errorMsg = `Name is too long (Maximum ${maxLength} characters allowed.)`;
  }
  return errorMsg;
};

export const validateEmail = email => {
  if (!email) {
    return "Email may not be empty";
  }

  const EMAIL_REGEX = RegExp("[^@ ]+@[^@ ]+\\.[^@ ]+");
  if (!EMAIL_REGEX.test(email)) {
    return "Email not valid";
  }

  if (email.length > EMAIL_MAX_LENGTH) {
    return `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`;
  }

  return null;
};
