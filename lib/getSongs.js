const p = require('phin')

/* finds and returns all songs from the artist with the given ID in
    an object of the form:
    {
        title
        id
        url
    }
*/

const getSongs = async(accessToken, artistId, fullObject = false) => {

    let cur_page = 1
    let songIds = []

    while(cur_page) {
        const res = await p({
            'url': 'https://api.genius.com/artists/'+artistId+'/songs?page='+cur_page+'&per_page=50',
            'headers': { 'Authorization': 'Bearer ' + accessToken },
            'parse': 'json'
        })

        if(res.body.response){
            res.body.response.songs.forEach(song => { 
                if(song.primary_artist.id == artistId) // don't get features
                {
                    if(fullObject)
                        songIds.push(song)
                    else{
                        songIds.push({title: song.title, id: song.id, url: song.url })
                        console.log('title: ', song.title, ' id: ', song.id)
                    }
                }
            })

            cur_page = res.body.response.next_page
        }
        else{
            cur_page = null
            songIds = null
        }

    }

    return songIds
}

module.exports = getSongs