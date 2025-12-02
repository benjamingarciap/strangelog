// utils/formatCategory.ts
export function formatCategory(cat: string): string {
  // Handle CE_ prefix: keep CE + number together, format rest if present
  const ceMatch = cat.match(/^(CE)_(\d+)(?:_(.*))?$/)
  if (ceMatch) {
    const [, prefix, number, rest] = ceMatch
    if (!rest) return `${prefix}${number}` // CE1, CE2, etc.
    const formattedRest = rest
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return `${prefix}${number} ${formattedRest}`
  }

  // Handle UAP_ prefix: remove it
  if (cat.startsWith('UAP_')) {
    const rest = cat.replace(/^UAP_/, '')
    return rest
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
  }

  // Fallback for other categories
  return cat
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
