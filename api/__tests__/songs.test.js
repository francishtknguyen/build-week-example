const db = require("../data/db-config");
const Songs = require("../songs/songs-model");
const { clean } = require("knex-cleaner");

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

describe("Songs", () => {
  describe("sanity", () => {
    test("Songs is defined", () => {
      expect(Songs).toBeDefined();
    });

    test("Songs is defined", () => {
      expect(process.env.NODE_ENV).toBe("testing");
    });
  });
});
