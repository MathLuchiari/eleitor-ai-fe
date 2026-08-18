import { type Source } from '../../../domain/entities/source.js';
import { type SourceRepository } from '../../../domain/repositories/source-repository.js';

export class GetSourceUseCase {
  constructor(private readonly sourceRepository: SourceRepository) {}

  async execute(id: string): Promise<Source | null> {
    return this.sourceRepository.findById(id);
  }
}