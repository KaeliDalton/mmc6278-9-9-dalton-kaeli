const db = require("../config/connection");
const API = 'f7155445' 
const form = document.querySelector('form')
const search = document.getElementById('movie-search')
const movieDiv = document.getElementById('movie-div')


const displayData = (data) => {
    title = ""
    movieDiv.innerHTML = ""
    search.value = ''


    //show title
    const {
      Title,  
      Year, 
      Rated,  
      Runtime, 
      Director, 
      Plot
    } = data
    const movieName = Title
    //show year
    const releaseYear = Year
    //show rating
    const rating = Rated
    //show runtime
    const runtime = Runtime
    //show director
    const director = Director
    //show plot
    const plotSummary = Plot
}

form.onsubmit = async function (e) {
    e.preventDefault()
    let title = this.search.value.trim()
    const URL = `http://www.omdbapi.com/?t=${title}&apikey=${API}`
    //if no input given, clear form
    if ((!title) || (search.value = "")){
        title = ''
        movieDiv.innerHTML = ''
        search.value = ''
    }
    if(res.status !== 200)
       throw new Error('Movie Not Found')
       const data = await res.json()
 }


async function create(name, year, rated, runtime, director, plot) {
  const name = movieName
  const year = releaseYear
  const rated = rating
  const plot = plotSummary
    await db.query(`INSERT INTO movies (name, year, rated, runtime, director, plot,) VALUES (?, ?, ?, ?, ?, ?)`, [
      name,
      year,
      rated,
      runtime,
      director,
      plot
    ]);
  }

module.exports = {
    displayData,
    create
};