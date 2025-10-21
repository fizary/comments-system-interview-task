const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "medium",
});

export function formatDate(date: Date | string | number) {
  const d =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  return dateFormatter.format(d);
}
