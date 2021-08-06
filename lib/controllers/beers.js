import { Router } from 'express';
import Beer from '../models/Beer';

export default Router()
  .post('/api/v1/beers', async (req, res) => {
    try {
      const beer = await Beer.insert(req.body);
      res.send(beer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/beers/:id', async (req, res) => {
    try {
      const beers = await Beer.findById(req.params.id);
      res.send(beers);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/beers/', async (req, res) => {
    try {
      const beers = await Beer.findAll();
      res.send(beers);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/beers/:id', async (req, res) => {
    try {
      const beer = await Beer.update(req.body, req.params.id);
      res.send(beer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/beers/:id', async (req, res) => {
    try {
      const beer = await Beer.delete(req.params.id);
      res.send(beer);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
