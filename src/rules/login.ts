export const loginRules = {
  required: (value: string) => !!value || 'Field is required.',
  email: (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
  name: (value: string) => {
    const pattern = /^[A-Za-z\s]+$/;
    return pattern.test(value) || 'Can only contain a-z or a space.';
  },
  number: (value: string) => {
    const pattern = /^[0-9]+$/;
    return pattern.test(value) || 'Can only contain 0-9.';
  },
  length13: (value: string) =>
    value.length === 13 || 'Must have a length of 13 character.',
  lengthOver8: (value: string) =>
    value.length >= 8 || 'Must have a length of atleast 8 character.',
};
