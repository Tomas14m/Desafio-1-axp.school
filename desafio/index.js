const moduloPelis = require("./pelis");
function parsear(argv) {
  //... acá ocurre la magia
  const respuesta = {};
  argv.forEach(function (item, id) {
    if (item.startsWith("--")) {
      const argumentoSinGiones = item.slice(2);
      respuesta[argumentoSinGiones] = argv[id + 1];
    }
  });
  return respuesta;
}

function main() {
  const soloLosArgumentos = process.argv.slice(2);
  const comandosAEjecutar = parsear(soloLosArgumentos);
  const peliculasAMostrar = moduloPelis.searchByCriteria(comandosAEjecutar);
  console.table(peliculasAMostrar);
}

main();
