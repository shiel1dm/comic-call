//Variables
srcBtn = $('.button')
userInput= $('input')
test = userInput.val()
publicKey = '77eadb0de3c81dae60d3ca584d03a73c'
ts = '1'


md5= '0f81566c5546a9103f75756ab08b8f92'
const container = document.querySelector("#marvelImg")


//Functions
function getrandInt(length){
  return Math.floor(Math.random() * length)
}

      function MarApi(event){
        event.preventDefault()
        
        var comicUrl = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${userInput.val()}&limit=100&ts=${ts}&apikey=${publicKey}&hash=${md5}`
        //We decided to go w/ StartsWith so a user might still find information, even though the character was misspelled
        console.log('btn click works')
        fetch(comicUrl,{
            method: 'GET',
            credentials:'same-origin',
        })
            .then(function(response){
              return response.json();
            })
            .then(function(data){
              i = getrandInt(data.data.results.length)
              character= data.data.results
              hero= character[i].name
              url = character[i].thumbnail.path
              ext = character[i].thumbnail.extension
              image= url+$.trim('/portrait_uncanny.'+ext)
              description= character[i].description
              urls= character[i].urls
      
              
              console.log(getrandInt(character.length)) //generates random int, but logging for test purposes.
              console.log(character[i]) //grabs random character from array
              console.log(hero)  // logs the character name that was chosen
              console.log(image) //logs the final combined image URL
              console.log(urls)



              let output = "";
              output = `
              <div>
                <h2 class= "bold"><strong>${hero}</strong></h2>
                <img class= "marImg" src=${image} alt="image" />
                <p class= "desc Body">${description}</p>
               </div> 
              `
              container.innerHTML += output
            })


    
}
       
srcBtn.on('click', MarApi)



// maybe set a random into from the src results. fill the carosel. 