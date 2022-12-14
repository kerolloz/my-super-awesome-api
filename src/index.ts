import colors from 'colors';
import * as database from './database';
import * as server from './server';

database
  .connect()
  .then(server.run)
  .then(() => console.info(colors.green('Up and Running!')))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
