export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const navigateUrl = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const getOriginalPrice = (
  discountPercent: number,
  discountedAmount: number
): number => {
  return discountedAmount / (1 - discountPercent / 100);
};
