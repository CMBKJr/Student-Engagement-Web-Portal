// transform-only.js (ESM)
import pkg from "rss-to-json";
import * as cheerio from "cheerio";
import { htmlToText } from "html-to-text";
import he from "he";
import { eventModel } from "./model/eventModel.js";
import { transporter } from "./config/emailConfig.js";
// import { ingestRss } from "./controller/eventController.js";

const { parse } = pkg;

function extractExternalId(item = {}) {
  if (item.guid && String(item.guid).trim()) return String(item.guid).trim();
  const m = (item.link || "").match(/\/event\/(\d+)/i);
  return m ? m[1] : item.link || null;
}

const toPlain = (html) =>
  he.decode(
    htmlToText(html || "", {
      wordwrap: false,
      selectors: [{ selector: "a", options: { ignoreHref: true } }],
    })
      .replace(/\s+/g, " ")
      .trim()
  );

function parseDetails(html) {
  const $ = cheerio.load(html || "");
  const startISO =
    $("time.dt-start, time.dtstart").attr("datetime") ||
    $("time[datetime]").first().attr("datetime") ||
    "";
  const endISO =
    $("time.dt-end, time.dtend").attr("datetime") ||
    $("time[datetime]").eq(1).attr("datetime") ||
    "";
  const location = $(".p-location, .location").text().trim();
  const descriptionText =
    $(".p-description, .description").text().trim() || $.text().trim();

  return {
    startAt: startISO ? new Date(startISO) : null,
    endsAt: endISO ? new Date(endISO) : null,
    location,
    descriptionText: toPlain(descriptionText || html || ""),
  };
}

export async function transformRssToEventsArray() {
  const feed = await parse(
    "https://owllife.kennesaw.edu/organization/ccse/events.rss"
  );

  return (feed.items || []).map((item) => {
    const d = parseDetails(item.description);
    const cat2 = Array.isArray(item.category) ? item.category[1] : null;
    const displayLocation = [d.location, cat2].filter(Boolean).join(" | ");
    return {
      externalId: extractExternalId(item),
      title: item.title || "",
      description: d.descriptionText || "",
      flyerUrl: item?.enclosures?.[0]?.url || "",
      location: displayLocation,
      startAt: d.startAt ?? (item.published ? new Date(item.published) : null),
      endsAt: d.endsAt ?? null,
      capacity: null,
      categories: Array.isArray(item.category) ? item.category : [],
      externalLink: item.link || "",
    };
  });
}


export async function ingestRssAlone() {
  const eventsFromRss = await transformRssToEventsArray();
  let createdCount = 0;
  let skippedCount = 0;

  for (const eventData of eventsFromRss) {
    if (!eventData.externalId) {
      console.warn(
        "Skipping event due to missing externalId in RSS item:",
        eventData.title
      );
      skippedCount++;
      continue;
    }

    const existingEvent = await eventModel.findOne({
      externalId: eventData.externalId,
    });

    if (existingEvent) {
      skippedCount++;
      continue;
    }

    try {
      const {
        title,
        description,
        location,
        flyerUrl,
        startAt,
        endsAt,
        capacity,
        externalId,
        categories,
      } = eventData;

      const newEvent = await eventModel.create({
        title,
        description,
        location,
        flyerUrl,
        startAt,
        endsAt,
        capacity,
        externalId,
        categories,
      });

      if (newEvent) {
        createdCount++;
        console.log(`Successfully created new event: ${newEvent.title}`);
      }
    } catch (error) {
      console.error(
        `Error creating event ${eventData.title} with externalId ${eventData.externalId}:`,
        error.message
      );
    }
  }

  // --- Email Notification ---
  try {
    const today = new Date();
    const todayString = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    await transporter.sendMail({
      from: `"Student Engagement Web Portal " <${process.env.EMAIL_USER}>`,
      to: "ezeobiekene7@gmail.com",
      subject: "RSS Daily Ingestion",
      html: `
          <h3>Hello Admin,</h3>
          <p>RSS Ingestion for ${todayString} Complete. Created: ${createdCount}, Skipped: ${skippedCount}</p>
        `,
    });
  } catch (error) {
    console.error("Email send error:", error);
  }

  return {
    message: "RSS Sync Complete.",
    created: createdCount,
    skipped: skippedCount,
  };
}

// ingestRssAlone()
