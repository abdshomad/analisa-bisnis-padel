import type { InvestmentTier } from '../types';
import { standardOutdoorTier } from './investment/standardOutdoor';
import { premiumOutdoorTier } from './investment/premiumOutdoor';
import { premiumIndoorTier } from './investment/premiumIndoor';

export const investmentData: InvestmentTier[] = [
  standardOutdoorTier,
  premiumOutdoorTier,
  premiumIndoorTier,
];
