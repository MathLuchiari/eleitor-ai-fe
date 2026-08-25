import { type Document } from '../../domain/entities/document.js';

export function documentResponse(document: Document) {
  return {
    id: document.id,
    governmentPlanId: document.governmentPlanId,
    title: document.title,
    type: document.type,
    content: document.content,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  };
}
