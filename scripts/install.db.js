db.getCollection('musics').insertMany([
  {
    title: 'She Wolf',
    artist: 'David Guetta',
    genre: 'Electro',
    year: 2011,
    type: 'Single',
    cover:
      'https://coverartarchive.org/release-group/87c734d5-bb0d-4bc7-8bf3-1b9c87cae9c2/front-250.jpg',
  },
  {
    title: 'Whole Lotta Love',
    artist: 'Led Zeppelin',
    genre: 'Metal classique',
    year: 1969,
    type: 'Single',
    cover:
      'https://images-na.ssl-images-amazon.com/images/I/619CcXRfEIL._SL1200_.jpg',
  },
]);

db.getCollection('users').insertMany([
  {
    avatar: 'https://randomuser.me/portraits/women/59.jpg',
    firstname: 'John',
    lastname: 'Doe',
    login: 'testlog',
    password: '',
    birthDate: ISODate('1974-01-01T23:00:00.000Z'),
    email: 'john.doe@test.com',
    playlists: [],
  },
]);

//Ajouter le script de création de la bd playlist
