export default function formatTime(date) {
  const today = new Date().toString().split(" ")[2];
  const day = date.split("T")[0].split("-")[2];
  const time = date.split("T")[1].split(".")[0].slice(0, 5).split(":");
  const hours = time[0][0] === "0" ? +time[0][1] : +time[0];
  const formattedTime = `${hours === 0 || hours === 12 ? "12" : hours < 12 ? hours : hours - 12}:${time[1]} ${hours === 0 || hours < 12 ? "AM" : "PM"}`;
  if (today - day === 1) return `Yesterday at ${formattedTime}`;
  if (today > day)
    return `${new Date(date).toLocaleDateString()}, ${formattedTime}`;
  return formattedTime;
}

console.log(formatTime("2026-10-23T12:34:57.908"));
