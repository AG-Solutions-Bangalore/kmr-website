import { webImage } from '@/lib/web-images';
import type { Category } from '../types';

const edibleOil = webImage('category/edible_oil_image.webp');
const coconutOil = webImage('category/coconut_oil_image.webp');
const pulses = webImage('category/pulses_image.webp');
const gnSeed = webImage('category/GN_Seed_image.webp');
const ricePaddy = webImage('category/richAndpaddy_image.webp');
const kirana = webImage('category/kirana_image.webp');
const spices = webImage('category/spices_image.webp');
const dryFruits = webImage('category/dryFruits_image.webp');
const arecanut = webImage('category/Arcanut_image.webp');

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
