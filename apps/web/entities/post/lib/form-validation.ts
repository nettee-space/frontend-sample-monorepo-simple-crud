import { ERROR_MESSAGES } from '@/entities/post/';

export const validateFormField = (
  value: FormDataEntryValue | null,
  fieldName: 'title' | 'content' | 'author'
): string => {
  if (typeof value !== 'string') {
    throw new Error(ERROR_MESSAGES.INVALID_TYPE);
  }

  if (!value.trim()) {
    const errorKey =
      `REQUIRED_${fieldName.toUpperCase()}` as keyof typeof ERROR_MESSAGES;
    throw new Error(ERROR_MESSAGES[errorKey]);
  }

  return value;
};
