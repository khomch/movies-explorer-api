const { NODE_ENV, JWT_SECRET_KEY, DATABASE } = process.env;

let PORT = '';
let DB = '';

if (NODE_ENV === 'production') {
  PORT = 3000;
  DB = DATABASE;
} else {
  PORT = 3000;
  DB = 'bitfilmsdb-devdb';
}

module.exports = {
  NODE_ENV, PORT, DB, JWT_SECRET_KEY,
};
