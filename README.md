# GraphQL Metal Archives

The [Encyclopaedia Metallum: The Metal Archives](https://www.metal-archives.com/) is a colaborative website,
focused in metal genre, that provides information about bands, albums, songs, artists and more.
But unfortunately it does not have an official API to access their data.
So this repository exists to provide a way to recover these infos with a GraphQL API.

### Demo

[Live Demo](https://graphql-metalarchives.glitch.me/)

### Install

1. Clone this repository
```sh
git clone https://github.com/caiopiassali/graphql-metalarchives.git
```

2. Navigate to project folder
```sh
cd graphql-metalarchives
```

3. Install dependencies
```sh
npm install
```

### Run

##### Production
```sh
npm start
```

##### Development
```sh
npm run dev
```

### Queries

##### Bands List
```sh
query {
  bands {
    id,
    name,
    genre,
    country
  }
}
```

##### Get Band
```sh
query {
  band(id: "9524") {
    name,
    genre,
    country,
    location,
    themes,
    status,
    label,
    formYear,
    yearsActive,
    photoUrl,
    logoUrl
  }
}
```

##### Get Band Discography
```sh
query {
  band(id: "9524") {
    discography {
      id,
      name,
      type,
      year
    }
  }
}
```

##### Get Band Discography Filtered By Type
```sh
query {
  band(id: "9524") {
    discography(type: "misc") {
      id,
      name,
      type,
      year
    }
  }
}
```

##### Get Album
```sh
query {
  album(id: "239675") {
    name,
    band,
    type,
    releaseDate,
    label,
    format,
    coverUrl
  }
}
```

##### Get Album Songs
```sh
query {
  album(id: "239675") {
    songs
  }
}
```

##### Get Lyrics
```sh
query {
  lyrics(id: "2699228") {
    lyrics
  }
}
```

### To-Do

###### Queries
* Artists

###### Search
* Advanced Albums search
* Advanced Songs search

###### Band
* Get members

###### Album
* Get lineup

## Changelog

Read [CHANGELOG.md](CHANGELOG.md) for release details and changes.

## License

This project is licensed under the GPL-2.0 License - see the [LICENSE](LICENSE) file for details
