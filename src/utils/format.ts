/**
 * Format a number as Indonesian Rupiah currency.
 */
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format a date as a human-readable string.
 */
export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

/**
 * Truncate a string to a given length with ellipsis.
 */
export const truncate = (str: string, length: number = 120): string =>
  str.length <= length ? str : str.slice(0, length).trimEnd() + '…'
