/*------------ Constants ------------*/
import lyrics from '../data/lyrics.json' assert { type: 'json'}


/*------------ Variables ------------*/
const albums = []
const songs = []
let randLyrics = []
let streak = 0

/*---- Cached Element References ----*/
const lyricBtnEl = document.querySelector('#lyric-button')
const lyricWrapEl = document.querySelector('#lyric-wrapper')
const albumsEl = document.querySelector('#album-wrapper')
const songsEl = document.querySelector('#song-wrapper')
const hintBtnEl = document.querySelector('#hint-button')
const gameEl = document.querySelector('#game-container')

/*--------- Event Listeners ---------*/
lyricBtnEl.addEventListener('click', getRandomLyric)
hintBtnEl.addEventListener('click', getHint)
gameEl.addEventListener('click', checkAnswer)

/*------------ Functions ------------*/

function getRandomLyric(){
  if (randLyrics.length){
    resetAnswers()
  }
  randLyrics = []
  let currentIndex = Math.floor(Math.random()*lyrics.length)
  randLyrics.push(lyrics[currentIndex])
  console.log(lyrics[currentIndex])
  songs.splice(0, songs.length)
  setSongs(lyrics[currentIndex])
  showAlbums()
  render()
}

function resetAnswers() {
  albumsEl.innerHTML = ''
  songsEl.innerHTML = ''
  document.getElementById('song-header').style.display = 'none'
}

function getHint() {
  //Only get a hint if there's a lyric currently
  if (lyricWrapEl.hasChildNodes){
    let hintLyric
    let currentLyric = randLyrics[randLyrics.length-1]
    let currentIndex = lyrics.indexOf(currentLyric)
    if(lyrics[currentIndex+1].line < currentLyric.line) {
      hintLyric = lyrics[currentIndex - 1]
      randLyrics.unshift(hintLyric)
    }else{
      hintLyric = lyrics[currentIndex + 1]
      randLyrics.push(hintLyric)
    }
    render()
  }
}

function checkAnswer(evt){
  if (randLyrics.length){
    if (evt.target.className === 'album') {
      if (albums[+evt.target.id.split('-')[1]] === randLyrics[0].album_name) {
        evt.target.style.backgroundColor = 'green'
        evt.target.style.color = 'white'
        showSongs()
      }else {
        streak = 0
        evt.target.style.backgroundColor = 'red'
        evt.target.style.color = 'gray'
      }
    } else if (evt.target.className === 'song'){
      if (songs[+evt.target.id.split('-')[1]] === randLyrics[0].track_title) {
        streak += 1
        evt.target.style.backgroundColor = 'green'
        evt.target.style.color = 'white'
      }else {
        streak = 0
        evt.target.style.backgroundColor = 'red'
        evt.target.style.color = 'gray'
      }
    }
    document.getElementById('streak').textContent = `Streak: ${streak}`
  }

}

function setAlbums(){
  lyrics.reduce( (a, c) => {
    if (!a.includes(c.album_name)) a.push(c.album_name)
    return a
  }, albums)
}

function setSongs(currLyric){
  let currLyrAlb = currLyric.album_name
  lyrics.reduce( (a, c) => {
    if (!a.includes(c.track_title) && c.album_name === currLyrAlb) a.push(c.track_title)
    return a
  }, songs)
}

function showLyric() {
  randLyrics.forEach(lyric => {
    let lyricEl = document.createElement('p')
    lyricEl.textContent = lyric.lyric
    lyricWrapEl.appendChild(lyricEl)
  })
}

function showAlbums() {
  albumsEl.innerHTML = ''
  albums.forEach( (album, idx) => {
    let albumEl = document.createElement('p')
    albumEl.className = 'album'
    albumEl.id = `${album}-${idx}`
    albumEl.style.backgroundColor = 'transparent'
    albumEl.textContent = album
    albumsEl.appendChild(albumEl)
  })
}

function showSongs() {
  songsEl.innerHTML = ''
  songs.forEach( (song, idx) => {
    let songEl = document.createElement('p')
    songEl.className = 'song'
    songEl.id = `${song}-${idx}`
    songEl.style.backgroundColor = 'transparent'
    songEl.textContent = song
    songsEl.appendChild(songEl)
  })
  document.getElementById('song-header').style.display = 'flex'
}

function render(){
  lyricWrapEl.innerHTML = ''
  showLyric()
}

function init(){
  setAlbums()
  showAlbums()
}

init()