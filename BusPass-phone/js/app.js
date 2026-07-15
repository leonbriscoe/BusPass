const TIMEZONE = "America/Detroit";
const clockEl = document.getElementById("clock");
const timeFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});
function getEasternNow() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: TIMEZONE })
  );
}
function formatClock(date) {
  const parts = timeFormatter.formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("hour")}:${get("minute")}:${get("second")} ${get("dayPeriod")}`;
}
function syncToNextSecond() {
  const now = getEasternNow();
  clockEl.textContent = formatClock(now);
  clockEl.setAttribute("datetime", now.toISOString());
  const msUntilNextSecond = 1000 - (Date.now() % 1000);
  setTimeout(syncToNextSecond, msUntilNextSecond);
}
syncToNextSecond();