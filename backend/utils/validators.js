import { oneOf } from "express-validator";

// Utility validating that one of optional fields has to exist
export const validateOneOfExists = (fields, message = "At least one of optional fields is required.") => {
  for (const field of fields)
    field.exists();

  return oneOf(fields, { message });
}
