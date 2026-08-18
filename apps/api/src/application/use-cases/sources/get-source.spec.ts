import { describe, expect, it, vi } from 'vitest';

import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

import { GetSourceUseCase } from './get-source.js';

describe('GetSourceUseCase', () => {
  it('should return a source by id', async () => {
    const source = {
      id: 'source-1',
    };

    const sourceRepository: SourceRepository = {
      findById: vi.fn().mockResolvedValue(source),
      findByDocumentId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new GetSourceUseCase(sourceRepository);

    const result = await useCase.execute(source.id);

    expect(result).toEqual(source);
    expect(sourceRepository.findById).toHaveBeenCalledWith(source.id);
  });

  it('should return null when source does not exist', async () => {
    const sourceRepository: SourceRepository = {
      findById: vi.fn().mockResolvedValue(null),
      findByDocumentId: vi.fn(),
      findAll: vi.fn(),
      create: vi.fn(),
    };

    const useCase = new GetSourceUseCase(sourceRepository);

    const result = await useCase.execute('non-existent-id');

    expect(result).toBeNull();
    expect(sourceRepository.findById).toHaveBeenCalledWith('non-existent-id');
  });
});