import dayjs from "dayjs";
import { fromTime } from "./store";
import { toast } from "@zerodevx/svelte-toast";

export const generateDate = (
	month = dayjs().month(),
	year = dayjs().year()
) => {
	const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
	const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

	const arrayOfDate = [];

	// create prefix date
	for (let i = 0; i < firstDateOfMonth.day(); i++) {
		const date = firstDateOfMonth.day(i);

		arrayOfDate.push({
			currentMonth: false,
			date,
		});
	}

	// generate current date
	for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
		arrayOfDate.push({
			currentMonth: true,
			date: firstDateOfMonth.date(i),
			today:
				firstDateOfMonth.date(i).toDate().toDateString() ===
				dayjs().toDate().toDateString(),
		});
	}

	const remaining = 42 - arrayOfDate.length;

	for (
		let i = lastDateOfMonth.date() + 1;
		i <= lastDateOfMonth.date() + remaining;
		i++
	) {
		arrayOfDate.push({
			currentMonth: false,
			date: lastDateOfMonth.date(i),
		});
	}
	return arrayOfDate;
};

/**
 * @param {string | number | dayjs.Dayjs | Date | null | undefined} dateString
 * @param {string | number | dayjs.Dayjs | Date | null | undefined} timeString
 */
export function formatDateTime(dateString, timeString) {
	console.log("time string: ", timeString)
	const formatDate = 'YYYY-MM-DD';
	const formatTime = 'hh:mm A';
	const supabaseFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ'; // Supabase timestamp format

	// Example date and time strings
	// const dateString = '2024-02-16';
	// const timeString = '12:02 PM';

	// Parse date and time
	const parsedDate = dayjs(dateString, formatDate);
	const parsedTime = dayjs(`2000-01-01 ${timeString}`, formatTime);
	// console.log("parsed time: ", parsedTime)

	// Combine date and time
	// @ts-ignore
	// const combinedDateTime = parsedDate.set({
	// 	hour: parsedTime.hour(),
	// 	minute: parsedTime.minute(),
	// 	second: 0,
	// 	millisecond: 0,
	// });

	const combinedDateTime = parsedDate.set("hour", parsedTime.hour()).set("minute", parsedTime.minute())

	// Get the user's current timezone
	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	console.log("timezone: ", userTimeZone)

	// Adjust the timestamp to the user's timezone
	const adjustedDateTime = combinedDateTime.utcOffset();

	console.log("adjusted time: ", adjustedDateTime)

	// Format as Supabase timestamp
	const supabaseTimestamp = combinedDateTime.format(supabaseFormat);

	console.log('Supabase Timestamp:', supabaseTimestamp);

	return supabaseTimestamp

}

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];