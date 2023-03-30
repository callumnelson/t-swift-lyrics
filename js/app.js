/*------------ Constants ------------*/
import lyrics from '../data/lyrics.json' assert { type: 'json'}


/*------------ Variables ------------*/
const albums = []
let currentLyric, currentIndex, currentAlbum


/*---- Cached Element References ----*/
const lyricBtnEl = document.querySelector('#lyric-button')
const lyricEl = document.querySelector('#current-lyric')
const albumsEl = document.querySelector('#album-wrapper')

/*--------- Event Listeners ---------*/
lyricBtnEl.addEventListener('click', getRandomLyric)
albumsEl.addEventListener('click', checkAnswer)


/*------------ Functions ------------*/

function getRandomLyric(){
  currentIndex = Math.floor(Math.random()*lyrics.length)
  currentLyric = lyrics[currentIndex].lyric
  currentAlbum = lyrics[currentIndex].album_name
  console.log(currentLyric)
  console.log(currentAlbum)
  render()
}

function checkAnswer(evt){
  console.dir(evt.target)
  if (albums[+evt.target.id] === currentAlbum) {
    evt.target.style.backgroundColor = 'green'
    evt.target.style.color = 'white'
  }else {
    evt.target.style.backgroundColor = 'red'
    evt.target.style.color = 'gray'
  }
  
}

function setAlbums(){
  lyrics.reduce( (a, c) => {
    if (!a.includes(c.album_name)) a.push(c.album_name)
    return a
  }, albums)
}

function showLyric() {
  lyricEl.textContent = currentLyric
}

function showAlbums() {
  albums.forEach( (album, idx) => {
    let albumEl = document.createElement('p')
    albumEl.className = 'album'
    albumEl.id = idx
    albumEl.textContent = album
    albumsEl.appendChild(albumEl)
  })
}

function render(){
  showLyric()
}

function init(){
  setAlbums()
  showAlbums()
}

init()