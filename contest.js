// Q1. Generate Tag for Video Caption
/* Example 1:

Input: caption = "Leetcode daily streak achieved"

Output: "#leetcodeDailyStreakAchieved"

Explanation:

The first letter for all words except "leetcode" should be capitalized.

Example 2:

Input: caption = "can I Go There"

Output: "#canIGoThere"

Explanation:

The first letter for all words except "can" should be capitalized.
*/
var generateTag = function (caption) {
  const words = caption.split(" ");
  const filteredWords = words.filter((word) => word.length > 0);
  const camelCaseParts = filteredWords.map((word, index) => {
    if (index === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  });
  const camelCaseString = camelCaseParts.join("");
  const filteredString = camelCaseString.replace(/[^a-zA-Z]/g, "");
  let result = "#" + filteredString;
  if (result.length > 100) {
    result = result.substring(0, 100);
  }
  return result;
};
