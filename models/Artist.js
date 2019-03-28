import Model from "./Model";
import validator from "validator";
import ArtistImages from "./ArtistImageQuery";
import { sanitize, slugify } from "../lib/strings";

class Artist extends Model {
  constructor(data, create) {
    super(data, create);

    this.name = sanitize(this.name);
    this.description = sanitize(this.description);
    this.images = undefined;
  }

  async withRelated() {
    await this.withImages();

    return this;
  }

  async withImages() {
    this.images = await new ArtistImages().findByArtist(this.id);

    return this;
  }

  valid() {
    let valid = false;

    valid = validator.isLength(this.name, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({ field: "name", message: "Invalid length" });
    }

    return valid;
  }

  async generateSlug() {
    if (this.create) {
      this.slug = await slugify(this.name, "artists", "name");
    }
  }

  validationErrors() {
    return this.errors;
  }
}

export default Artist;
