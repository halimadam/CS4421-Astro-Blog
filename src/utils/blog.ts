type SortableBlogPost = {
	data: {
		featured?: boolean;
		pubDate: Date;
	};
};

export function sortBlogPosts<T extends SortableBlogPost>(posts: readonly T[]): T[] {
	return [...posts].sort(
		(a, b) =>
			Number(b.data.featured === true) - Number(a.data.featured === true) ||
			b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
}
