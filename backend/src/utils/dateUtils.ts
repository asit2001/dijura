import { isAfter, isToday, isValid, parseISO } from 'date-fns';

export const isDateAfterAndEqualToday = (date: string) => {
	const parseDate = parseISO(date);
	if (isValid(parseDate) && (isAfter(parseDate, new Date()) || isToday(parseDate))) {
		return true;
	}
	return false;
};
