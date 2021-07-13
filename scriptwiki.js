

function handleSubmit(event) {

  event.preventDefault();
    var inputValue = document.querySelector('.js-search-input').value;
    var searchQuery = inputValue.trim();
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
      form.addEventListener('submit', handleSubmit);

    



