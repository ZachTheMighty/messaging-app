export default function deCamel(string) {
  return string[0].toUpperCase() + string.slice(1).replace(/([A-Z])/g, " $1");
}

console.log(deCamel("lastName"));
