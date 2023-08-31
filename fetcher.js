const args = process.argv.slice(2);

if (args.length < 2) {
  throw "Please provide a URL and a local path to download web page contents to.";
}

const urlStr = args[0];
const destPath = args[1];

const fs = require("fs");
const request = require('request');

request(urlStr, (error, response, body) => {
  if (error) console.log('error:', error);
  
  if (response) console.log('statusCode:', response.statusCode, response.statusMessage);

  if (!body) return;
  
  fs.writeFile(destPath, body, (err) => {
    if (err) throw err;
    const size = fs.statSync(destPath).size
    console.log(`Downloaded and saved ${size} bytes to index.html`);
  });
});
