export const formatDate = (date?: Date): string | undefined => {
    if (!date) return undefined;
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

export const isWithinOneYear = (from: Date, to: Date): boolean => {
    const oneYearMs = 365 * 24 * 60 * 60 * 1000; 
    return to.getTime() - from.getTime() <= oneYearMs;
};
export const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "2-digit" };
    return date.toLocaleDateString("en-US", options);
};