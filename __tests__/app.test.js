import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Beer from '../lib/models/Beer.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a beer via POST', async () => {
    const res = await request(app)
      .post('/api/v1/beers')
      .send({ name: 'barney', image: 'hi', abv: '9%', type: 'IPA', rating: 5 });
    expect(res.body).toEqual({ id: 1, name: 'barney', image: 'hi', abv: '9%', type: 'IPA', rating: 5 });
  });

  it('finds a beer via GET', async () => {
    const beer = await Beer.insert({
      name: 'lagunitas',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg/600px-Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg',
      abv: '6.8%',
      type: 'IPA',
      rating: 3
    });
    const res = await request(app).get(`/api/v1/beers/${beer.id}`);
    expect(res.body).toEqual(beer);
  });

  it('finds all beers via GET', async () => {
    const rainier = await Beer.insert({
      name: 'modelo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg/600px-Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg',
      abv: '4.8%',
      type: 'lager',
      rating: 2
    });

    const modelo = await Beer.insert({
      name: 'modelo',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg/600px-Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg',
      abv: '4.5%',
      type: 'lager',
      rating: 2
    });

    const zach = await Beer.insert({
      name: 'zach',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg/600px-Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg',
      abv: '100%',
      type: 'double IPA',
      rating: 5
    });

    const res = await request(app).get('/api/v1/beers');
    expect(res.body).toEqual([rainier, modelo, zach]);


  });

  it('updates a beer by id via PUT', async () => {
    const rainier = await Beer.insert({
      name: 'rainier',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg/600px-Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg',
      abv: '4.8%',
      type: 'lager',
      rating: 3
    });

    const newRainier = {
      id: 1,
      name: 'rainier',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg/600px-Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg',
      abv: '10%',
      type: 'lager',
      rating: 4
    };

    const res = await request(app).put(`/api/v1/beers/${rainier.id}`).send(newRainier);
    expect(res.body).toEqual(newRainier);
  });

  it('deletes a beer!', async () => {
    const rainier = await Beer.insert({
      name: 'rainier',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg/600px-Paulaner_Oktoberfest_Marzen_11.2oz_bottle_and_beer_mug.jpg',
      abv: '4.8%',
      type: 'lager',
      rating: 4
    });
    const res = await request(app)
      .delete(`/api/v1/beers/${rainier.id}`)
      .send(rainier);

    expect(res.body).toEqual(rainier);
  });
});
