export const normalizeTags = (str = "") =>
  str
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .join(", ");

export const splitTags = (str = "") =>
  str
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
