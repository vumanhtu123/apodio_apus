/**
  Use these margin for margins/paddings and other whitespace throughout your app.
 */
export const margin = {
  margin_2: 2,
  margin_4: 4,
  margin_5: 5,
  margin_6: 6,
  margin_7: 7,
  margin_8: 8,
  margin_10: 10,
  margin_12: 12,
  margin_14: 14,
  margin_15: 15,
  margin_16: 16,
  margin_20: 20,
  margin_24: 24,
  margin_30: 30,
  margin_32: 32,
  margin_48: 48,
  margin_64: 64,
  border_top_left_radius: 20,
  border_top_right_radius: 20,
  margin_bottom_modal: 20,
} as const;

export type Margin = keyof typeof margin;
