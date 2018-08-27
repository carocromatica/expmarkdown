const fetch = require('node-fetch');

fetch('http://laboratoria.la/asdas').then((response) => {
  console.log('http://laboratoria.la/asdas')
  console.log(response.status)//status me obtiene el estatus del link :D


})