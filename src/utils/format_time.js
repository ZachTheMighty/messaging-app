export default function formatTime(date) {
  const today = new Date().toString().split(" ")[2];
  const day = date.split("T")[0].split("-")[2];
  const formattedTime = new Date(date).toLocaleTimeString().split(":");
  const res = `${formattedTime[0]}:${formattedTime[1]} ${formattedTime[2].split(" ")[1]}`;
  if (today - day === 1) return `Yesterday at ${formattedTime}`;
  if (today > day) return `${new Date(date).toLocaleDateString()}, ${res}`;
  return res;
}
