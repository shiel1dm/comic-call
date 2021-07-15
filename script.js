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
    console.log(resultsArray[0].snippet);
    })
    .catch(function () {

    console.log('An error occurred');
    window.alert('An error has occurred')
    });
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

      handleSubmit(hero)

      console.log(getrandInt(character.length)) //generates random int, but logging for test purposes.
      console.log(character[i]) //grabs random character from array
      console.log(hero)  // logs the character name that was chosen
      


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

            function resultsOnPage(myArray){
              myArray.forEach(function(item){
              let itemTitle = item.title;
              let itemSnippet = item.snippet;
              let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);
              console.log(itemTitle);
              console.log(itemSnippet);
              console.log(itemUrl);
          
              
           
          })
            
            resultsOnPage.insertAdjacentHTML('beforeend',
              `<div class="resultItem">
              <h3 class="resultTitle">
              <a href="${itemUrl}" target="_blank" rel="noopener">${itemTitle}</a>
              </h3>
              <p class="resultSnippet"><a href="${itemUrl}"  target="_blank" rel="noopener">
              ${itemSnippet}</a></p>
              </div>`
            );
            };
          ;
      
      };


       

;



       
              srcBtn.on('click', MarApi)



// maybe set a random into from the src results. fill the carosel. 