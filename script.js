//Variables
srcBtn = $('.button')
publicKey = '77eadb0de3c81dae60d3ca584d03a73c'
privateKey = '418d55284383ba9c9da775e688ebbd6c4faeffdd'
ts = '1'

md5= '0f81566c5546a9103f75756ab08b8f92'


//Functions
function MarApi(event){
    event.preventDefault()
    var comicUrl = `http://gateway.marvel.com/v1/public/characters?limit=100&ts=${ts}&apikey=${publicKey}&hash=${md5}`
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
        })
    
}


srcBtn.on('click', MarApi)


// maybe set a random into from the src results. fill the carosel. 