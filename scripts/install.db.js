db.createCollection('musics', {
  autoIndexId: true,
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'artist', 'genre', 'year', 'type'],
      properties: {
        title: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        artist: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        genre: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        year: {
          bsonType: 'int',
          minimum: -3000,
          maximum: 3020,
          description: 'must be an integer in [ -3000, 3020 ] and is required',
        },
        type: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
        cover: {
          bsonType: 'string',
          description: 'must be a string and is required',
        },
      },
    },
  },
});

db.createCollection('users', {
  autoIndexId: true,
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['login', 'password', 'email'],
    },
  },
});

db.getCollection('musics').insertMany([
  {
    _id: 12347,
    title: 'She Wolf',
    artist: 'David Guetta',
    genre: 'Electro',
    year: '2011',
    type: 'Single',
    cover:
      'https://coverartarchive.org/release-group/87c734d5-bb0d-4bc7-8bf3-1b9c87cae9c2/front-250.jpg',
  },
  {
    _id: 12348,
    title: 'Whole Lotta Love',
    artist: 'Led Zeppelin',
    genre: 'Electro',
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
    lists: [1],
  },
]);

db.getCollection('lists').insertOne({
  _id: 1,
  musics: [12347, 12348],
});
