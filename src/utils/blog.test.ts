import { describe, expect, it } from 'vitest';
import { sortBlogPosts } from './blog';

describe('sortBlogPosts', () => {
	it('puts featured posts first and sorts each group newest first', () => {
		const posts = [
			{ id: 'older', data: { pubDate: new Date('2026-10-19') } },
			{ id: 'featured-older', data: { featured: true, pubDate: new Date('2026-10-18') } },
			{ id: 'newest', data: { pubDate: new Date('2026-10-22') } },
			{ id: 'featured-newer', data: { featured: true, pubDate: new Date('2026-10-20') } },
		];

		expect(sortBlogPosts(posts).map((post) => post.id)).toEqual([
			'featured-newer',
			'featured-older',
			'newest',
			'older',
		]);
	});
});
