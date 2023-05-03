'use strict'

const API_YOUTUBE_KEY = 'AIzaSyA7KO6JqwhAEcjbl8fB3RlmCn-_YjZBf28'
const API_YOUTUBE_VALUE = 'Matan Morag'
const YOUTUBE_STORAGE = 'youtubeDB'
var URL_YOUTUBE = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_YOUTUBE_KEY}&q=${API_YOUTUBE_VALUE}`


var gCache = loadFromStorage(YOUTUBE_STORAGE) || {}

function getYoutubeUrl() {
    const elA = document.querySelector(`.youtube-link`)
    elA.href = URL_YOUTUBE

    return URL_YOUTUBE
}

function getYoutubeVideos(value = 'Matan Morag') {
    value = value.toLowerCase()


    if (gCache[value]) return

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_YOUTUBE_KEY}&q=${value}`
    if (gCache[value]) {
        const prm = Promise.resolve(gCache[value])
        return prm
    }

    return axios.get(url)
        .then(res => {
            console.log('res',res)
            const { items } = res.data
            gCache[value] = items
            saveToStorage(YOUTUBE_STORAGE, gCache)
            return items
        })


}
