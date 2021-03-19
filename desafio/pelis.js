const fs = require("fs");
const pelis = fs.readFileSync(__dirname + "/pelis.json");
const pelisTostring = pelis.toString();
const pelisParseadas = JSON.parse(pelisTostring);
const pelisNoFormat = JSON.stringify(pelisParseadas);

// retorna todas las pelis (collection)

const getAll = function () {
  return pelisParseadas;
};

// recibe un array de pelis y las filtra por texto
function searchByTitle(texto, arrayPeliculas) {
  const pelis = arrayPeliculas;
  const arrayFiltrado = pelis.filter(function (item) {
    return item.tags.includes(texto) || item.title.includes(texto);
  });
  return arrayFiltrado;
}

//recibe un array de pelis y las ordena por propiedad
function sortBy(propiedad, arrayPeliculas) {
  const pelis = arrayPeliculas;

  const arrayOrdenado = pelis.sort(function (a, b) {
    if (a[propiedad] > b[propiedad]) {
      return 1;
    }
    if (a[propiedad] < b[propiedad]) {
      return -1;
    }
    return 0;
  });
  return arrayOrdenado;
}

exports.searchByCriteria = function (criterio) {
  let peliculas = getAll();
  let resultadoFinal = [];
  if (criterio.search) {
    resultadoFinal = searchByTitle(criterio.search, peliculas);
    peliculas = searchByTitle(criterio.search, peliculas);
  }
  if (criterio.sort) {
    resultadoFinal = sortBy(criterio.sort, peliculas);
    peliculas = sortBy(criterio.sort, peliculas);
  }
  if (Object.keys(criterio).includes("no-format")) {
    if (peliculas == false) {
      return pelisNoFormat;
    } else {
      return JSON.stringify(peliculas);
    }
  }
  return resultadoFinal;
};
