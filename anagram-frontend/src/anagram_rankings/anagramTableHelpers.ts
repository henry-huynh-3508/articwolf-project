/**
 * Simple helpers for parsing raw anagram resposne into anagram rows
 */
interface iAnagramItem {
  rank: number;
  anagrams: string;
  count: number;
}

export function createAnagramItem(
  rank: number,
  anagrams: string,
  count: number
) {
  return {
    rank: rank,
    anagrams: anagrams,
    count: count,
  } as iAnagramItem;
}

export function createAnagramRowData(rawdata: any) {
  const top10: any[] = rawdata.Anagram_getTop10Anagrams.top10;

  return top10.map((item, index) =>
    createAnagramItem(index + 1, item.anagramText, item.anagramCheckingCount)
  );
}
