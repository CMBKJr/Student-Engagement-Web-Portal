import levenshtein from "js-levenshtein";

// Normalize text for comparison
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

export const findMatchingMilestone = async (eventTitle, MilestoneModel) => {
  const cleanTitle = normalize(eventTitle);

  const milestones = await MilestoneModel.find().lean();

  for (const milestone of milestones) {
    // 1. Keyword Matching
    for (const keyword of milestone.autoKeywords) {
      if (cleanTitle.includes(normalize(keyword))) {
        return milestone;
      }
    }

    // 2. Partial Title Similarity Match
    const similarity =
      1 -
      levenshtein(cleanTitle, normalize(milestone.title)) /
        Math.max(cleanTitle.length, milestone.title.length);

    if (similarity >= 0.6) {
      return milestone;
    }
  }

  return null; // No match
};
