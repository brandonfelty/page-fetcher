const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = function(url, localPath) {
  url = args[0];
  localPath = args[1];

  if (fs.existsSync(localPath)) {
    rl.question("Are you sure you want to overwrite this file? (y/n) ", (answer) => {
      rl.close();
      if (answer === 'y') {
        request(url, (error, response, body) => {
          console.log('url', url)
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML

          fs.writeFile(localPath, body, err => {
            if (err) {
              console.log('ERROR');
              return;
            } 
          console.log(`Downloaded and save ${body.length} bytes to ${localPath}`);
          });
        });
       } else if (answer === 'n') {
          console.log('Goodbye');
        } else {
          console.log('Not a valid input')
      }
    });
  } else {
      rl.close();
      request(url, (error, response, body) => {
        console.log('url', url)
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML

        fs.writeFile(localPath, body, err => {
          if (err) {
            console.log('ERROR');
            return;
          } 
        console.log(`Downloaded and save ${body.length} bytes to ${localPath}`);
        });
      });
  }
};

fetcher();