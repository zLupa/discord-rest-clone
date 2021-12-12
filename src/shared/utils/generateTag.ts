export function generateTag() {
  let result = "";

  const characters = "0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < 4; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
