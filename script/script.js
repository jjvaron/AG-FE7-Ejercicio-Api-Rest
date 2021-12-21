/* const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`

 */

/* Declarations */
const API_URL = 'https://rickandmortyapi.com/api/character'
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name='

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const h2 = document.querySelector('h2')



h2.addEventListener('click', () => {
    getCharacters(API_URL)
})


const getCharacters = (url) => {
    const peticion = fetch(url)
    peticion.then(resp=> resp.json())
     //.then(data => console.log(data.results)) 
        .then(data => showCharacters(data.results)) 
        .catch(error => 
            swal.fire({
                title: 'There has been an error with the server',
                text: 'Try again later',
                icon: 'error',
                confirmButtonText: 'Okay'
              }))
}

getCharacters(API_URL)


const showCharacters = (characters) =>{
    main.innerHTML=''
    console.log(characters);
    if(characters.length == 0){
        swal.fire({
            title: 'Character not found',
            text: 'Try with another name',
            icon: 'warning',
            confirmButtonText: 'Okay'
          })
    }
    else{
        main.innerHTML=''
        characters.forEach(character => {
            const {name, status,species,gender,type,image,episode} = character
            console.log(episode)
                                    
            const divCharacter = document.createElement('div')
            divCharacter.classList.add('character')
            divCharacter.innerHTML = 
            `
            <img src="${image}" alt = "" >
            <div class"character-info">
            
                <h3> ${name} </h3>
                <h3> ${species} - ${gender} </h3>
                <h3> ${type} </h3>
                
                
            </div>
            `
            
            main.appendChild(divCharacter) //<span class=${getclassByStatus(status)}>${status}</span>
        })
        
        
    }

}


/* const getclassByStatus = (status) => {
    if (status === "Dead"){
        return "red"
    }else if(status === 'unknown'){
        return "orange"
    } else{
        return "green"
    }
} */



 //crear evento submit
form.addEventListener('submit',e =>{ //e hace referencia al submit event
    e.preventDefault() //prevenir que la página se recargue
    const searchTerm = search.value
    if(searchTerm && searchTerm !== ''){
        getCharacters(SEARCH_URL + searchTerm)
        search.value = ""        
    }else{
        window.location.reload()
    }
    console.log(searchTerm)
}) 