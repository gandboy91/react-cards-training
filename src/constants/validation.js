export const MIN_TITLE_LENGTH = 2;
export const MAX_TITLE_LENGTH = 20;
export const MIN_TEXT_LENGTH = 3;
export const MAX_TEXT_LENGTH = 200;

export const validateTitle = title => title.length > MIN_TITLE_LENGTH
export const validateText = text => text.length > MIN_TEXT_LENGTH