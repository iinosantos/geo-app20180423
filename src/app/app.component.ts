import { Component } from '@angular/core';
import axios from 'axios';
import * as moment from 'moment';

declare const google;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  endDate = moment();
  geoJson = {
    'type': 'Feature',
    'properties':
      {
        'title': ''
      },
    'geometry': null,
    'features': null
  };
  latitude = 12.8797;
  longitude = 121.7740;
  result = {};
  resultCount = '';
  startDate = moment().subtract(1, 'months');
  styleFunc;
  title = 'Philippines Earthquakes Visualizer';
  zoom = 6;

  chooseMarker(event) {
    const FEATURE = data => event.feature.getProperty(data);
    const COORDS_ARR = this.geoJson.features.filter(data => data.id.indexOf(FEATURE('code')) > -1)[0];
    const COORDS = COORDS_ARR.geometry.coordinates;
    const RESULT = {
      title: FEATURE('place'),
      depth: `${COORDS[2]}km`,
      coords: `${COORDS[1]}°N ${COORDS[0]}°E`,
      time: moment(FEATURE('time')).format('MMMM Do YYYY, h:mm:ss a'),
      magnitude: FEATURE('mag'),
      url: FEATURE('url'),
      status: FEATURE('status'),
      tsunami: FEATURE('tsunami'),
      ttr: `${FEATURE('rms')}s`,
      gap: `${FEATURE('gap')}°`,
      felt: FEATURE('felt')
    };

    this.result = {...RESULT};
    document.getElementById('result-container').style.display = 'block';
  }

  clear() {
    this.geoJson = {
      'type': 'Feature',
      'properties':
        {
          'title': ''
        },
      'geometry': null,
      'features': null
    };
    this.resultCount = '';
    document.getElementById('result-container').style.display = 'none';
  }

  closeResult() {
    document.getElementById('result-container').style.display = 'none';
  }

  getCircle(magnitude) {
    return {
      path: google.maps.SymbolPath.CIRCLE ,
      fillColor: 'red',
      fillOpacity: .2,
      scale: Math.pow(2, magnitude) / 2,
      strokeColor: 'white',
      strokeWeight: .5
    };
  }

  submit() {
    const STARTDATE = this.startDate.format('YYYY-MM-DD');
    const ENDDATE = this.endDate.format('YYYY-MM-DD')
    const METHOD = 'query';
    const NO_RESULT_ELEM = document.getElementById('noresult-container');
    this.resultCount = '';
    document.getElementById('result-container').style.display = 'none';
    axios.get(`https://earthquake.usgs.gov/fdsnws/event/1/${METHOD}`, {
      params: {
        format: 'geojson',
        starttime: STARTDATE,
        endtime: ENDDATE,
        minlatitude: '4.61',
        maxlatitude: '21.45',
        minlongitude: '116.65',
        maxlongitude: '126.83'
      }
    })
      .then(response => {
        this.geoJson = response.data;
        const FEATURES_LENGTH = response.data.features.length;
        this.resultCount = `Results(${FEATURES_LENGTH})`
        if (!FEATURES_LENGTH) {
        } else {
          this.styleFunc = (feature) => {
            const MAGNITUDE = feature.getProperty('mag');
            return {
              icon: this.getCircle(MAGNITUDE)
            };
          };
        }
      });
  }
}
