import React from "react";
import AnagramRankingTable from "../anagram_rankings/anagramRankingTable";
import AnagramChecker from "../anagram_checker/anagramChecker";
/**
 * Main application
 */
function AnagramApp() {
  return (
    <div>
      <AnagramRankingTable></AnagramRankingTable>
      <AnagramChecker></AnagramChecker>
    </div>
  );
}
export { AnagramApp };
