import { ApolloError, ValidationError } from "apollo-server-express";
import { AnagramAPI } from "../data/anagram";
const resolverFunctions = {
  Query: {
    async Anagram_checkAnagram(_: any, args: any, context: any) {
      try {
        const input: any = JSON.parse(JSON.stringify(args));
        const anagramAPI = new AnagramAPI();
        const result = await anagramAPI.checkAnagram(
          input.anagramRequest.anagramText
        );
        return result;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    async Anagram_getTop10Anagrams(_: any, args: any, context: any) {
      try {
        const input: any = JSON.parse(JSON.stringify(args));
        const anagramAPI = new AnagramAPI();
        const result = await anagramAPI.getTop10Anagrams();
        return result;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
};

export default resolverFunctions;
