import { Document } from '../entities/document.js';

export interface DocumentRepository {
  findById(id: string): Promise<Document | null>;

  findByGovernmentPlanId(
    governmentPlanId: string,
  ): Promise<Document[]>;

  findAll(): Promise<Document[]>;

  create(document: Document): Promise<void>;
}