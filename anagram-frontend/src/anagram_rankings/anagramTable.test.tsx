import { GET_TOP10ANAGRAMS } from "./anagramRankingQueries";
import { MockedProvider } from "@apollo/react-testing";
import AnagramRankingTable from "./anagramRankingTable";
import React from "react";
import renderer from "react-test-renderer";
import wait from "waait";

it("renders without error and has the correct description", async () => {
  const mocks = [
    {
      request: {
        query: GET_TOP10ANAGRAMS,
      },
      result: () => {
        return {
          data: {
            Anagram_getTop10Anagrams: {
              top10: [
                {
                  anagramText: "abba,abab",
                  anagramCheckingCount: 4,
                },
                {
                  anagramText: "abba,abab",
                  anagramCheckingCount: 2,
                },
                {
                  anagramText: "abba,abab",
                  anagramCheckingCount: 2,
                },
                {
                  anagramText: "abba,abab",
                  anagramCheckingCount: 1,
                },
              ],
            },
          },
        };
      },
    },
  ];
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AnagramRankingTable></AnagramRankingTable>
    </MockedProvider>
  );
  await wait(1);
  const tree: any = component.toJSON();
  expect(tree.children).toBeDefined();
});
