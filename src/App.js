import React, { useRef, useEffect, useState, createElement } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFuaWlsbGV6ZyIsImEiOiJjbDF3OGRsYjYwNmE5M2xvOWt1cjdvdnZlIn0.L0KHFGGCZdeaYkXe4gew6w";

const App = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/daniillezg/cl1w8mcgv003f15o91e9tsl3b",
      center: [lng, lat],
      zoom: zoom,
      pitch: 45,
      bearing: -17.5,
      antialias: true,
    });
  });

  useEffect(() => {
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup()

      .addTo(map.current);
  }, []);

  useEffect(() => {
    if (!map.current) return;

    map.current.on("mousedown", (e) => {
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
    });

    map.current.on("move", () => {
      setZoom(map.current.getZoom().toFixed(2));
    });
    map.current.on("load", () => {
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;

      map.current.addLayer(
        {
          id: "add-3d-buildings",
          source: "composite",
          "source-layer": "building",
          filter: ["==", "extrude", "true"],
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#EEBF49",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"],
            ],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );
    });
  }, []);

  return (
    <div className="App">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} id="23" className="map-container" />
    </div>
  );
};

export default App;
