import { bookCategories, bookVersions } from "../data/selectData";

export const getCategoryLabel = (categoryId) => {
  const category = bookCategories?.find((cat) => cat.id == categoryId);
  return category ? category.label : "";
};

export const getOldVersionLabel = (versionId) => {
  const version = bookVersions?.find((ver) => ver.id == versionId);
  return version ? version.label : "";
};
