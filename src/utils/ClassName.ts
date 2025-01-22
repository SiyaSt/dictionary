type ClassNameArg = string | { [key: string]: boolean };

export const classNames = (...args: ClassNameArg[]): string => {
  let classes = [];

  for (const arg of args) {
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (typeof arg === "object" && arg !== null) {
      for (const key in arg) {
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
