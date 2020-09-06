import { ApolloError, ValidationError } from "apollo-server-express";
import { AnagramAPI } from "../data/anagram";
import { isAnagram } from "./anagramChecker";
const resolverFunctions = {
  Query: {
    async Anagram_checkAnagram(_: any, args: any, context: any) {
      try {
        const input: any = JSON.parse(JSON.stringify(args));
        //checking anagram
        const anagramCheckingResult: boolean = isAnagram(
          input.anagramRequest.anagramTextA,
          input.anagramRequest.anagramTextB
        );

        //update anagram ranking
        if (anagramCheckingResult === true) {
          const anagramAPI = new AnagramAPI();
          await anagramAPI.storeAnagram(
            input.anagramRequest.anagramTextA,
            input.anagramRequest.anagramTextB
          );
        }

        //return result
        return {
          isAnagram: anagramCheckingResult,
          originalTextA: input.anagramRequest.anagramTextA,
          originalTextB: input.anagramRequest.anagramTextB,
        };
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
