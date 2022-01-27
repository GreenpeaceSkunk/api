import path from 'path';
import fs from 'fs';
import YAML from 'yaml';

export const getByName = async (name: string): Promise<any> => {
  try {
    const result = await YAML.parse(fs.readFileSync(`${path.resolve('src')}/data/landings/${name}.yaml`, 'utf-8'));
    return Promise.resolve(result);
  } catch(error: any) {
    return Promise.resolve(null);
  }
}
