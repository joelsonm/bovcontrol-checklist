import { PropsWithChildren, useEffect } from 'react'
import leaflet, { LocationEvent, Map as LeafletMap } from 'leaflet'
import * as ReactLeaflet from 'react-leaflet'
const { MapContainer, MapConsumer } = ReactLeaflet

import marker from '../../assets/marker.svg'
import markerShadow from '../../assets/marker-shadow.svg'

interface onLocationParams {
  location: LocationEvent['latlng']
  map: LeafletMap
}

interface ILocationMarker {
  onLocation(event: onLocationParams): void
}

interface IMap extends ReactLeaflet.MapContainerProps {
  onClickMap?(event: onLocationParams): void
}

const LocationMarker: React.FC<ILocationMarker> = ({ onLocation }) => {
  const map = ReactLeaflet.useMapEvents({
    click(e) {
      onLocation({
        location: e.latlng,
        map,
      })
    },
  })

  return null
}

const Map: React.FC<PropsWithChildren<IMap>> = ({
  children,
  onClickMap,
  ...props
}) => {
  useEffect(() => {
    leaflet.Icon.Default.mergeOptions({
      iconUrl: marker.src,
      iconRetinaUrl: marker.src,
      shadowUrl: markerShadow.src,
      iconSize: [80, 80],
      shadowSize: [80, 80],
      iconAnchor: [40, 40],
    })
  }, [])
  return (
    <MapContainer style={{ width: '100%', height: '100%' }} {...props}>
      <MapConsumer>
        {(map) => (
          <>
            {typeof children === 'function'
              ? children(ReactLeaflet, map)
              : children}
            <LocationMarker
              onLocation={(event) => {
                if (onClickMap) onClickMap(event)
              }}
            />
          </>
        )}
      </MapConsumer>
    </MapContainer>
  )
}

export default Map
