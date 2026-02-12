import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notionToken = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

let notionClient;
let notionMarkdown;

if (notionToken) {
  notionClient = new Client({ auth: notionToken });
  notionMarkdown = new NotionToMarkdown({ notionClient });
} else {
  console.warn(
    "Missing NOTION_TOKEN environment variable. Blog content will not be loaded."
  );
}

const requiredEnvMissing = () => {
  return !notionToken || !databaseId;
};

const ensureNotionConfigured = () => {
  if (requiredEnvMissing()) {
    throw new Error(
      "Notion blog integration requires NOTION_TOKEN and NOTION_DATABASE_ID environment variables."
    );
  }
};

const mapPostProperties = (page) => {
  const { properties } = page;
  const title =
    properties?.Name?.title?.[0]?.plain_text || "Untitled";

  const slug =
    properties?.Slug?.rich_text?.[0]?.plain_text ||
    properties?.Slug?.title?.[0]?.plain_text ||
    page.id.replace(/-/g, "");

  const description =
    properties?.Description?.rich_text?.[0]?.plain_text || "";

  const tags =
    properties?.Tags?.multi_select?.map((tag) => tag.name) || [];

  const date =
    properties?.Date?.date?.start || page.created_time;

  const published =
    properties?.Published?.checkbox ?? true;

  const cover =
    page.cover?.external?.url ||
    page.cover?.file?.url ||
    null;

  return {
    id: page.id,
    title,
    slug,
    description,
    tags,
    date,
    published,
    cover,
  };
};

export const getPublishedPosts = async ({ includeDrafts = false } = {}) => {
  ensureNotionConfigured();

  const filter = includeDrafts
    ? undefined
    : {
        property: "Published",
        checkbox: {
          equals: true,
        },
      };

  let response;

  try {
    response = await notionClient.databases.query({
      database_id: databaseId,
      filter,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });
  } catch (error) {
    if (filter && error.code === "validation_error") {
      response = await notionClient.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "Date",
            direction: "descending",
          },
        ],
      });
    } else {
      throw error;
    }
  }

  const posts = response.results.map(mapPostProperties);
  return includeDrafts ? posts : posts.filter((post) => post.published);
};

export const getPostBySlug = async (slug) => {
  ensureNotionConfigured();

  const response = await notionClient.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (!response.results.length) {
    return null;
  }

  const page = response.results[0];
  const postMeta = mapPostProperties(page);

  const mdBlocks = await notionMarkdown.pageToMarkdown(page.id);
  const markdown = notionMarkdown.toMarkdownString(mdBlocks);

  return {
    ...postMeta,
    markdown,
  };
};

export const listPostSlugs = async () => {
  ensureNotionConfigured();
  const posts = await getPublishedPosts({ includeDrafts: true });
  return posts.map((post) => ({ slug: post.slug }));
};

export const isNotionConfigured = () => !requiredEnvMissing();
