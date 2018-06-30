export interface StrainEffect {
  name: string;
  effectType: EffectType,
  magnitude: number
}

export enum EffectType {
  MEDICAL, POSITIVE, NEGATIVE
}

export const STRAIN_EFFECT_NAMES = [
  "Happy", "Relaxed", "Euphoric", "Uplifted", "Giggly", "Energetic", "Sleepy", "Focused", "Creative", "Hungry", "Stress",
  "Insomnia", "Depression", "Pain", "Lack Of Appetite", "Fatigue", "Headaches", "Nausia", "Dry Mouth", "Dry Eyes", "Anxious",
  "Paranoid", "Dizzy", "Headache", "Hungry"
];

export const EFFECT_TYPE_BY_STRAIN_EFFECT_NAME = {
  "Happy": EffectType.POSITIVE,
  "Relaxed": EffectType.POSITIVE,
  "Euphoric": EffectType.POSITIVE,
  "Uplifted": EffectType.POSITIVE,
  "Giggly": EffectType.POSITIVE,
  "Energetic": EffectType.POSITIVE,
  "Sleepy": EffectType.POSITIVE,
  "Focused": EffectType.POSITIVE,
  "Creative": EffectType.POSITIVE,
  "Hungry": EffectType.POSITIVE,
  "Stress": EffectType.MEDICAL,
  "Insomnia": EffectType.MEDICAL,
  "Depression": EffectType.MEDICAL,
  "Pain":EffectType.MEDICAL,
  "Lack Of Appetite":EffectType.MEDICAL,
  "Fatigue": EffectType.MEDICAL,
  "Headaches": EffectType.MEDICAL,
  "Nausia": EffectType.MEDICAL, //TODO: typo: Nausea
  "Dry Mouth": EffectType.NEGATIVE,
  "Dry Eyes": EffectType.NEGATIVE,
  "Anxious": EffectType.NEGATIVE,
  "Paranoid": EffectType.NEGATIVE,
  "Dizzy": EffectType.NEGATIVE,
  "Headache": EffectType.NEGATIVE
};
