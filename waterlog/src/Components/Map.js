import React, { Component } from 'react';
import { Map, 
        TileLayer, 
        Polyline, 
        CircleMarker, 
        Popup 
} from 'react-leaflet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMapsData } from './../actions/MapActions';
import Loader from './Loader';

const backgroundColor = '#253238';
const errorColor = '#FF1744';
const lighterColor = '#4F5B62';

function formatMapData(data) {
  let markers, segments;
  const todaysLeaks = data.leaks.filter(leak => (
    (new Date(leak.latestTimeStamp)).getDay() === (new Date(Date.now())).getDay() &&
    (new Date(leak.latestTimeStamp)).getMonth() === (new Date(Date.now())).getMonth() &&
    (new Date(leak.latestTimeStamp)).getFullYear() === (new Date(Date.now())).getFullYear()
  ));

  segments = data.segments.map(seg => {
    const leak = todaysLeaks.find(leak => leak.segmentsId === seg.id);
    if (leak) {
      seg.status = (leak.resolvedStatus.toLowerCase() === "unresolved") ? "leak" : "normal";
    } else {
      seg.status = 'normal'
    }
    return seg;
  });

  markers = data.monitors.map(mon => {
    return { id: mon.id, lat: mon.lat, lon: mon.long, status: mon.status }
  });
  return { markers, segments };
}

function generateMapIcons({ segments, markers }, simpleView) {
  const defaultColor = simpleView ? backgroundColor : lighterColor;
  return segments.map((segment) => {
    const sensorIn = markers.find(marker => (marker.id === segment.senseIDIn));
    const sensorOut = markers.find(marker => (marker.id === segment.senseIDOut));

    if (sensorIn === undefined || sensorOut === undefined) return <div></div>;
    const sensorInColor = defaultColor,
      sensorOutColor = defaultColor,
      segmentColor = defaultColor;
    if (sensorIn.status.toLowerCase() === 'fault') {
      sensorInColor = errorColor;
    }
    if (sensorOut.status.toLowerCase() === 'fault') {
      sensorOutColor = errorColor;
    }
    if (segment.status.toLowerCase() === 'leak') {
      segmentColor = errorColor;
    }

    return (
      <div>
        <Polyline
          positions={[[sensorIn.lat, sensorIn.lon], [sensorOut.lat, sensorOut.lon]]}
          color={segmentColor}
          weight={6}
        >
          <Popup>
            <span>{'segment ' + segment.id + '\n status ' + segment.status}</span>
          </Popup>
        </Polyline>
        <CircleMarker
          center={[sensorIn.lat, sensorIn.lon]}
          radius={5}
          opacity={.7}
          key={sensorIn.id}
          color={sensorInColor}
          fillOpacity={1}
        >
          <Popup>
            <span>{'sensor ' + sensorIn.id + '\n status ' + sensorIn.status}</span>
          </Popup>
        </CircleMarker>
        <CircleMarker
          fill={true}
          center={[sensorOut.lat, sensorOut.lon]}
          radius={5}
          opacity={.7}
          key={sensorOut.id}
          color={sensorOutColor}
          fillOpacity={1}
        >
          <Popup>
            <span>{'sensor ' + sensorOut.id + '\n status ' + sensorOut.status}</span>
          </Popup>
        </CircleMarker>
      </div>
    );
  })
}
class MapComponent extends Component {
  componentDidMount() {
    this.props.fetchMapsData();
  }

  constructor() {
    super();
    this.state = {
      lat: -25.783000,
      lng: 28.337000,
      simpleView: false,
      zoom: 17
    };
  }

  render() {
    const { error, loading, mapData } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <Loader />
    }
    let icons;
    if (mapData) {
      icons = generateMapIcons(formatMapData(mapData), this.state.simpleView)
    } else {
      return <div>Error! Failed to fetch</div>;
    }
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="map-main-div">
        <div className="map-tile-div">
          <Map center={position} zoom={this.state.zoom} zoomControl={false}>
            {(() => {
              if (this.state.simpleView)
                return <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />;
            })()}
            {icons}
          </Map>
        </div>
        <div className="map-button-div-layer2 map-button-tab">
          <button
            className={`map-button ${this.state.simpleView ? '' : 'active'}`}
            onClick={() => {
              this.setState({ simpleView: false });
            }}
          >
            Simplified
					</button>
          <button
            className={`map-button ${this.state.simpleView ? 'active' : ''}`}
            onClick={() => {
              this.setState({ simpleView: true });
            }}
          >
            Live Map
					</button>
        </div>
      </div>
    );
  }
}


MapComponent.propTypes = {
  fetchMapsData: PropTypes.func.isRequired,
  mapData: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  mapData: state.maps.items,
  loading: state.maps.loading,
  error: state.maps.error
});

export default connect(mapStateToProps, { fetchMapsData })(MapComponent);
