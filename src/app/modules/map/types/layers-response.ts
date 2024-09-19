import { Layer } from './layer';

export interface LayersResponse {
  details: string;
  message: string;
  results: Layer[];
  status: string;
  success: boolean;
}
