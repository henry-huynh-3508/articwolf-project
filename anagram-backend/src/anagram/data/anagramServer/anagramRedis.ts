const redis = require("async-redis");
import {
  anagram_port,
  anagram_endpoint,
} from "../../../../keys/aws-redis-endpoint.json";
const ANAGRAM_REDIS_KEY = "anagram_rankings";

export class RedisAnagramAPI {
  private key: string = ANAGRAM_REDIS_KEY;
  private redis: any;
  constructor(key?: string) {
    if (key !== undefined) {
      this.key = key;
    }
    this.redis = redis.createClient(anagram_port, anagram_endpoint);
  }
  /**
   * Store anagram into redis
   */
  public async storeAnagram(anagram: string) {
    try {
      const result = await this.redis.zincrby([this.key, 1, anagram]);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Get top 10 anagrams from redis
   */
  public async getTop10Anagram() {
    const MIN_RANK = 0;
    const MAX_RANK = 10;
    try {
      const result = await this.redis.zrevrange([
        this.key,
        MIN_RANK,
        MAX_RANK,
        "WITHSCORES",
      ]);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
