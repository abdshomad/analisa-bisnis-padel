import type { AncillaryCategory } from '../types';
import { physicalOpportunities } from './ancillary/physicalOpportunities';
import { digitalOpportunities } from './ancillary/digitalOpportunities';


export const ancillaryData: AncillaryCategory[] = [
  physicalOpportunities,
  digitalOpportunities,
];
