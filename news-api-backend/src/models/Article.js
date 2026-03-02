import { getDb } from '../config/db.js';

export const ARTICLE_CATEGORIES = ['AI', 'Technology', 'Startups', 'Funding', 'Machine Learning'];

// JSON Schema validator for MongoDB collection-level validation
export const articleValidator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['title', 'sourceUrl', 'publisherName', 'authorName', 'datePosted', 'category'],
    properties: {
      title: {
        bsonType: 'string',
        minLength: 1,
        description: 'Article title is required',
      },
      coverImage: {
        bsonType: 'string',
        description: 'URL to the article cover image',
      },
      publisherName: {
        bsonType: 'string',
        minLength: 1,
        description: 'Publisher name is required',
      },
      publisherLogo: {
        bsonType: 'string',
        description: 'URL to the publisher logo',
      },
      authorName: {
        bsonType: 'string',
        minLength: 1,
        description: 'Author name is required',
      },
      datePosted: {
        bsonType: 'date',
        description: 'Publication date is required',
      },
      sourceUrl: {
        bsonType: 'string',
        pattern: '^https?://',
        description: 'Source URL must be a valid http/https URL and is required',
      },
      originalContent: {
        bsonType: 'string',
        description: 'Raw original article content',
      },
      category: {
        bsonType: 'string',
        enum: ARTICLE_CATEGORIES,
        description: `Category must be one of: ${ARTICLE_CATEGORIES.join(', ')}`,
      },
      // AI-processed fields
      quickSummary: {
        bsonType: 'string',
        description: 'Short AI-generated summary (1-2 sentences)',
      },
      detailedSummary: {
        bsonType: 'string',
        description: 'Full AI-generated detailed summary',
      },
      whyItMatters: {
        bsonType: 'string',
        description: 'AI-generated explanation of significance',
      },
      createdAt: {
        bsonType: 'date',
      },
      updatedAt: {
        bsonType: 'date',
      },
    },
  },
};

// Indexes for the articles collection
export const articleIndexes = [
  // Unique index on sourceUrl to prevent duplicate articles
  {
    key: { sourceUrl: 1 },
    name: 'sourceUrl_unique',
    unique: true,
  },
  // Compound index for browsing articles by category, newest first
  {
    key: { category: 1, datePosted: -1 },
    name: 'category_datePosted',
  },
  // Index for fetching the latest articles across all categories
  {
    key: { datePosted: -1 },
    name: 'datePosted_desc',
  },
  // Partial index to quickly query articles that have been AI-processed
  {
    key: { category: 1, createdAt: -1 },
    name: 'category_createdAt',
    partialFilterExpression: { quickSummary: { $exists: true } },
  },
];

// Returns the articles collection handle
export function getArticlesCollection() {
  return getDb().collection('articles');
}

// Builds a new article document with defaults applied
export function buildArticle({
  title,
  coverImage = null,
  publisherName,
  publisherLogo = null,
  authorName,
  datePosted,
  sourceUrl,
  originalContent = null,
  category,
  quickSummary = null,
  detailedSummary = null,
  whyItMatters = null,
}) {
  const now = new Date();
  return {
    title,
    coverImage,
    publisherName,
    publisherLogo,
    authorName,
    datePosted: datePosted instanceof Date ? datePosted : new Date(datePosted),
    sourceUrl,
    originalContent,
    category,
    quickSummary,
    detailedSummary,
    whyItMatters,
    createdAt: now,
    updatedAt: now,
  };
}
