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
    console.log(res.body);
    expect(res.body).toMatchObject(expected);
  });
});
// describe('[POST] request works', () => {
//   beforeEach(()=>{
//     await Songs.create(listOfSongs)
//   })
//   test('request comes back with seed data', () => {
//     const res = request(server).get('/hobbits')
//     expect(res.body).toMatchObject
//   })
// })
