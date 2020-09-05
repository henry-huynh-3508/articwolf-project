/**
 * Simple function to check an anagram
 */
export function isAnagram(stringA: string, stringB: string) {
  const sanitizeString = function (str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z\d]/g, "")
      .split("")
      .sort()
      .join("");
  };
  return sanitizeString(stringA) === sanitizeString(stringB);
}
