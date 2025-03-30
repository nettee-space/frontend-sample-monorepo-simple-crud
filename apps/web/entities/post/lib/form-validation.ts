import { CreatePostDTO, ERROR_MESSAGES, UpdatePostDTO } from '@/entities/post/';

export const extractFormData = <T extends Record<string, unknown>>(
  formData: FormData,
  fields: Extract<keyof T, string>[]
): Partial<Record<Extract<keyof T, string>, string | null>> => {
  return fields.reduce(
    (acc, field) => {
      acc[field] = formData.get(field) as string | null;
      return acc;
    },
    {} as Partial<Record<Extract<keyof T, string>, string | null>>
  );
};

export const validateFormField = (
  value: FormDataEntryValue | null,
  fieldName: keyof (CreatePostDTO & UpdatePostDTO)
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

export const getValidatedField = <
  K extends keyof (CreatePostDTO & UpdatePostDTO),
>(
  formData: FormData,
  field: K
) => {
  const value = formData.get(field);
  return value ? validateFormField(value, field) : undefined;
};

export function getValidatedFields<T extends CreatePostDTO | UpdatePostDTO>(
  rawData: Partial<Record<keyof T, string | null>>
): T {
  return Object.fromEntries(
    Object.entries(rawData)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [
        key,
        validateFormField(
          value ?? null,
          key as keyof (CreatePostDTO & UpdatePostDTO)
        ),
      ])
  ) as T;
}
