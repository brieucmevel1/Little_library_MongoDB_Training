const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'little_library';

const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    const podcastCollection = db.collection('podcast');
    console.log('podcastCollection:', podcastCollection);
    const resultpodcast = await podcastCollection.insertMany([
        {
          "Title": "Aliens and Diplomacy",
          "Host": "Barack Obama",
          "Duration": "40 minutes",
          "ID": "P00003"
        },
        {
            "Title": "Time Travel and Tea",
            "Host": "Vladimir Putin",
            "Duration": "25 minutes",
            "ID": "P00004"
        },
        {
            "Title": "Cryptozoology and Coffee",
            "Host": "Angela Merkel",
            "Duration": "35 minutes",
            "ID": "P00005"
        },
        {
            "Title": "Parallel Universes and Pickles",
            "Host": "Xi Jinping",
          "Duration": "30 minutes",
          "ID": "P00006"
        },
        {
            "Title": "Ancient Civilizations and Ice Cream",
            "Host": "Donald Trump",
            "Duration": "45 minutes",
            "ID": "P00007"
        }
    ]);
    
    const bookCollection = db.collection('book'); 
    console.log('bookCollection:', bookCollection);
    const resultbook = await bookCollection.insertMany([
        {
          "Title": "Pride and Prejudice",
          "Author": "Jane Austen",
          "Year": 1813,
          "ID": "B00004",
          "Available": true,
          "UserID": null
        },
        {
            "Title": "To Kill a Mockingbird",
            "Author": "Harper Lee",
            "Year": 1960,
            "ID": "B00005",
            "Available": true,
          "UserID": null
        },
        {
          "Title": "Moby-Dick",
          "Author": "Herman Melville",
          "Year": 1851,
          "ID": "B00006",
          "Available": true,
          "UserID": null
        },
        {
            "Title": "War and Peace",
            "Author": "Leo Tolstoy",
            "Year": 1869,
            "ID": "B00007",
            "Available": true,
            "UserID": null
        },
        {
            "Title": "The Odyssey",
            "Author": "Homer",
            "ID": "B00008",
            "Available": true,
            "UserID": null
        }
    ]);
    
    const userCollection = db.collection('user'); 
    console.log('userCollection:', userCollection);
    const resultuser = await userCollection.insertMany([
        {
          "Username": "Tom Cruise",
          "Password": "Cruise",
          "Possessed": [],
          "ID": 24680
        },
        {
          "Username": "Jackie Chan",
          "Password": "Chan",
          "Possessed": [],
          "ID": 13579
        },
        {
          "Username": "Jason Statham",
          "Password": "Statham",
          "Possessed": [],
          "ID": 97531
        },
        {
          "Username": "Keanu Reeves",
          "Password": "Reeves",
          "Possessed": [],
          "ID": 86420
        },
        {
          "Username": "Chris Hemsworh",
          "Password": "Hemsworth",
          "Possessed": [],
          "ID": 64208
        }
    ]);

    const adminCollection = db.collection('admin'); 
    console.log('adminCollection:', adminCollection);
    const resultadmin = await adminCollection.insertOne(
        {
          "Username": "admin",
          "Password": "admin",
          "ID": 24680
        });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
