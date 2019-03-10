import moment from "moment";
import knex from "../lib/connection";

import ArtistImage from "./ArtistImage";

class ArtistImageQuery {
  constructor() {
    this.tablename = "artist_images";
    this.items = undefined;
  }

  async create(data) {
    const imageData = { ...data };
    const artistImage = new ArtistImage(imageData, true);
    const isValid = artistImage.valid();
    if (isValid && artistImage.saveFile()) {
      const id = await knex(this.tablename).insert(
        {
          artist_id: artistImage.artist_id,
          filename: artistImage.filename
        },
        ["id"]
      );

      return (await knex(this.tablename)
        .where("id", id[0])
        .limit(1))[0];
    } else {
      return { errors: artistImage.validationErrors() };
    }
  }
}

export default ArtistImageQuery;
