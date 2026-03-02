import { getDb } from '../config/db.js';
import { randomUUID } from 'crypto';

// JSON Schema validator for MongoDB collection-level validation
export const chatValidator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['sessionId', 'articleId', 'messages'],
    properties: {
      sessionId: {
        bsonType: 'string',
        minLength: 1,
        description: 'Unique session identifier is required',
      },
      articleId: {
        bsonType: 'objectId',
        description: 'Reference to the parent article (_id) is required',
      },
      articleTitle: {
        bsonType: 'string',
        description: 'Denormalized article title for display without a join',
      },
      messages: {
        bsonType: 'array',
        description: 'Ordered list of chat messages',
        items: {
          bsonType: 'object',
          required: ['id', 'text', 'isUser', 'timestamp'],
          properties: {
            id: {
              bsonType: 'string',
              description: 'Unique message identifier',
            },
            text: {
              bsonType: 'string',
              minLength: 1,
              description: 'Message text content',
            },
            isUser: {
              bsonType: 'bool',
              description: 'true = sent by user, false = sent by AI',
            },
            timestamp: {
              bsonType: 'date',
              description: 'When the message was sent',
            },
          },
        },
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

// Indexes for the chats collection
export const chatIndexes = [
  // Look up all chats for a session, ordered chronologically
  {
    key: { sessionId: 1, createdAt: -1 },
    name: 'sessionId_createdAt',
  },
  // Look up all chats linked to an article, ordered chronologically
  {
    key: { articleId: 1, createdAt: -1 },
    name: 'articleId_createdAt',
  },
  // Fast single-session lookup (most common query pattern)
  {
    key: { sessionId: 1 },
    name: 'sessionId',
  },
];

// Returns the chats collection handle
export function getChatsCollection() {
  return getDb().collection('chats');
}

// Builds a new message sub-document
export function buildMessage({ text, isUser }) {
  return {
    id: randomUUID(),
    text,
    isUser,
    timestamp: new Date(),
  };
}

// Builds a new chat session document
export function buildChat({ sessionId, articleId, articleTitle = null, initialMessage = null }) {
  const now = new Date();
  const messages = initialMessage ? [buildMessage(initialMessage)] : [];
  return {
    sessionId,
    articleId,
    articleTitle,
    messages,
    createdAt: now,
    updatedAt: now,
  };
}
