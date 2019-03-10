class Model {
  constructor(data, create = false) {
    this.create = create;
    this.errors = [];

    if (data) {
      Object.assign(this, data);
    }
  }
}

export default Model;
