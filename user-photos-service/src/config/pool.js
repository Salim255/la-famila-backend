const pg = require("pg");

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    console.log("====================================");
    console.log("Connected to bdddd 🪢🪢");
    console.log("====================================");
    return this._pool.query("SELECT 1 + 1;");
  }

  close() {
    return this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
