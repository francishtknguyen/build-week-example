const song_artists = [
  { song_id: 1, artist_id: 1 },
  { song_id: 2, artist_id: 3 },
  { song_id: 3, artist_id: 5 },
  { song_id: 4, artist_id: 8 },
  { song_id: 5, artist_id: 9 },
  { song_id: 6, artist_id: 11 },
  { song_id: 7, artist_id: 12 },
  { song_id: 8, artist_id: 13 },
  { song_id: 9, artist_id: 15 },
  { song_id: 10, artist_id: 16 },
  { song_id: 11, artist_id: 18 },
  { song_id: 12, artist_id: 19 },
  { song_id: 13, artist_id: 20 },
  { song_id: 14, artist_id: 21 },
  { song_id: 15, artist_id: 22 },
  { song_id: 16, artist_id: 23 },
  { song_id: 17, artist_id: 24 },
  { song_id: 18, artist_id: 25 },
  { song_id: 19, artist_id: 26 },
  { song_id: 20, artist_id: 27 },
  { song_id: 21, artist_id: 23 },
  { song_id: 22, artist_id: 28 },
  { song_id: 23, artist_id: 29 },
  { song_id: 24, artist_id: 30 },
  { song_id: 25, artist_id: 2 },
  { song_id: 26, artist_id: 4 },
  { song_id: 27, artist_id: 6 },
  { song_id: 28, artist_id: 17 },
  { song_id: 29, artist_id: 11 },
  { song_id: 30, artist_id: 26 },
];
exports.seed = function (knex) {
  return knex("song_artists").insert(song_artists);
};
