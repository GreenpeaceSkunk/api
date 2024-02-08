import { DomainType } from "greenpeace";

export const getCountryByReferer = (referer = ''): DomainType | undefined => {
  if((referer.match(/\.ar\//) || referer.match(/\.ar/) || '').length) {
    return 'ar';
  }

  if((referer.match(/\.co\//) || referer.match(/\.co/) || '').length) {
    return 'co';
  }
  
  if((referer.match(/\.cl\//) || referer.match(/\.cl/) || '').length) {
    return 'cl';
  }
}
