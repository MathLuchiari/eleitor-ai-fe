import { Source } from '../entities/source.js';

export interface SourceRepository {
  findById(id: string): Promise<Source | null>;

  findByDocumentId(documentId: string): Promise<Source[]>;

  findAll(): Promise<Source[]>;

  create(source: Source): Promise<void>;
}