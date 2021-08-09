import pool from '../utils/pool.js';


export default class Beer {
  id;
  name;
  image;
  abv;
  type;
  rating;

  constructor(row) {
    this.id = Number(row.id);
    this.name = row.name;
    this.image = row.image;
    this.abv = row.abv;
    this.type = row.type;
    this.rating = row.rating
  }

  static async insert({ name, image, abv, type, rating }) {
    const { rows } = await pool.query(
      'INSERT INTO beers (name, image, abv, type, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, image, abv, type, rating]
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
    SET name = $1, image = $2, abv = $3, type = $4, rating = $5
    WHERE id = $6
    RETURNING *`, [beer.name, beer.image, beer.abv, beer.type, beer.rating, id]);
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
