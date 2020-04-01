export const appointmentRules = {
  required: (value: string) => !!value || "Field is required.",
  notNegative: (value: number) => value >= 0 || "Field cannot be negative"
};
