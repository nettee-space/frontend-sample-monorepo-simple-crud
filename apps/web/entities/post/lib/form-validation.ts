import { ERROR_MESSAGES, UpdatePostDTO } from '@/entities/post/';

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

export const getValidatedField = <K extends keyof UpdatePostDTO>(
  formData: FormData,
  field: K
) => {
  const value = formData.get(field);
  return value ? validateFormField(value, field) : undefined;
};
