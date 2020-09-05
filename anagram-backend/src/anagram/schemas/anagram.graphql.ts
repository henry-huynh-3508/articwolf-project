import { gql } from "apollo-server-express";

const schema = gql`
  """
  Anagram result for checking a word is anagram or not
  """
  type AnagramResult {
    isAnagram: Boolean
    originalText: String
  }

  input AnagramRequest {
    anagramText: String
  }

  """
  Anagram ranking result
  """
  type AnagramTop10 {
    top10: [AnagramItem]
    timestamp: Int
  }
  """
  Detail info for each anagram
  """
  type AnagramItem {
    anagramText: String
    anagramCheckingCount: Int
  }
  #Query
  type Query {
    """
    This query is used to checking a word is anagram or not
    """
    Anagram_checkAnagram(anagramRequest: AnagramRequest): AnagramResult
    """
    This query is used to checking a word is anagram or not
    """
    Anagram_getTop10Anagrams: AnagramTop10
  }
`;
export default schema;
