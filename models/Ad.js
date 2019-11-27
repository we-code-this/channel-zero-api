import knex from "../lib/connection";
import { publicUrl } from "../lib/files";

class Ad {
  constructor() {
    this.tablename = "ads";
  }

  async random() {
    const res = await knex
      .select("*")
      .from(this.tablename)
      .where("published", true)
      .orderByRaw("random()")
      .limit(1);

    return {
      ...res,
      desktop_url: publicUrl(`/a/${res.desktop_filename}`),
      mobile_url: publicUrl(`/a/${res.mobile_filename}`)
    };
  }
}

export default Ad;
