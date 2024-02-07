import { DomainType } from "greenpeace";

export const getCountryByReferer = (referer = ''): DomainType | undefined => {
  if((referer.match(/\.ar\//) || '').length) {
    return 'ar';
  }

  if((referer.match(/\.co\//) || '').length) {
    return 'co';
  }

  if((referer.match(/\.cl\//) || '').length) {
    return'cl';
  }
}
