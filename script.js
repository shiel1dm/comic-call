//Variables
srcBtn = $('.button')
userInput= $('input')
publicKey = '77eadb0de3c81dae60d3ca584d03a73c'
ts = '1'


md5= '0f81566c5546a9103f75756ab08b8f92'
const container = document.querySelector("#marvelImg")


//Functions
function getrandInt(length){
  return Math.floor(Math.random() * length)
}



function handleSubmit() {

  //event.preventDefault();
    //var inputValue = document.querySelector('.js-search-input').value; commenting out while I test functionality w/ my js
    var searchQuery = userInput;
    console.log(searchQuery);
    var url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    console.log(url);
  
      fetch(url)
      .then(function(response) {
      return(response.json());
      })
      .then(function(data){
      let resultsArray = data.query.search;
      resultsOnPage(resultsArray);
      console.log(resultsArray);
      })
      .catch(function () {

      console.log('An error occurred');
      });
}

        
   

      function resultsOnPage(myArray){
          myArray.forEach(function(item){
          let itemTitle = item.title;
          let itemSnippet = item.snippet;
          let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);
          console.log(itemTitle);
          console.log(itemSnippet);
          console.log(itemUrl);
      
         
        });
      }
      
      
  
    var form = document.querySelector('.js-search-form');
      //form.addEventListener('submit', handleSubmit);

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

      handleSubmit()

      console.log(getrandInt(character.length)) //generates random int, but logging for test purposes.
      console.log(character[i]) //grabs random character from array
      console.log(hero)  // logs the character name that was chosen
      console.log(image) //logs the final combined image URL
      console.log(urls)


              //Output of the API call data to a div in order to render on the webpage.
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

}
       
srcBtn.on('click', MarApi)
 