const p = require('phin')
const cheerio = require('cheerio')

/* Scrapes lyrics at a given url and returns them as a string */
const getLyrics = async (url) => {

    const res = await p(url)
    try{
        const fullHTML = res.body

        const $ = cheerio.load(fullHTML)
        let lyrics = $('div.lyrics').text()

        /* genius.org serves two DOMs for its lyrics pages, the below
           scrapes the second style (that does not contain a lyrics div) */

        if(!lyrics){
            $('[class^=Lyrics__Container]').each((i, el) => {
                const html = $(el).html()
                const lined = html.replace(/<br\s*[\/]?>/gi, "\n")
                const stripped = lined.replace(/<[^>]+>/ig, '')
                const trimmed = stripped.trim()
                // console.log(stripped)
                lyrics += trimmed
            })
        }
        if(!lyrics || fullHTML.includes('Lyrics for this song have yet to be')) {
            console.log('Failed to capture lyrics or none present')
            if(fullHTML.includes('Burrr!'))
                console.log('could not find url ', url)
            return null
        }

        return lyrics
    }
    catch(e) {
        console.log(e)
        return null
    }
}

module.exports = getLyrics