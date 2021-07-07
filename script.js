//Variables
srcBtn = $('.button')
userInput= $('input')
test = userInput.val()
publicKey = '77eadb0de3c81dae60d3ca584d03a73c'
privateKey = '418d55284383ba9c9da775e688ebbd6c4faeffdd'
ts = '1'

md5= '0f81566c5546a9103f75756ab08b8f92'


//Functions
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
          console.log(data)
          console.log(userInput.val())
        })
  
  
    
}


srcBtn.on('click', MarApi)


// maybe set a random into from the src results. fill the carosel. 