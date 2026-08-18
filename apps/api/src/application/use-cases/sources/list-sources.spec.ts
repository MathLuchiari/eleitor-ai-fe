import { describe, expect, it, vi } from 'vitest';

import { Source } from '../../../domain/entities/source.js';
import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

import { ListSourcesUseCase } from './list-sources.js';

describe('ListSourcesUseCase', () => {
  it('should return all sources', async () => {
    const sources = [
      Source.create({
        documentId: 'document-1',
        url: 'https://example.com/source-1',
        title: 'Fonte oficial 1',
        type: 'OFFICIAL_WEBSITE',
        publishedAt: new Date('2023-01-01'),
        publisher: 'Governo Federal',
      }),
      Source.create({
        documentId: 'document-2',
        url: 'https://example.com/source-2',
        title: 'Fonte oficial 2',
        type: 'TSE',
        publishedAt: new Date('2024-01-01'),
        publisher: 'Governo Federal',
      }),
    ];

    const sourceRepository: SourceRepository = {
      findById: vi.fn(),
      findByDocumentId: vi.fn(),
      findAll: vi.fn().mockResolvedValue(sources),
      create: vi.fn(),
    };

    const useCase = new ListSourcesUseCase(sourceRepository);

    const result = await useCase.execute();

    expect(result).toEqual(sources);
    expect(sourceRepository.findAll).toHaveBeenCalledTimes(1);
  });
});