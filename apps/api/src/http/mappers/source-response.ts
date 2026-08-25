import { type Source } from '../../domain/entities/source.js';

export function sourceResponse(source: Source) {
  return {
    id: source.id,
    documentId: source.documentId,
    title: source.title,
    url: source.url,
    publisher: source.publisher,
    type: source.type,
    publishedAt: source.publishedAt,
    createdAt: source.createdAt,
  };
}
