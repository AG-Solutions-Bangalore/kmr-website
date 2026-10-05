import edibleOil from '@/assets/category/edible_oil_image.png';
import coconutOil from '@/assets/category/coconut_oil_image.png';
import pulses from '@/assets/category/pulses_image.png';
import gnSeed from '@/assets/category/GN_Seed_image.png';
import ricePaddy from '@/assets/category/richAndpaddy_image.png';
import kirana from '@/assets/category/kirana_image.png';
import spices from '@/assets/category/spices_image.png';
import dryFruits from '@/assets/category/dryFruits_image.png';
import arecanut from '@/assets/category/Arcanut_image.png';
import type { Category } from '../types';

/**
 * Static categories shown when the getCategory API has no rows
 * (loading / error / empty). Matches the original home section data.
 */
export const FALLBACK_CATEGORIES: Category[] = [
  { id: 'edible-oil', name: 'Edible Oil', image: edibleOil },
  { id: 'coconut-oil', name: 'Coconut Oil', image: coconutOil },
  { id: 'pulses', name: 'Pulses', image: pulses },
  { id: 'gn-seed', name: 'GN Seed', image: gnSeed },
  { id: 'rice-paddy', name: 'Rice & Paddy', image: ricePaddy },
  { id: 'kirana', name: 'Kirana', image: kirana },
  { id: 'spices', name: 'Spices', image: spices },
  { id: 'dry-fruits', name: 'Dry Fruits', image: dryFruits },
  { id: 'arecanut', name: 'Arecanut', image: arecanut },
];
