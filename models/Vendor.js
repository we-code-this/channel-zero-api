import validator from "validator";
import Model from "./Model";
import { sanitize } from "../lib/strings";

class Vendor extends Model {
  constructor(data, create) {
    super(data, create);

    this.name = sanitize(this.name);
    this.icon_class = sanitize(this.icon_class);
  }

  valid() {
    let valid = false;

    valid = this.validName();
    valid = valid && this.validIconClass();

    return valid;
  }

  validName() {
    let valid = validator.isLength(this.name, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: "name", message: "Invalid length" });
    }

    return valid;
  }

  validIconClass() {
    let valid = validator.isLength(this.icon_class, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: "icon_class", message: "Invalid length" });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default Vendor;
