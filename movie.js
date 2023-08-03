const API = 'f7155445' 
const form = document.querySelector('form')
const search = document.getElementById('movie-search')
const movieDiv = document.getElementById('movie-div')


const displayData = (data) => {
    title = ""
    movieDiv.innerHTML = ""
    search.value = ''
    
    //show title
    const movieName = document.createElement('h2')
    const {
       Title,  
       Year, 
       Rated,  
       Runtime, 
       Director, 
       Plot
    } = data
    movieName.textContent = Title
    movieDiv.appendChild(movieName)
    //show year
    const releaseYear = document.createElement('p')
    releaseYear.textContent = Year
    movieDiv.appendChild(releaseYear)
    //show rating
    const rating = document.createElement('p')
    rating.textContent = Rated
    movieDiv.appendChild(rating)
    //show runtime
    const runtime = document.createElement('p')
    runtime.textContent = Runtime
    movieDiv.appendChild(runtime)
    //show director
    const director = document.createElement('p')
    director.textContent = Director
    movieDiv.appendChild(director)
    //show plot
    const plotSummary = document.createElement('p')
    plotSummary.textContent = Plot
    movieDiv.appendChild(plotSummary)
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
    try{
        const res = await fetch(URL)
        if(res.status !== 200)
       throw new Error('Movie Not Found')
       const data = await res.json()
       console.log(data)
       displayData(data)
    }
       catch(err){
           movieDiv.innerHTML = err.message
   }

 }