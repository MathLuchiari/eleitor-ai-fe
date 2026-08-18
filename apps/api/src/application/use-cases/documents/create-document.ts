import { Document, type DocumentType } from '../../../domain/entities/document.js';
import { type DocumentRepository } from '../../../domain/repositories/document-repository.js';

interface CreateDocumentInput {
  governmentPlanId: string;
  title: string;
  type: DocumentType;
  content: string;
}

export class CreateDocumentUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(input: CreateDocumentInput): Promise<Document> {
    const document = Document.create(input);

    await this.documentRepository.create(document);

    return document;
  }
}