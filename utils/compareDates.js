export const compareDates = (commentA, commentB) => {
	const dateA = new Date(commentA.data.createDate);
	const dateB = new Date(commentB.data.createDate);
	return dateB - dateA; // Sort descending (new to old). If need to sort by growth: return dateA - dateB;
};
