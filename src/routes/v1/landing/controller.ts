import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getAll = async (): Promise<any> => {
  const result = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/landings.yaml`, 'utf-8'));
  return Promise.resolve(result || []);
}

export const getByName = async (name: string): Promise<any> => {
  const result = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/landings.yaml`, 'utf-8'));
  const landing = result.filter((l: any) => l.name === name);
  return Promise.resolve(landing.length ? landing[0] : {});
}
