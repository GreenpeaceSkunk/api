import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getCountries = async (): Promise<any> => {
  try {
    const dirName = `${path.resolve('src')}/data/location`;
    return await YAML.parse(fs.readFileSync(`${dirName}/countries.yaml`, 'utf-8'));
  } catch (err) {
    console.log('Error', err);
    return Promise.resolve(null);
  }
}

export const getCities = async (): Promise<any> => {
  try {
    const dirName = `${path.resolve('src')}/data/location`;
    return await YAML.parse(fs.readFileSync(`${dirName}/world-cities.yaml`, 'utf-8'));
  } catch (err) {
    console.log('Error', err);
    return Promise.resolve(null);
  }
}

export const getPlacesByCountry = async (country: string): Promise<any> => {
  try {
    const dirName = `${path.resolve('src')}/data/location/countries`;
    return await YAML.parse(fs.readFileSync(`${dirName}/${country.toLowerCase()}.yaml`, 'utf-8'));
  } catch (err) {
    console.log('Error', err);
    return Promise.resolve(null);
  }
}
