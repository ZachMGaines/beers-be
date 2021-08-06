import pool from '../utils/pool.js';


export default class Beer {
  id;
  name;
  abv;
  type;
  rating;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.abv = row.abv;
    this.type = row.type;
    this.rating = row.rating
  }

  static async insert({ name, abv, type, rating }) {
    const { rows } = await pool.query(
      'INSERT INTO beers (name, abv, type, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, abv, type, rating]
    );
    return new Beer(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM beers WHERE id = $1',
      [id]
    );
    if (!rows[0]) return null;

    return new Beer(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM beers');

    return rows.map(row => new Beer(row));
  }

  static async update(beer, id) {
    const { rows } = await pool.query(
      `UPDATE beers
    SET name = $1, abv = $2, type = $3, rating = $4
    WHERE id = $5
    RETURNING *`, [beer.name, beer.abv, beer.type, beer.rating, id]);
    return new Beer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM beers
    WHERE id = $1
    RETURNING *
    `, [id]);

    return new Beer(rows[0]);
  }

}
