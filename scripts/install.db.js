
db.getCollection('musics').insertMany([
  {
    title:"Numinous",
    artist:"Delectatio",
    genre: "IDM",
    year:2020,
    type:"Single",
    album:"sunrise",
    cover:"",
  },
  {
    title: 'She Wolf',
    artists: 'David Guetta',
    genres: 'Electro',
    year: 2011,
    type: 'Single',
    cover:
      'https://coverartarchive.org/release-group/87c734d5-bb0d-4bc7-8bf3-1b9c87cae9c2/front-250.jpg',
    album:"",
  },
  {
    title: 'Whole Lotta Love',
    artists: 'Led Zeppelin',
    genres: 'Metal classique',
    year: 1969,
    type: 'Single',
    cover:
      'https://images-na.ssl-images-amazon.com/images/I/619CcXRfEIL._SL1200_.jpg',
    album:"",
  },
  {
    title: 'Firefly',
    artists: 'Jim Yosef',
    genres: 'Dance/Électronique',
    year: 2015,
    type: 'Single',
    cover:'https://i1.sndcdn.com/artworks-000140970007-bh6qvb-t500x500.jpg',
    album:"",
  },
  {
    _id:"5fb96203bccbcc99fde5a5e8",
    title:"Mortals",
    artist:"Warriyo, Laura Brehm",
    genre: "Dance, Électronique",
    year:"2016",
    type:"Single",
    cover:"https://m.media-amazon.com/images/I/81fRiE4nCYL._SS500_.jpg",
    album:"",
  },
  {
    title:"Biolesens",
    artist:"Giorgio Ardente",
    genre: "Piano",
    year:2020,
    type:"Single",
    cover:"https://i1.sndcdn.com/artworks-F2hEAQ3bckXaDsVH-tStmpA-t500x500.jpg",
    album:"",
  },
]);

/*{
  title:"",
    artist:"",
  genre: "",
  year:2020,
  type:"",
  cover:"",
},*/

db.getCollection('musics').createIndex({ title: 1, artists: 1,  year: 1, album: 1}, { unique: true });

db.getCollection('users').insertMany([
  {
    avatar: 'https://randomuser.me/portraits/lego/7.jpg',
    firstname: 'John',
    lastname: 'Doe',
    username: 'testlog',
    password: '',
    birthDate: ISODate("1973-03-18T23:00:00.000Z"),
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
