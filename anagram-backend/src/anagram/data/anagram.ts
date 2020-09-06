import { RedisAnagramAPI } from "./anagramServer/anagramRedis";
export class AnagramAPI {
  /**
   * Check anagram
   */
  public async storeAnagram(textA: string, textB: string) {
    const anagramkey = AnagramAPI.generateAnagramKey(textA, textB);
    const redis = new RedisAnagramAPI();
    redis.storeAnagram(anagramkey);
    return;
  }
  /**
   * Return an array of top 10 Anagrams
   */
  public async getTop10Anagrams() {
    const redis = new RedisAnagramAPI();
    const rawresult: any[] = await redis.getTop10Anagram();
    return AnagramAPI.generateAnagramTop10(rawresult);
  }
  /**
   * Generate deteministic key for redis to store
   */
  private static generateAnagramKey(textA: string, textB: string) {
    if (textA < textB) {
      return textA + "," + textB;
    }
    return textB + "," + textA;
  }

  /**
   * Generate top 10 anagram response
   */
  private static generateAnagramTop10(result: any[]) {
    const itemlist = [];
    for (let i = 0; i < result.length; i += 2) {
      const item = {
        anagramText: result[i],
        anagramCheckingCount: result[i + 1],
      };
      itemlist.push(item);
    }
    return {
      top10: itemlist,
      timestamp: Math.floor(new Date().getTime() / 1000),
    };
  }
}
