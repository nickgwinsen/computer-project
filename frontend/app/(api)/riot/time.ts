export const timeAgo = (timestamp: string) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = Date.now();
  const parsedTimestamp = Date.parse(timestamp);
  const diffInSeconds = Math.round((now - parsedTimestamp) / 1000);

  const intervals = [
    { unit: "year" as Intl.RelativeTimeFormatUnit, seconds: 31536000 },
    { unit: "month" as Intl.RelativeTimeFormatUnit, seconds: 2592000 },
    { unit: "week" as Intl.RelativeTimeFormatUnit, seconds: 604800 },
    { unit: "day" as Intl.RelativeTimeFormatUnit, seconds: 86400 },
    { unit: "hour" as Intl.RelativeTimeFormatUnit, seconds: 3600 },
    { unit: "minute" as Intl.RelativeTimeFormatUnit, seconds: 60 },
    { unit: "second" as Intl.RelativeTimeFormatUnit, seconds: 1 },
  ];

  for (const interval of intervals) {
    if (Math.abs(diffInSeconds) >= interval.seconds) {
      const value = Math.floor(diffInSeconds / interval.seconds);
      return rtf.format(-value, interval.unit);
    }
  }

  return "just now";
};

export const calculateMinutesAndSeconds = (
  timestamp1: string,
  timestamp2: string
) => {
  const parsedTimestamp1 = Date.parse(timestamp1);
  const parsedTimestamp2 = Date.parse(timestamp2);
  const diffInMilliseconds = Math.abs(parsedTimestamp1 - parsedTimestamp2);
  const totalSeconds = Math.floor(diffInMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return { minutes, seconds };
};
