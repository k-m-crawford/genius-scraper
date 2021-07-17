const p = require('phin')

/* find an artist by name and return their Genius API artist ID;
    if teh artist is not found, it returns the first primary artist's ID
    associated with the given search term; returned as an object
        {
            name
            id
        }
*/
const getArtist = async (apiKey, artistName, fullObject = false) => {

    const res = await p({
        'url': 'https://api.genius.com/search?q='+artistName,
        'headers': { 'Authorization': 'Bearer ' + apiKey },
        'parse': 'json'
    })

    if(fullObject)
        return res.body.response

    let idPairs = []

    for(let i = 0; i < res.body.response.hits.length; i++){
        if(res.body.response.hits[i].result.primary_artist.name === artistName)
            return { name: res.body.response.hits[i].result.primary_artist.name, 
                     id: res.body.response.hits[i].result.primary_artist.id }
    }

    return { name: res.body.response.hits[0].result.primary_artist.name, 
        id: res.body.response.hits[0].result.primary_artist.id }
}

module.exports = getArtist