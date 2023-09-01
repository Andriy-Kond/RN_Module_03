// Функція для порівняння дат в об'єктах коментарів
export const compareDates = (commentA, commentB) => {
	const dateA = new Date(commentA.data.createDate);
	const dateB = new Date(commentB.data.createDate);
	return dateB - dateA; // Сортувати за спаданням (від нового до старого)
	// Якщо ви хочете сортувати за зростанням, то поміняйте на: return dateA - dateB;
};
// TODO відобразити у постах і профілі
