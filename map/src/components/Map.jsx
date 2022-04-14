import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Marker from './Marker';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-71.1);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(12);
  const [modal, setModal] = useState(false);

  const [markers, setMarkers] = useState(
    JSON.parse(localStorage.getItem('markers')) || []
  );

  mapboxgl.accessToken =
    'pk.eyJ1IjoiZGFuaWlsbGV6ZyIsImEiOiJjbDF3OGRsYjYwNmE5M2xvOWt1cjdvdnZlIn0.L0KHFGGCZdeaYkXe4gew6w';

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/daniillezg/cl1w8mcgv003f15o91e9tsl3b',
      center: [lng, lat],
      zoom: zoom,
      pitch: 45,
      bearing: -17.5,
      antialias: true,
    });
  });

  useEffect(() => {
    if (markers.length !== 0) {
      markers.map((el) => {
        new mapboxgl.Marker()
          .setLngLat([el.longitude, el.latitude])
          .setPopup(
            new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
            }).setHTML(`<h1>${el.title}</h1><p>${el.description}</p>`)
          )
          .addTo(map.current);
      });
      localStorage.setItem('markers', JSON.stringify(markers));
    }
  }, [markers]);

  useEffect(() => {
    if (!map.current) return;

    map.current.on('move', () => {
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('mousedown', (e) => {
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
    });

    map.current.on('load', () => {
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      map.current.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#EEBF49',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: 'rgb(71 76 78)',
          color: ' #fff',
          padding: '6px 12px',
          fontFamily: 'monospace',
          zIndex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          margin: '12px',
          borderRadius: '4px',
        }}
      >
        <Typography variant='body1'>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </Typography>
      </Box>
      {modal && (
        <Marker
          markers={markers}
          setModal={setModal}
          setMarkers={setMarkers}
          lng={lng}
          lat={lat}
        />
      )}
      <Box
        sx={{ height: '100vh' }}
        ref={mapContainer}
        onClick={() => setModal(true)}
      />
    </Box>
  );
};

export default Map;
