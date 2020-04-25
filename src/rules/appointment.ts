export const appointmentRules = {
  required: (value: string) => !!value || "Field is required.",
  notNegative: (value: number) => value >= 0 || "Field cannot be negative",
  limit200k: (value: number) =>
    value <= 200000 || "field must be value under 200000"
};
