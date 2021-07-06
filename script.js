//Variables
srcBtn = $('.button')
publicKey = '14d2733483246197c41202eeee06f856'
privateKey = '552ae74ba5b503a685324ca9f89914a51bbb943b'
ts = new Date().getTime();
md5= ts+privateKey+publicKey


//Functions
function MarApi(event){
    event.preventDefault()
    var comicUrl = 'http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${privateKey}&hash=${md5}'
    console.log('btn click works')
    fetch(comicUrl,{
        method: 'GET',
        credentials:'same-origin',
    })
        .then(function(response){
          console.log(response)
          return response.json();
        })
        .then(function(data){
          console.log(data)
        }
        )
}


srcBtn.on('click', MarApi)