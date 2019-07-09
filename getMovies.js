const https = require('https');

function getMovieTitles(substr) {
    // https request function
    const getMovies = (url) => {
      return new Promise((resolve, reject) => {
        https.get(url, res => {
          res.setEncoding('utf8');
          let body = [];
          res.on('data', chunk => {
            body.push(chunk);
          });
          res.on('end', () => resolve(body.join('')));
        }).on('error', reject);
      });
    };

    const promise1 = getMovies('https://jsonmock.hackerrank.com/api/movies/search/?Title=Spiderman');
    promise1.then(res => {
      // check the number of total pages
      const posStart = res.indexOf('"total_pages"')+14;
      const posEnd = res.indexOf(',', posStart);
      const totalPage = Number(res.substring(posStart, posEnd));

      let urlList = [];
      for (let i = 1; i <= totalPage; i++) {
        urlList.push(getMovies(`https://jsonmock.hackerrank.com/api/movies/search/?Title=Spiderman&page=${i}`));
      }
      // resolve all promises
      Promise.all(urlList).then(items => {
        let titles = [];
        items.forEach(item => {
          const movies = JSON.parse(item).data;
          for (let movie of movies) {
            titles.push(movie.Title);
          }
        });
        console.log('titles: ', titles, 'total: ', titles.length);
        
      }).catch(e => console.error(e));
    })
   
};

getMovieTitles('Spiderman');
