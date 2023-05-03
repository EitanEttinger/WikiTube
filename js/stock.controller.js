'use strict'

var gSong

function onInit() {
    // const youtubeUrl = getYoutubeUrl()
    const elSearchInput = document.querySelector('.inp-search')
    const elListValueInput = document.querySelector('.list-value-input')
    const elBtnSearch = document.querySelector('.btn-search')
    const debouncedOnGetSongs = debounce(OnGetSongs, 500)
    const debouncedonSearchVideo = debounce(onSearchVideo, 500)
    
    elSearchInput.addEventListener('input', debouncedOnGetSongs)
    elListValueInput.addEventListener('input', debouncedOnGetSongs)
    elBtnSearch.addEventListener('submit', debouncedonSearchVideo)
    
    let valueSearchInput = elSearchInput.value
    let valueListValueInput = elListValueInput.value

    getYoutubeVideos(valueSearchInput).then(videos => {
        renderYoutubeVideos(videos)
    })

    // getYoutubeVideos(valueListValueInput).then(videos => {
    //     renderYoutubeVideos(videos)
    // })



}

function OnGetSongs(ev) {
    ev.preventDefault()

    const value = ev.target.value
    console.log('Getting songs for:', value)
    if (!value) return
    getSongs(value, renderYoutubeVideos)
}

function renderYoutubeVideos(songs) {
    console.log('songs from controller', songs)
    if (!songs.length) {
        showMsg()
        return
    }

    if (gSong) gSong.destroy()

    const strHtml = []
    strHtml = videos.map((video, idx) => `
    <div onclick="onSelectedVideo('${video.id.videoId}')" class="video-container-${idx + 1}">
        <img class="${video.id.videoId}" src="${video.snippet.thumbnails.default.url}" />
        <h4> ${video.snippet.title} </h4>
    </div>`)

    const elTopSearchContainer = document.querySelector('.top-search-results')
    elTopSearchContainer.innerHTML = strHtml.join('')

    const elIFrame = document.querySelector('iframe')
    elIFrame.src = `https://www.youtube.com/embed/${videos[0].id.videoId}`
}

function onSearchVideo(ev) {
    ev.preventDefault()

    console.log(ev.target.value);

    const elInput = document.querySelector(`.inp-search`)
    valueSearch = elInput.value

    getYoutubeVideos(valueSearch).then(videos => {
        renderYoutubeVideos(videos)
    })
}

function onSelectedVideo(videoId) {
    const elIFrame = document.querySelector('iframe')
    elIFrame.src = `https://www.youtube.com/embed/${videoId}`
}