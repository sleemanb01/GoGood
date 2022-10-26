// export interface ILocation {
//   accuracy: number | null;
//   altitude: number | null;
//   heading: number | null;
//   latitude: number | null;
//   longitude: number | null;
//   speed: number | null;
// }

export interface ILocation {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}
