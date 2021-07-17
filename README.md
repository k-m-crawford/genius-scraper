# genius-scraper
A node.js module that can be used in a backend to pull Genius API information with less bloat, and can be then used to scrape lyrics from Genius. 

## :link: Dependencies 

* [Phin](https://www.npmjs.com/package/phin)
* [Cheerio](https://www.npmjs.com/package/cheerio)

## :computer: Installation

```
npm install genius-scraper
```

## :book: Usage

Currently supplies three functions to interact with the Genius API/scrape lyrics.

### getArtist(accessToken, artistName, fullObject = false)

Requires a Genius API access token. Pass the token and the artist name. If fullObject is true, it returns the full API object response from Genius, otherwise returns a small object in the format:

```js
{
  name: "Britney Spears",
  id: 1052
 }
 ```
 
 This function utilizes the Genius API endpoint at https://api.genius.com/search; the endpoint returns an object with the first 10 hits related to your search query (i.e., artistName). If any of the returned hits contain a primary artist name that matches the artistName parameter, this artist name and ID will be returned. If none of the primary artist names match the search query, then every artist name and ID will be returned as an array of objects. If no hits are found, null is returned.
 
 ### getSongs(accessToken, artistID, fullObject = false)
 
Requires a Genius API token. Pass the token and an artist ID (can be obtained using getArtist). If fullObject is true, it returns an array of the full API object response from Genius for each song, otherwise returns an array of small objects representing each song by the artist in the format:
 
 ```js
 {
  title: "...Baby One More Time",
  id: 78169
  url: "https://genius.com/Britney-spears-baby-one-more-time-lyrics"
 }
 ```
 ### getLyrics(url)
 
 Does not require a Genius API token. Pass a string containing the full URL for a Genius lyrics page. It will return a string containing the full lyrics for that song, formatted with new lines. If no lyrics are found at the given URL, it will return null.
 
 ## :beers: License

 genius-scraper is provided for free under the [MIT](https://mit-license.org/) license.
