import { describe, expect, it, vi } from 'vitest';

import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

import { CreateSourceUseCase } from './create-source.js';

describe('CreateSourceUseCase', () => {
  it('should create a source', async () => {
    const sourceRepository: SourceRepository = {
      findById: vi.fn(),
      findByDocumentId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn().mockResolvedValue(undefined),
    };

    const useCase = new CreateSourceUseCase(sourceRepository);

    const input = {
      documentId: 'document-1',
      title: 'TSE - Eleições 2026',
      url: 'https://www.tse.jus.br/',
      publisher: 'Tribunal Superior Eleitoral',
      type: 'TSE' as const,
    };

    const result = await useCase.execute(input);

    expect(result).toMatchObject(input);
    expect(result.id).toBeDefined();
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(sourceRepository.create).toHaveBeenCalledWith(result);
  });
});