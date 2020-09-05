import { createTestClient } from "apollo-server-integration-testing";
import { apolloServer } from "../utils";

const MOCK_TEST_CHECKING_ANAGRAM = `
query testAnagramChecking($request: AnagramRequest!) {
  Anagram_checkAnagram(anagramRequest: $request) {
    isAnagram
    originalTextA
    originalTextB
  }
}

`;
const MOCK_TEST_CHECKING_TOP10ANAGRAMS = `
query testAnagramTop10 {
  Anagram_getTop10Anagrams {
    top10 {
      anagramText
      anagramCheckingCount
    }
    timestamp
  }
}

`;
describe("Test Anagram Queries", () => {
  it("tests if a pair of word are anagrams", async () => {
    // create an instance of ApolloServer for testing
    const { query, mutate } = createTestClient({
      apolloServer,
    });
    // test correctness of metadata payload
    const response: any = await query(MOCK_TEST_CHECKING_ANAGRAM, {
      variables: {
        request: {
          anagramTextA: "abba",
          anagramTextB: "abab",
        },
      },
    });
    const anagramResult = response.data.Anagram_checkAnagram;
    expect(anagramResult.isAnagram).toBeTrue();
    expect(anagramResult.originalTextA).toBeDefined();
    expect(anagramResult.originalTextB).toBeDefined();
  });

  it("tests top 10 anagrams list", async () => {
    // create an instance of ApolloServer for testing
    const { query, mutate } = createTestClient({
      apolloServer,
    });
    // test correctness of metadata payload
    const response: any = await query(MOCK_TEST_CHECKING_TOP10ANAGRAMS);
    const anagramResult = response.data.Anagram_getTop10Anagrams;
    expect(anagramResult.top10).toBeDefined();
    expect(anagramResult.timestamp).toBeDefined();
  });
});
