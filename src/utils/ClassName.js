export const classNames = (...args) => {
  let classes = [];

  for (let arg of args) {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object" && arg !== null) {
      for (let key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    } else if (arg) {
      classes.push(String(arg));
    }
  }

  classes = [...new Set(classes)];

  return classes.join(" ");
};
