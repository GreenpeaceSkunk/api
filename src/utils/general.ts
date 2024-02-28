import { DomainType } from "greenpeace";

type DomainUrlType = {domain: string, country: DomainType};

export const getCountryByReferer = (referer = ''): DomainType | any => {
  referer = referer.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0].split('?')[0];

  const topLevelDomain = ['ar', 'cl', 'co'].find((value: string) => {
    const validTopLevelDomain = referer.match(new RegExp(`\\b${value}\/?\\b`));
    if(validTopLevelDomain) return validTopLevelDomain;
  });

  if(typeof topLevelDomain === 'undefined') {
    const validDomains: Array<DomainUrlType> = [
      {
        domain: 'votaporlosbosques.org',
        country: 'ar',
      },
      {
        domain: 'salvalasleyesambientales.org',
        country: 'ar',
      }
    ];

    const validTopLevelDomain = validDomains.find((value: DomainUrlType) => {
      if(value.domain.includes(referer)) {
        return value.country
      }
    });

    if(validTopLevelDomain?.country) return validTopLevelDomain?.country;

    return null;
  }

  return topLevelDomain;
}
