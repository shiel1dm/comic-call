srcBtn = $('.button')
userInput= $('input')
test= $('.marvelImg')
publicKey = '77eadb0de3c81dae60d3ca584d03a73c'
ts = '1'


md5= '0f81566c5546a9103f75756ab08b8f92'
const container = document.querySelector("#marvelImg")


//Functions
function getrandInt(length){
  return Math.floor(Math.random() * length)
}



function handleSubmit(input) {

  console.log(input);
  var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${input}`;
  fetch(url)
    .then(function(response){
    return(response.json());
    })
    .then(function(data){
    let resultsArray = data.query.search;
    //resultsOnPage(resultsArray);
    text = resultsArray[0].snippet
    container.innerHTML += text
    
    })
    .catch(function () {

    console.log('An error occurred');
    });

    

  }





function MarApi(event){
  event.preventDefault()
  test.empty()
  var comicUrl = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${userInput.val()}&limit=100&ts=${ts}&apikey=${publicKey}&hash=${md5}`
  //We decided to go w/ StartsWith so a user might still find information, even though the character was misspelled
  /** I would have liked to have cleared the contents of the first box if the search button was hit again.
   But we didn't find the time to initialize that and felt it wasn't our most important goal.
   */
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
      link= character[i].urls[1].url.trim()
      url = character[i].thumbnail.path
      ext = character[i].thumbnail.extension
      image= url+$.trim('/portrait_uncanny.'+ext)
      description= character[i].description
      urls= character[i].urls
     

      handleSubmit(hero)

      console.log(getrandInt(character.length)) //generates random int, but logging for test purposes.
      console.log(character[i]) //grabs random character from array
      console.log(hero)  // logs the character name that was chosen

      
     
      localStorage.setItem(hero, description);
      
      if(Boolean(description) === false){
        description = `Sorry, our database did not have the information requested, head on over to <a href='https://www.marvel.com'> Marvel's Official Site </a>`
        console.log(link)//This is the link from the Marvel API and the format I wanted to use, but b/c of time I wasn't able to format the link to work correctly. Logging this for future improvements
      }
        else{
          console.log('Information pulled from Marvel API')
        }

        console.log(typeof description, Boolean(description), description)

      let output = "";
      output = `
      <div class="container column is-centered is-two-thirds has-text-centered mt-0 py-0">
      <div class="notification has-background-danger">
        <h2 class= "title is-size-1"><strong class="has-text-white">${hero}</strong></h2>
        <img class= "marImg" src=${image} alt="image" />
        <p class= "desc Body has-text-white">${description}</p>
        </div> 
        </div>
      `
      container.innerHTML += output
      })
};


srcBtn.on('click', MarApi)

