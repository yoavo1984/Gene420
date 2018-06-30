/**
 * Phenome is a group of phenotypes
 */
export interface Phenome {
  creative: number;
  funny: number;
  energetic: number;
  desire: number;
  stimulation: number;
  anxious: number;
  paranoia: number;
  obesity: number;
  narcolepsy: number;
  pain: number;
  dependence: number;
}

export const PHENOTYPE_NAMES = [
  "Creative", "Funny", "Energetic", "Desire", "Stimulation", "Anxious", "Paranoia", "Obesity", "Narcolepsy", "Pain", "Dependence"
];

export const PHENOTYPE = {
  Creative: "creative",
  Funny: "funny",
  Energetic: "energetic",
  Desire: "desire",
  Stimulation: "stimulation",
  Anxious: "anxious",
  Paranoia: "paranoia",
  Obesity: "obesity",
  Narcolepsy: "narcolepsy",
  Pain: "pain",
  Dependence: "dependence"
}

export function createEmptyPhenome():Phenome {
  return {
    "creative": 0,
    "funny": 0,
    "energetic": 0,
    "desire": 0,
    "stimulation": 0,
    "anxious": 0,
    "paranoia": 0,
    "obesity": 0,
    "narcolepsy": 0,
    "pain": 0,
    "dependence": 0
  };
}

