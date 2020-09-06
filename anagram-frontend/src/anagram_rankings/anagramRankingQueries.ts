import gql from "graphql-tag";
export const GET_TOP10ANAGRAMS = gql`
  query getAnagramTop10 {
    Anagram_getTop10Anagrams {
      top10 {
        anagramText
        anagramCheckingCount
      }
      timestamp
    }
  }
`;
