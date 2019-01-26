import knex from "../lib/connection";

class Ad {
  constructor() {
    this.tablename = "ads";
  }

  async random() {
    const res = await knex
      .select("*")
      .from(this.tablename)
      .where("published", true)
      .orderByRaw("RAND()")
      .limit(1);

    return res;
  }
}

export default Ad;
