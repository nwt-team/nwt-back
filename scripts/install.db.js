db.getCollection('musics').insertMany([
  {
    title: 'She Wolf',
    artists: 'David Guetta',
    genres: 'Electro',
    year: 2011,
    type: 'Single',
    cover:
      'https://coverartarchive.org/release-group/87c734d5-bb0d-4bc7-8bf3-1b9c87cae9c2/front-250.jpg',
  },
  {
    title: 'Whole Lotta Love',
    artists: 'Led Zeppelin',
    genres: 'Metal classique',
    year: 1969,
    type: 'Single',
    cover:
      'https://images-na.ssl-images-amazon.com/images/I/619CcXRfEIL._SL1200_.jpg',
  },
]);
db.getCollection('musics').createIndex({ title: 1, artists: 1 , genres: 1, year: 1, type: 1}, { unique: true });

db.getCollection('users').insertMany([
  {
    avatar: 'https://randomuser.me/portraits/lego/7.jpg',
    firstname: 'John',
    lastname: 'Doe',
    login: 'testlog',
    password: '',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    email: 'john.doe@test.com',
    playlists: [],
  },
]);

db.getCollection('users').createIndex({ login: 1}, { unique: true });

db.getCollection('playlists').insertOne(
  {
    "title":"TestPlaylist",
    "musics":[
    ]
  }
);
