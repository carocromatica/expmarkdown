const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

/*
 * Función que lee un archivo y retorna promesa con su contenido
 */
function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, data) => {
            if (error) {
                return reject(error);//Sabemos que hay un error, así que rechazamos la promesa
                //Si hay error, también nos aseguramos con return de no seguir ejecutando nada más en esta función
            }
            markdownLinkExtractor(data);
            return resolve(data); //En caso de que no haya error resolvemos la promesa con los datos que recibimos en el callback
        });
    });
};

console.log("Process.argv > " + JSON.stringify(process.argv));
console.log("CWD > " + process.cwd()); // Me va a indicar donde se está ejecutando el archivo
const [, , ...userCLIArgs] = process.argv;
//Process.argv > ["/usr/bin/node","/home/fabian/Projects/Clases/2018-1-TallerPromesasPathTerminal/app.js"]
//Por cada espacio se hace un nuevo elemento en process.argv 
console.log("User args > " + JSON.stringify(userCLIArgs));
//User args > ["HoliHoli","--validate","--stats"]
readFilePromise( userCLIArgs[0]).then((data) => {
    console.log("Contenido del archivo > " + JSON.stringify(data.split('\n')));
    //forEach((elemento, index)=>{})
}).catch((error) => {
    console.error("Error > " + error);
});

const Marked = require('marked');

// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  renderer.image = function(href, title, text) {
      // Remove image size at the end, e.g. ' =20%x50'
      href = href.replace(/ =\d*%?x\d*%?$/, '');
      links.push({
        href: href,
        text: text,
        title: title,
      });
  };
  Marked(markdown, {renderer: renderer});
  validateLink(links)
  console.log(links)
};

function validateLink(links) {
  links.forEach(element => {
    let url = element.href;
    fetch(url).then(response => response
    ).then(data => {
      console.log(data.url);
      console.log(data.status);
      console.log(data.statusText); 

      if (data.status=='404'){
           (console.log('SHAN!')); 
     
      }
    }).catch(error => {
      console.error('ERROR > ' + error.status);
    });
  });
}
