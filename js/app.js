/*------------ Constants ------------*/
import lyrics from '../data/lyrics.json' assert { type: 'json'}


/*------------ Variables ------------*/
const albums = []
let randLyrics = []
let streak


/*---- Cached Element References ----*/
const lyricBtnEl = document.querySelector('#lyric-button')
const lyricEl = document.querySelector('#current-lyric')
const lyricWrapEl = document.querySelector('#lyric-wrapper')
const albumsEl = document.querySelector('#album-wrapper')
const hintBtnEl = document.querySelector('#hint-button')

/*--------- Event Listeners ---------*/
lyricBtnEl.addEventListener('click', getRandomLyric)
albumsEl.addEventListener('click', checkAnswer)
hintBtnEl.addEventListener('click', getHint)

/*------------ Functions ------------*/

function getRandomLyric(){
  randLyrics = []
  let currentIndex = Math.floor(Math.random()*lyrics.length)
  randLyrics.push(lyrics[currentIndex])
  render()
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
    console.log(randLyrics)
    render()
  }
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
  randLyrics.forEach(lyric => {
    let lyricEl = document.createElement('p')
    lyricEl.textContent = lyric.lyric
    lyricWrapEl.appendChild(lyricEl)
  })
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
  //Clear children
  lyricWrapEl.innerHTML = ''
  showLyric()
}

function init(){
  setAlbums()
  showAlbums()
}

init()