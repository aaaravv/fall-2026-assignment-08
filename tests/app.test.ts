import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import { app } from '../src/app.js';

const request = supertest(app);

// ============================================================
// Health endpoint — example provided, do not modify
// ============================================================
describe('GET /health', () => {
  it('should return 200 OK', async () => {
    const res = await request.get('/health');
    expect(res.statusCode).toEqual(200);
  });
});

// ============================================================
// TODO: Write tests for the add endpoint
// ============================================================
describe('GET /api/v1/add', () => {
  it('should return the sum of two numbers', async () => {
    const res = await request.get('/api/v1/add').query({ a: '10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 15 });
  });

  it('should handle negative numbers', async () => {
    const res = await request.get('/api/v1/add').query({ a: '-10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: -5 });
  });

  it('should return 400 if operands are missing', async () => {
    const res1 = await request.get('/api/v1/add').query({ a: '10' });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toEqual({ error: 'Invalid operands' });

    const res2 = await request.get('/api/v1/add').query({});
    expect(res2.statusCode).toEqual(400);
    expect(res2.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async () => {
    const res = await request.get('/api/v1/add').query({ a: 'foo', b: '2' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });
});

// ============================================================
// TODO: Write tests for the subtract endpoint
// ============================================================
describe('GET /api/v1/subtract', () => {
  it('should return the difference of two numbers', async () => {
    const res = await request.get('/api/v1/subtract').query({ a: '10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 5 });
  });

  it('should handle negative numbers', async () => {
    const res = await request.get('/api/v1/subtract').query({ a: '-10', b: '-5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: -5 });
  });

  it('should return 400 if operands are missing', async () => {
    const res1 = await request.get('/api/v1/subtract').query({ b: '5' });
    expect(res1.statusCode).toEqual(400);
    expect(res1.body).toEqual({ error: 'Invalid operands' });

    const res2 = await request.get('/api/v1/subtract').query({});
    expect(res2.statusCode).toEqual(400);
    expect(res2.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async () => {
    const res = await request.get('/api/v1/subtract').query({ a: '10', b: 'bar' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });
});

// ============================================================
// TODO: Write tests for the multiply endpoint
// ============================================================
describe('GET /api/v1/multiply', () => {
  it('should return the product of two numbers', async () => {
    const res = await request.get('/api/v1/multiply').query({ a: '10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 50 });
  });

  it('should handle negative numbers', async () => {
    const res = await request.get('/api/v1/multiply').query({ a: '-10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: -50 });
  });

  it('should return 400 if operands are missing', async () => {
    const res = await request.get('/api/v1/multiply').query({ a: '10' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async () => {
    const res = await request.get('/api/v1/multiply').query({ a: 'foo', b: 'bar' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });
});

// ============================================================
// TODO: Write tests for the divide endpoint
// ============================================================
describe('GET /api/v1/divide', () => {
  it('should return the quotient of two numbers', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: 2 });
  });

  it('should handle negative numbers', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '-10', b: '5' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ result: -2 });
  });

  it('should return 400 if operands are missing', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '10' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 if operands are not numbers', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '10', b: 'baz' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Invalid operands' });
  });

  it('should return 400 when b is 0 (division by zero)', async () => {
    const res = await request.get('/api/v1/divide').query({ a: '10', b: '0' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ error: 'Division by zero' });
  });
});
