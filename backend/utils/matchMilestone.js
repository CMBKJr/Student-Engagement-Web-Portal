import levenshtein from "js-levenshtein";

// Normalize text for comparison
const normalize = (str) =>
  str.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

export const findMatchingMilestone = async (event, MilestoneModel) => {
  const { title: eventTitle, associatedMilestone } = event;
  const cleanTitle = normalize(eventTitle);


  if (associatedMilestone) {
    const milestone = await MilestoneModel.findById(associatedMilestone).lean();
    if (milestone) return milestone;
  }

  const milestones = await MilestoneModel.find().lean();

  for (const milestone of milestones) {
    for (const keyword of milestone.autoKeywords) {
      if (cleanTitle.includes(normalize(keyword))) {
        return milestone;
      }
    }

    const similarity =
      1 -
      levenshtein(cleanTitle, normalize(milestone.title)) /
        Math.max(cleanTitle.length, milestone.title.length);

    if (similarity >= 0.6) {
      return milestone;
    }
  }

  return null;
};
