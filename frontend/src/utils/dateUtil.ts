export const formateDate = (dateTime: string | number | Date) => {
	const date = new Date(dateTime);

	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: '2-digit' };
	const formatter = new Intl.DateTimeFormat('en-US', options);
	return formatter.format(date);
};
