import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Building.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY3JhaW92YW9ubGluZSIsImEiOiJjanU3NG1zY2EwYTI5M3pvNWJnbmQxOG1pIn0.rdgtF2NMRdEbpXTbFpVvqw';

const Building = () => {
  const mapContainerRef = useRef(null);
  const [building, setBuilding] = useState(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const building = new mapboxgl.Map({
      container: mapContainerRef.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-87.62712, 41.89033],
      zoom: 15.5,
      pitch: 45
    });

    const rotateCamera = (timestamp) => {
      // Update the rotation angle using the current timestamp
      building.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation
      animationRef.current = requestAnimationFrame(rotateCamera);
    }

    building.on('load', () => {
      // Start the animation.
      rotateCamera(0);

      // Add 3D buildings and remove label layers to enhance the map
      const layers = building.getStyle().layers;
      for (const layer of layers) {
          if (layer.type === 'symbol' && layer.layout['text-field']) {
              // remove text labels
              building.removeLayer(layer.id);
          }
      }

      building.addLayer({
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
              'fill-extrusion-color': '#aaa',

              // use an 'interpolate' expression to add a smooth transition effect to the
              // buildings as the user zooms in
              'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'height']
              ],
              'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
          }
      });

      setBuilding(building);
    });

    // clean up on dismount
    return () => {
      cancelAnimationFrame(animationRef.current);
      building.remove();
    }
  }, []);
  return (
    <div>
      <div ref={mapContainerRef} className='building-container' />
    </div>
  )
}

export default Building;