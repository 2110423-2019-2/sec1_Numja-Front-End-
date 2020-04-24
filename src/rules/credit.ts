export const creditRules = {
  positiveNumber: (value: number) =>
    value > 0 || "must be number with value more than 0"
};
