import { describe, expect, it } from 'vitest';
import { Source } from './source.js';

describe('Source', () => {
  it('should create a source', () => {
    const source = Source.create({
      documentId: 'document-id',
      title: 'Fonte oficial',
      url: 'https://example.com/documento',
      publisher: 'Órgão oficial',
      type: 'OFFICIAL_WEBSITE',
    });

    expect(source.id).toBeDefined();
    expect(source.documentId).toBe('document-id');
    expect(source.title).toBe('Fonte oficial');
    expect(source.url).toBe('https://example.com/documento');
    expect(source.publisher).toBe('Órgão oficial');
    expect(source.type).toBe('OFFICIAL_WEBSITE');
    expect(source.createdAt).toBeInstanceOf(Date);
  });
});