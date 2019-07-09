const https = require('https');

function getMovieTitles(substr) {
    const BASE_URL = 'https://jsonmock.hackerrank.com/api/movies/search/?Title='
    const url = BASE_URL + substr;
    let movies = [];
    let total_pages = 0;
    const getMovies = url => {
      return new Promise((resolve, reject) => {
        https.get(url, res => {
          res.setEncoding('utf8');
          let body = [];
          res.on('data', chunk => {
            body.push(chunk);
            // console.log('chunk: ', chunk);
          });
          res.on('end', () => resolve(body.join('')));
        }).on('error', reject);
      });
    };
    
    let titles = [];
    const data = getMovies(url)
      .then(movies => {
        let obj = JSON.parse(movies);
        const total_pages = obj.total_pages;
        
        for (let movie of obj.data) {
          titles.push(movie.Title);
        }


        console.log('movie titles: ', titles);
        return titles
      })
      .catch(err => console.error(err));

    return data;
    // console.log('body: ', body);
    // return body;
    // const results = https.get(url, res => {
    //   let content = '';
      
    //   res.on('data', chunk => {
    //     content += chunk;
    //   });

    //   res.on('end', () => {
    //     total_pages = JSON.parse(content).total_pages;
    //     movies = JSON.parse(content).data;
    //     return movies;
    //   })    

    // }).on('error', err => console.error(err.message));
    // return results;
};

// console.log(getMovieTitles('Spiderman'));
getMovieTitles('Spiderman');
