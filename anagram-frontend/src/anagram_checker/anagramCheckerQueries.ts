import gql from "graphql-tag";
export const CHECK_ANAGRAMS = gql`
  query testGetCityInfo($request: AnagramRequest!) {
    Anagram_checkAnagram(anagramRequest: $request) {
      isAnagram
      originalTextA
      originalTextB
    }
  }
`;
