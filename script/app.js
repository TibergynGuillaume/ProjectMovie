const apiKey = '61faa202';

const get = (url) => fetch(url).then((r) => r.json());

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
const getAPI = async (id) => {
  // Eerst bouwen we onze url op
  const endPoint = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
  // Met de fetch API proberen we de data op te halen.
  const movieResponse = await fetch(`${endPoint}`);

  const data = await movieResponse.json();
  console.log(data);
  // Als dat gelukt is, gaan we naar onze showResult functie.
  showDetails(data);
};

function showDetails(data) {
  id = data.imdbID;
  console.log(`movie id : ${id}`)
  let detailHTML = `
  <div class="c-details">
    
    <div class="c-details-card">
    <img class="c-poster__detail" src="img/Posters/${id}.jpg" alt="" />
    <div class="c-details-card-content">
        <div class="c-details-card__close js-close">
        <img src="./img/close_fullscreen_black_24dp (1).svg" alt="close detail screen"/>
      </div>

      <h1>${data.Title}</h1>
      <p>${data.Year} ${data.Runtime}</p>
      <p>${data.Language} - ${data.Country}</p>
      <p>Actors: ${data.Actors}</p>
      <p>Writer: ${data.Writer}</p>
      <p>${data.Plot}</p>

      <p>Awards: ${data.Awards}</p>

      <div class="c-details-card-ratings">
        <h3>Ratings</h3>
        <div id="chart" class="js-chart u-text__dark c-chart"></div>

        <h3>My Rating</h3>
        <div class="c-stars">
        <div class="stars">
        <input class="stars__checkbox" type="radio" id="first-star" name="star">
        <label class="stars__star" for="first-star">
            <svg class="stars__star-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
            </svg>
        </label>
        <input class="stars__checkbox" type="radio" id="second-star" name="star">
        <label class="stars__star" for="second-star">
            <svg class="stars__star-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
            </svg>
        </label>
        <input class="stars__checkbox" type="radio" id="third-star" name="star">
        <label class="stars__star" for="third-star">
            <svg class="stars__star-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
            </svg>
        </label>
        <input class="stars__checkbox" type="radio" id="fourth-star" name="star">
        <label class="stars__star" for="fourth-star">
            <svg class="stars__star-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
            </svg>
        </label>
        <input class="stars__checkbox" type="radio" id="fifth-star" name="star">
        <label class="stars__star" for="fifth-star">
            <svg class="stars__star-icon" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
                <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 
                    10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 "/>
            </svg>
        </label>
    </div>
        </div>
      </div>
      </div>
    </div>
  </div>
 
  `;
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

  overview.classList.add("u-hide-all");
  topbar.classList.add("u-hide-all");
  details.classList.remove("u-hide-all");

  document.querySelector('.js-details').innerHTML = detailHTML;
  
  let converted_labels = [];
  let converted_data = [];
  for (const rating of data.Ratings) {
    converted_labels.push(rating.Source);
    value = rating.Value;

    if(value.endsWith("%")){
      stringwaarde = parseInt(value.slice(0, -1));
      waarde = stringwaarde/10;
      console.log(`${rating.Source} ${waarde}`);
      converted_data.push(waarde);
    }

    if(value.endsWith("/100")){
      stringwaarde = parseInt(value.slice(0, -4));
      waarde = stringwaarde/10;
      console.log(`${rating.Source} ${waarde}`);
      converted_data.push(waarde);
    }

    if(value.endsWith("/10")){
      waarde = parseInt(value.slice(0, -3));
      console.log(`${rating.Source} ${waarde}`);
      converted_data.push(waarde);
    }    
  }



  drawChart(converted_labels, converted_data)

  closeButton = document.querySelector('.js-close');
  closeButton.addEventListener('click', function () {
      overview.classList.remove("u-hide-all");
      topbar.classList.remove("u-hide-all");
      details.classList.add("u-hide-all");
  })
}

const drawChart = function (labels, data) {
  var options = {
    series: [{
    data: data
  }],
    chart: {
    height: 350,
    type: 'bar',
    events: {
      click: function(chart, w, e) {
        // console.log(chart, w, e)
      }
    }
  },
  colors: ['#147AD6', '#147AD6', '#147AD6'],
  plotOptions: {
    bar: {
      columnWidth: '45%',
      distributed: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    show: false
  },
  xaxis: {
    categories: labels,
    labels: {
      style: {
        colors: ['#FFFFFF','#FFFFFF','#FFFFFF'],
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#FFFFFF',
        fontSize: '12px'
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}

function loadOverview(json) {
  let overviewHTML = '';
  console.log(json);
  json.forEach((element) => {
    overviewHTML += `<div class="c-overview__item u-x-span-1-bp3 u-x-span-1-bp2 u-x-span-1-bp1 js-poster" onclick="listenToSelectPoster('${element.id}')">
                        <img class="c-poster__overview" src="./img/Posters/${element.id}.jpg" alt="$Poster ${element.Name}" />
                        <div class="c-poster__overview-title">${element.Name}</div>
                    </div>`;
  });

  document.querySelector('.js-overview').innerHTML = overviewHTML;
}

function listenToSelectPoster(movieId) {
  overview = document.querySelector(".js-overview");
  details = document.querySelector(".js-details");
  topbar = document.querySelector(".js-topbar");

  console.log(movieId);
  // overview.classList.add("u-hide-all");
  // topbar.classList.add("u-hide-all");
  // details.classList.remove("u-hide-all");
  getAPI(movieId)
}

document.addEventListener('DOMContentLoaded', function () {
  // 1 We will query the API with longitude and latitude.
  fetch('movies.json')
    .then((response) => response.json())
    .then((json) => loadOverview(json));

  //   getAPI(50.8027841, 3.2097454);
});
