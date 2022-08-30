interface FindCenterParams {
  latitude: number
  longitude: number
}

export const findCenter = (coordenates: FindCenterParams[]) => {
  const lats = coordenates.map((m) => m.latitude)
  const lngs = coordenates.map((m) => m.longitude)
  return {
    lat: (Math.min(...lats) + Math.max(...lats)) / 2,
    lng: (Math.min(...lngs) + Math.max(...lngs)) / 2,
  }
}
