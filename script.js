// function visit(e) {
//   var link = e.getAttribute("link");
//   window.open(link, "_blank");
//   var last = document.querySelector(".lastvisitedbutton");
//   if (last) last.className = "visitedbutton";
//   e.className = "lastvisitedbutton";
// }
// function copy(e) {
//   var copy = e.parentElement.firstChild;
//   navigator.clipboard.writeText(copy.innerHTML);
// }

function paisEscogido() {
    var indice;
    indice = document.country.pais.selectedIndex;
    var pais;
    pais = document.country.pais.options[indice].value;
    return pais;
  }
  
  function muestra() {
    console.log(document.getElementById("tablecontainer"));
    seleccion = paisEscogido();
    for (let index = 0; index < document.country.pais.length; index++) {
      if (document.country.pais.options[index].value == seleccion) {
        var elemento = document.getElementById(seleccion);
        elemento.className = "visible";
      } else {
        otro = document.country.pais.options[index].value
        var enlace = document.getElementById(otro);
        enlace.className = "oculto";
      }
    }
  }
  