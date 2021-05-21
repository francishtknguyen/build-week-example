const db = require("../data/db-config");
const Songs = require("../songs/songs-model");
const { clean } = require("knex-cleaner");
const server = require("../server");
const request = require("supertest");

const first = {
  song_name: "Lonely",
  artist_name: "Akon",
  album_name: "Lonely",
  genre_type: "RnB",
};

const second = {
  song_name: "Mr.Brightside",
  artist_name: "The Killers",
  album_name: "Hot Fuss",
  genre_type: "Alternative Rock",
};

const expected = [
  {
    song_name: "Lonely",
    artist_name: "Akon",
    album_name: "Lonely",
    genre_type: "RnB",
  },
  {
    song_name: "Mr.Brightside",
    artist_name: "The Killers",
    album_name: "Hot Fuss",
    genre_type: "Alternative Rock",
  },
];

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await clean(db, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });
});
afterAll(async () => {
  await db.destroy();
});

describe("[GET] request works", () => {
  beforeEach(async () => {
    await Songs.create(first);
    await Songs.create(second);
  });
  test("request comes back with seed data", async () => {
    const res = await request(server).get("/api/songs");
    expect(res.body).toMatchObject(expected);
  });
});
describe("[POST] request works", () => {
  test("responds with created object", async () => {
    const res = await request(server).post("/api/songs").send(first);
    expect(res.body).toMatchObject(first);
  });
  test("responds with status 201", async () => {
    const res = await request(server).post("/api/songs").send(first);
    expect(res.status).toBe(201);
  });
});
describe("[DELETE] request works", () => {
  beforeEach(async () => {
    await request(server).post("/api/songs").send(first);
    await request(server).post("/api/songs").send(second);
  });
  test("responds with status 200", async () => {
    const res = await request(server).delete("/api/songs/1");
    expect(res.status).toBe(200);
  });
  test("responds with deleted object", async () => {
    const res = await request(server).delete("/api/songs/1");
    expect(res.body).toMatchObject(first);
  });
});
