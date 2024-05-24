/**
  Use these padding for margins/paddings and other whitespace throughout your app.
 */
export const padding = {
  padding_2: 2,
  padding_4: 4,
  padding_6: 6,
  padding_7: 7,
  padding_8: 8,
  padding_9: 9,
  padding_10: 10,
  padding_12: 12,
  padding_14: 14,
  padding_16: 16,
  padding_18: 18,
  padding_20: 20,
  padding_24: 24,
  padding_32: 32,
  padding_48: 48,
  padding_64: 64,
  padding_66: 66,
} as const;

export type Padding = keyof typeof padding;
