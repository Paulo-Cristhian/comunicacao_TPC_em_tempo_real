//COMUNICAÇÃO COM SERVER--------------------------------------------------------------------------

var socket = io('http://localhost:3000');

$('#registro').submit(function (event) {
  event.preventDefault()

  pais = $('select[name=paises]').val()
  r1 = $('input[name=exampleRadios1]:checked').val()
  r2 = $('input[name=exampleRadios2]:checked').val()
  r3 = $('input[name=exampleRadios3]:checked').val()
  pfinal = 0

  r1 == "true" ? pfinal++ : null;
  r2 == "true" ? pfinal++ : null;
  r3 == "true" ? pfinal++ : null;


  send = [pais, pfinal]

  socket.emit("envio", send);
})

function renderRetorno(param) {
  console.log(param)
  paises = param
  paises.unshift(['País', 'Pontos'])
  console.log(paises)

  google.charts.setOnLoadCallback(drawChart);
  google.charts.setOnLoadCallback(drawStuff);
  google.charts.setOnLoadCallback(drawRegionsMap);
}

socket.on('msgRecebida', function retornoBack(param) {
  renderRetorno(param);
})

//------------------------------------------------------------------------------------------------

paises = []

google.charts.load("current", { packages: ["corechart", "bar", "geochart"], 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY' });

function drawChart() {
  var data = google.visualization.arrayToDataTable(paises);
  var options = {
    title: 'País com maior negligência socio-ambienteal',
    pieHole: 0.4,
    is3D: true,
    backgroundColor: "transparent",
  };
  var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
  chart.draw(data, options);
}


function drawStuff() {
  var data = new google.visualization.arrayToDataTable(paises);
  var options = {
    width: 800,
    legend: { position: 'none' },
    chart: { title: 'País com maior negligência socio-ambienteal' },
    axes: {
      x: {
        0: { side: 'top', label: 'País' }
      }
    },
    bar: { groupWidth: "90%" },
    backgroundColor: "transparent",
  };
  var chart = new google.charts.Bar(document.getElementById('top_x_div'));
  chart.draw(data, google.charts.Bar.convertOptions(options));
};

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable(paises);
  var options = {
    backgroundColor: "transparent",
  };
  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
  chart.draw(data, options);
}



$("#pie").click(() => {
  $(".pie").removeClass("v-hide")
  $(".bar").addClass("v-hide")
  $(".geo").addClass("v-hide")
})

$("#bar").click(() => {
  $(".bar").removeClass("v-hide")
  $(".pie").addClass("v-hide")
  $(".geo").addClass("v-hide")
})

$("#geo").click(() => {
  $(".geo").removeClass("v-hide")
  $(".bar").addClass("v-hide")
  $(".pie").addClass("v-hide")
})

$("#responder").click(() => {
  $(".responder").removeClass("dn")
  $(".base-chart").addClass("dn")
  $(".base-alter-graph").addClass("v-hide")


  $('.selector-pais').html(``)
  paises.forEach((element, indice) => {
    indice != 0 ? $('.selector-pais').append(`<option value='${element[0]}'>${element[0]}</option>`) : null;
  });
})

$("#analisar").click(() => {
  $(".responder").addClass("dn")
  $(".base-chart").removeClass("dn")
  $(".base-alter-graph").removeClass("v-hide")
})