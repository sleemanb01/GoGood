import Geolocation from 'react-native-geolocation-service';
import {useTranslation} from 'react-i18next';
import {ILocation} from '../interfaces/ILocation';
import {coordinate} from '../types/coordinate';
import {PermissionsAndroid} from 'react-native';
import {requestLocationPermission} from './requestPermission';

export const getLocation = async (setPosition: Function) => {
  const result = await requestLocationPermission();
  if (result) {
    await (async () => {
      Geolocation.getCurrentPosition(
        (position: ILocation) => {
          // console.log(position);

          setPosition(position);
        },
        error => {
          console.log(error.code, error.message);
          // console.log('null**********');
          // setPosition(null);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    })();
  } else {
    console.log('permission denied!');
  }
};

export const calcDistance = (cord1: coordinate, cord2: coordinate): number => {
  if (cord1.lat == cord2.lat && cord1.lon == cord2.lon) {
    return 0;
  }

  const radlat1 = (Math.PI * cord1.lat) / 180;
  const radlat2 = (Math.PI * cord2.lat) / 180;

  const theta = cord1.lon - cord2.lon;
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344; //convert miles to km

  return dist;
};

export const getDistanceInMeter = (
  lat: number,
  lng: number,
  position: ILocation,
): string => {
  let c1: coordinate = {lat: lat, lon: lng};
  let c2: coordinate = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  let number = calcDistance(c1, c2);

  const {t} = useTranslation();
  if (number > 1000) {
    return (number / 1000).toFixed(2) + ` ${t('km')}`;
  } else {
    return number.toFixed(2) + ` ${t('m')}`;
  }
};
