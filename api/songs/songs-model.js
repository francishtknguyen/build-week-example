const db = require("../data/db-config");

function getAll() {
  return db
    .select("s.song_name", "ar.artist_name", "g.genre_type", "al.album_name")
    .from("songs as s")
    .join("genres as g", "g.genre_id", "s.genre_id")
    .join("albums as al", "al.album_id", "s.album_id")
    .join("song_artists as sa", "sa.song_id", "s.song_id")
    .join("artists as ar", "ar.artist_id", "sa.artist_id");
}
function getById(song_id) {
  return db
    .select("s.song_name", "ar.artist_name", "g.genre_type", "al.album_name")
    .from("songs as s")
    .join("genres as g", "g.genre_id", "s.genre_id")
    .join("albums as al", "al.album_id", "s.album_id")
    .join("song_artists as sa", "sa.song_id", "s.song_id")
    .join("artists as ar", "ar.artist_id", "sa.artist_id")
    .where("s.song_id", song_id)
    .first();
}

async function create({ song_name, artist_name, album_name, genre_type }) {
  let createdSongId;
  await db.transaction(async (trx) => {
    let artist, album, genre;
    artist = await trx("artists").where({ artist_name }).first();
    album = await trx("albums").where({ album_name }).first();
    genre = await trx("genres").where({ genre_type }).first();
    if (!artist)
      [artist] = await trx("artists").insert({ artist_name }, ["artist_id"]);
    if (!album)
      [album] = await trx("albums").insert({ album_name }, ["album_id"]);
    if (!genre)
      [genre] = await trx("genres").insert({ genre_type }, ["genre_id"]);
    const { artist_id } = artist;
    const { album_id } = album;
    const { genre_id } = genre;
    const [song] = await trx("songs").insert(
      { song_name, genre_id, album_id },
      ["song_id"]
    );
    const { song_id } = song;
    await trx("song_artists").insert({ song_id, artist_id });
    createdSongId = song_id;
  });
  return getById(createdSongId);
}

async function remove(song_id) {
  const deleted = await getById(song_id);
  await db("songs").where({ song_id }).del();
  return deleted;
}

module.exports = { getAll, getById, create, remove };
