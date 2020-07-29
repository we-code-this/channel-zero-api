const db = require('./lib/connection');
const fs = require('fs');
const dayjs = require('dayjs');

const args = process.argv;

const dir = './migrations';
const migrations = fs.readdirSync(dir);

const promises = [];

const up = () => {
  migrations.map((migration) => {
    promises.push(require(`./migrations/${migration}`).up(db));
  });

  Promise.all(promises).then(() => db.quit());
};

const down = () => {
  const reversed = migrations.reverse();

  reversed.map((migration) => {
    promises.push(require(`./migrations/${migration}`).down(db));
  });

  Promise.all(promises).then(() => db.quit());
};

const create = (name) => {
  const dateString = dayjs().format('YYYYMMDDHHmmssSSS');
  const filename = `${dir}/${dateString}-${name}.js`;
  fs.closeSync(fs.openSync(filename, 'w'));
};

switch (args.length) {
  case 2:
    up();
    break;
  case 3:
    switch (args[2]) {
      case 'up':
        up();
        break;
      case 'down':
        down();
        break;
      default:
        if (args[2] === 'create') {
          console.log('The create command requires a name');
        } else {
          console.log(`Unsupported argument: ${args[2]}`);
        }
    }
    break;
  case 4:
    switch (args[2]) {
      case 'create':
        create(args[3]);
        break;
      default:
        console.log(`Unsupported argument: ${args[2]}`);
    }
    break;
  default:
    console.log('Unsupported number of arguments');
}
