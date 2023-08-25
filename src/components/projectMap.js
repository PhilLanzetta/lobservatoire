import React, { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps"

const ProjectMap = ({ projects }) => {
  const [zoomLevel, setZoomLevel] = useState(1)
  const cleanedData = projects.filter(project => project.exactLocation !== null)

  return (
    <div className="projects-map-container">
      <ComposableMap>
        <ZoomableGroup zoom={zoomLevel} center={[0, 0]}>
          <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  tabIndex={-1}
                />
              ))
            }
          </Geographies>
          {cleanedData.map(project => (
            <Marker
              key={project.id}
              coordinates={[
                project.exactLocation.lon,
                project.exactLocation.lat,
              ]}
            >
              <circle r={2} className="map-marker" />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="zoom-button-container">
        <button
          className="zoom-button"
          onClick={() => setZoomLevel(prev => prev + 1)}
        >
          +
        </button>
        <button
          className="zoom-button"
          onClick={() => {
            if (zoomLevel > 1) {
              setZoomLevel(prev => prev - 1)
            } else {
              return null
            }
          }}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default ProjectMap
