export const isUserLikedPost = (usersLikedPost, currentUser) => {
	const isUser = usersLikedPost.includes(currentUser);
	return isUser;
};
