<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous">
</script>

<script>
  document.getElementById('dropdown').addEventListener("click",  dropdownClicked); //Se utiliza el evento addEventListener en el elemento cuyo id es "dropdown" para cuando se le de click ejecute la función dropdownClicked
  document.getElementById('historyBtn').addEventListener("click",  function(){
    

      google.script.run.withSuccessHandler(function(universidades) {
      var data = universidades;
      var html = "";
      html += `<h2 style="text-align:center;">Historial</h2>`;
      for (var i = 0; i < data.length; i++) {
        html += "<div class='card m-3 col-md-6 mx-auto my-4' style='width: 100%'>";
        html += "<div class='card-body'>";
        html += `<h5 class='card-title'>${data[i][2]}</h5>`;
        html += `<a class="enlaces" href=${data[i][4]} target='_blank' id="${data[i][1]}_${data[i][2]}_${data[i][3]}">${data[i][3]}</a>`;;
        html += "<br>";
        html += `<p class='card-text'>Institución universitaria de ${data[i][1]} que hace parte del convenio Istec Liblink </p>`;
        html += "</div>";
        html += "</div>";
      }
      document.getElementById("main-content").innerHTML = html;
      }).historyView();


  });

  function dropdownClicked(e){ //En esta función se hace un condicional en el cual se evalua si el usuario está pidiendo la lista de todos los países o de uno en especifico, para luego crear el template correspondiente a lo que eligió el usuario.

    if (e.target.id == "Todas"){
      google.script.run.withSuccessHandler(function(universidades) {
      var data = universidades;
      var html = "";
      html += `<h2 style="text-align:center;">Todas</h2>`;
      for (var i = 0; i < data.length; i++) {
        html += "<div class='card m-3 col-md-6 mx-auto my-4' style='width: 25%'>";
        html += "<div class='card-body'>";
        html += `<h5 class='card-title'>${data[i][1]}</h5>`;
        html += `<a class="enlaces" href=${data[i][2]} target='_blank' id="${data[i][0]}_${data[i][1]}_universidad"> Universidad </a>`;
        html += `<a  class="enlaces" href=${data[i][3]} target='_blank' id="${data[i][0]}_${data[i][1]}_catalogo" style="margin-left:5%;"> Catálogo </a>`;
        html += "<br>";
        html += `<p class='card-text'>Institución universitaria de ${data[i][0]} que hace parte del convenio Istec Liblink </p>`;
        html += "</div>";
        html += "</div>";
      }
      document.getElementById("main-content").innerHTML = html;
      }).showFilteredData(e.target.id);
    }
    else{
      google.script.run.withSuccessHandler(function(universidades) {
      var data = universidades;
      var html = "";
      html += `<h2 style="text-align:center;">${data[0][0]}</h2>`;
      for (var i = 0; i < data.length; i++) {
        html += "<div class='card m-3 col-md-6 mx-auto my-4' style='width: 25%'>";
        html += "<div class='card-body'>";
        html += `<h5 class='card-title'>${data[i][1]}</h5>`;
        html += `<a class="enlaces" href=${data[i][2]} target='_blank' id="${data[i][0]}_${data[i][1]}_universidad"> Universidad </a>`;
        html += `<a  class="enlaces" href=${data[i][3]} target='_blank' id="${data[i][0]}_${data[i][1]}_catalogo" style="margin-left:5%;"> Catálogo </a>`;
        html += "<br>";
        html += `<p class='card-text'>Institución universitaria de ${data[i][0]} que hace parte del convenio Istec Liblink </p>`;
        html += "</div>";
        html += "</div>";
      }
      document.getElementById("main-content").innerHTML = html;
      }).showFilteredData(e.target.id);
    }
  };

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('enlaces')) { // Si el elemento clickeado tiene la clase 'enlaces'
      const titulo = event.target.closest('.card').querySelector('.card-title'); // Buscar el título correspondiente
      // console.log(titulo.textContent); // Imprimir el texto del título
      // console.log(event.target.id);
      const texto = event.target.id;
      const partes = texto.split("_");
      const seleccion = partes[0];
      // console.log(seleccion);
      google.script.run.withSuccessHandler(function() {
        console.log('Función ejecutada con éxito');
      }).withFailureHandler(function() {
        console.error('Error al ejecutar la función');
      }).historyPage(seleccion, titulo.textContent, event.target.href, event.target.textContent)
    }
  });



  // Seleccionar el elemento que se va a observar
  // const targetNode = document.getElementById('main-content');
  // // console.log(targetNode);
  // // Opciones para el observer (en este caso, observar cambios en el contenido)
  // const config = {childList: true, subtree: true };
  // // Función callback que se ejecuta cuando ocurre un cambio en el contenido del elemento observado
  // const callback = function(observer){ };
    // // Crear un nuevo observer con la función callback y las opciones de configuración
    // const observer = new MutationObserver(callback);
    // // Iniciar la observación del elemento con el observer creado anteriormente y las opciones de configuración
    // observer.observe(targetNode, config);
    </script>