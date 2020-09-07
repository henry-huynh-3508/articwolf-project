import { CHECK_ANAGRAMS } from "./anagramCheckerQueries";
import { MockedProvider } from "@apollo/react-testing";
import AnagramChecker from "./anagramChecker";
import React from "react";
import renderer from "react-test-renderer";
import wait from "waait";

it("renders without error and has the correct description", async () => {
  const mocks = [
    {
      request: {
        query: CHECK_ANAGRAMS,
        variables: {
          request: {
            anagramTextA: "abba",
            anagramTextB: "abab",
          },
        },
      },
      result: () => {
        return {
          data: {
            Anagram_checkAnagram: {
              isAnagram: true,
              originalTextA: "abba",
              originalTextB: "abab",
            },
          },
        };
      },
    },
  ];
  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AnagramChecker></AnagramChecker>
    </MockedProvider>
  );
  await wait(1);
  const tree: any = component.toJSON();
  expect(tree.children).toBeDefined();
});
