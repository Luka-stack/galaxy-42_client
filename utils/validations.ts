// const strongPasswordFormat =
//   /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
// const mailFormat =
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const arrayUnique = (array: string[]) => {
  const copy = array.concat();
  for (let i = 0; i < copy.length; ++i) {
    for (let j = i + 1; j < copy.length; ++j) {
      if (copy[i] === copy[j]) copy.splice(j--, 1);
    }
  }

  return copy;
};
