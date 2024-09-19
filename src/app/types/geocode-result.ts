export interface GeocodeResult {
  items: GeocodeItem[];
}
export interface GeocodeItem {
  title: string;
  id: string;
  resultType: string;
  address: GeocodeAddress;
  position: GeoPosition;
  access: GeoPosition[];
  distance: number;
  categories: GeocodeCategory[];
}

export interface GeocodeAddress {
  label: string;
  countryCode: string;
  countryName: string;
  county: string;
  city: string;
  district?: string;
  postalCode?: string;
}

export interface GeoPosition {
  lat: number;
  lng: number;
}

export interface GeocodeCategory {
  id: string;
  name: string;
  primary: boolean;
}
