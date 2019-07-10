const fetch = require('node-fetch');

function getMovieTitles(substr) {
    const BASE_URL = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=';
    const movieName = substr;
    let pageNum = 1;
    let url = `${BASE_URL}${movieName}&page=${pageNum}`;
    let titles = [];

    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(json => {
        // check total pages and get results of the first page
        const total_pages = json.total_pages;
        const data = json.data;
        data.forEach(movie => titles.push(movie.Title));
        
        // handle additional pages
        let promises = [];
        if (total_pages > 1) {
          for (let i = 2; i <= total_pages; i++) {
            url = `${BASE_URL}${movieName}&page=${i}`;
            promises.push(
              fetch(url)
                .then(res => res.json())
                .then(json => json.data)
                .catch(e => console.error(e))
            );
          }
        }
        
        Promise.all(promises)
          .then(data => {
            const movies = data[0];
            movies.forEach(movie => {
              titles.push(movie.Title);
            });

            console.log('titles: ', titles);
          })
          .catch(e => console.error(e));
      })
      .catch(error => console.error(error));
    
};

getMovieTitles('Spiderman');
