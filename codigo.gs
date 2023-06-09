function doGet() { //Para crear el template
  var html = HtmlService.createTemplateFromFile('index'); //El template se crea apartir del archivo index
  html.paises = paises(); //Template de la lista de paises que se usa para la lista desplegable del front 
  const output = html.evaluate();
  return output;
}

function include(fileName) { //Esta función se crea para poder tener en diferentes archivos el CSS y el JS del Index
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function getSheetData() { //Con esta función se extraen los datos de las universidades y sus respectivos enlaces a catálogo y biblioteca
  eliminarFilasVacias("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434", "Enlaces");
  var SS = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434");//Se accede a la hoja de calculo mediante su enlace.
  var universidades = SS.getSheetByName('Enlaces');
  universidades = universidades.getDataRange().getValues(); //Se obtiene todos los valores de la hoja de calculo
  universidades.shift(); //Se elimina la primera fila de los datos, ya que allí están los titulos de cada columna
  console.log(universidades);
  return universidades.sort(); //Se ordenan los datos
}

function paises() { //Con esta función se busca eliminar datos repetidos, en este caso los paises para obtener nada más un valor de estos y mandarlos a lista desplegable del front.
  var data = getSheetData();
  var instituciones = []
  data.forEach(row => {
    instituciones.push(row); //Se crea un vector vacío y este se llena con todos los datos que hay en la base de datos, incluido país, nombre de la universidad y sus enlaces a catálogo y biblioteca
  })

  var paises = [];
  for (var i = 0; i < instituciones.length; i++) { //Se crea un vector vacío para llenar nada más con los países, los cuales se sacan del vector anterior
    paises.push(instituciones[i][0]);
  }

  var unicos = paises.filter((valor, indice) => { //Se crea un filtro donde se elimine valores repetidos, en este caso se elimina todos los valores repetidos de un país y se deja solo un valor de este.
    return paises.indexOf(valor) === indice;
  });
  return unicos;
}

function showFilteredData(pais = "Brasil") { //Se crea esta función para mostrar unicamente el listado de universidades del país seleccionado
  eliminarFilasVacias("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434", "Enlaces");
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434");

  if (pais == "Todas") {
    var data = sheet.getSheetByName('Enlaces');
    data = sheet.getDataRange().getValues();
    data = data.sort()
    console.log(data)
    return data
  }
  else {
    var data = sheet.getSheetByName('Enlaces');
    data = sheet.getDataRange().getValues();
    var filteredData = data.filter(function (row) {
      return row[0] == pais;
    });
    filteredData = filteredData.sort(); //Se organizan los datos una vez filtrados para obtener los que nada más se solicitan
    // console.log(filteredData[0][0])
    console.log(filteredData);
    return filteredData;
  }
}

function eliminarFilasVacias(enlace = "https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434", hoja = "Historial") {
  var sheet = SpreadsheetApp.openByUrl(enlace);
  var data = sheet.getSheetByName(hoja);
  var datos = data.getDataRange().getValues();
  var filas = datos.length;
  var columnas = datos[0].length;
  var filasEliminadas = 0;

  for (var i = filas - 1; i >= 0; i--) {
    var filaVacia = true;
    for (var j = 0; j < columnas; j++) {
      if (datos[i][j] != "") {
        filaVacia = false;
        break;
      }
    }
    if (filaVacia) {
      data.deleteRow(i + 1);
      filasEliminadas++;
    }
  }

  Logger.log("Se eliminaron " + filasEliminadas + " filas vacías.");
}

function historyPage(pais, universidad, enlace, universidad_catalogo) {
  eliminarFilasVacias("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434", "Historial");
  // Obtiene la hoja de cálculo
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434");
  var data = sheet.getSheetByName('Historial');
  const date = new Date();
  const options = {
    timeZone: 'America/Bogota'
  };

  // Inserta una nueva fila en la segunda posición y mueve los datos antiguos hacia abajo
  data.insertRowBefore(2);
  // sheet.getRange(3, 1, sheet.getLastRow() - 2, 5).moveTo(sheet.getRange(4, 1, sheet.getLastRow() - 2, 5));

  // Agrega los datos recién ingresados en la segunda fila
  data.getRange("A2:E2").setValues([[date.toLocaleString('es-CO', options), pais, universidad, universidad_catalogo, enlace]]);

  // Elimina la última fila si hay más de 50 filas
  if (data.getLastRow() > 1001) {
    data.deleteRow(1002);
  }
}

function historial(){
  // eliminarFilasVacias("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434", "Historial");
  var sheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/10Mfm66HtnMVaDxH3TNgJdUUr-ixtiafvvrulnvszse4/edit#gid=1745485434");
  var data = sheet.getSheetByName('Historial');
  var universidades = data.getDataRange().getValues();
  universidades.shift();
  console.log(universidades);
  return universidades;
}
