import { describe, expect, it, vi } from 'vitest';

import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

import { ListSourcesByDocumentUseCase } from './list-sources-by-document.js';

describe('ListSourcesByDocumentUseCase', () => {
  it('should return sources by document', async () => {
    const documentId = 'document-1';

    const sources: any[] = [];

    const sourceRepository: SourceRepository = {
      findById: vi.fn(),
      findByDocumentId: vi.fn().mockResolvedValue(sources),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new ListSourcesByDocumentUseCase(sourceRepository);

    const result = await useCase.execute(documentId);

    expect(result).toEqual(sources);
    expect(sourceRepository.findByDocumentId).toHaveBeenCalledWith(
      documentId,
    );
  });
});