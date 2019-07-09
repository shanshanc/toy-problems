const https = require('https');

function getMovieTitles(substr) {
    const BASE_URL = 'https://jsonmock.hackerrank.com/api/movies/search/?Title=';
    const movieName = substr;
    let pageNum = 1;
    let url = `${BASE_URL}${movieName}&page=${pageNum}`;
    let titles = [];

    https.get(url, res => {
      res.setEncoding('utf8');
      let body = '';

      res.on('data', chunk => {
        body += chunk;
      });

      res.on('end', () => {
        // get the first page results
        let json = JSON.parse(body);
        json.data.forEach(movie => {
          titles.push(movie.Title);
        });
        
        // get the results of following pages
        for (let i = 2; i <= json.total_pages; i++) {
          url = `${BASE_URL}${movieName}&page=${i}`;
          https.get(url, res => {
            res.setEncoding('utf8');
            let body = '';

            res.on('data', chunk => {
              body += chunk;
            });

            res.on('end', () => {
              let json = JSON.parse(body);
              json.data.forEach(movie => {
                titles.push(movie.Title);
              });

              // show results
              console.log('titles: ', titles.sort());
            }).on('error', e => console.error('page ', i, '. error: ', e));
          })
        }
      });
    }).on('error', e => console.error('error: ', e));

};

console.log(getMovieTitles('Spiderman'));
