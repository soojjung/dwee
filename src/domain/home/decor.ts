export const PHOTO_COUNTS = [1, 2, 4] as const;
export type PhotoCount = (typeof PHOTO_COUNTS)[number];

export const MAX_PHOTO_SLOTS = 4;
export const PHOTO_SLOTS = [0, 1, 2, 3] as const;
export type PhotoSlot = (typeof PHOTO_SLOTS)[number];

export const TEXT_POSITIONS = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;
export type TextPosition = (typeof TEXT_POSITIONS)[number];

export const MAIN_TEXT_MAX = 40;
export const SUB_TEXT_MAX = 20;

export const DEFAULT_TEXT_POSITION: TextPosition = 'bottomLeft';

export const TEXT_ORDERS = ['mainFirst', 'subFirst'] as const;
export type TextOrder = (typeof TEXT_ORDERS)[number];
export const DEFAULT_TEXT_ORDER: TextOrder = 'mainFirst';
