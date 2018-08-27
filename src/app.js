const path = require('path');
const fetch = require('node-fetch');
fs = require('fs')
const Marked = require('marked');

const getmd = path.resolve('src/README.md');
fs.readFile(getmd, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

getLinks(data);
});

function getLinks(markdown) {
  const links = [];
  const renderer = new Marked.Renderer();
  
  renderer.link = function(href, title, text) {

    let url=href;

    links.push({
      href: href,
      text: text,
      title: title
    });

    console.log(url);
  };

  
  
  Marked(markdown, {renderer: renderer});
  
  
  
};