import Model from "./Model";
import validator from "validator";

class Artist extends Model {
  constructor(data) {
    super(data);

    this.description = validator.escape(this.description);
    this.errors = [];
  }

  valid() {
    let valid = false;

    valid = validator.isLength(this.name, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: "name", message: "Invalid length" });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default Artist;
