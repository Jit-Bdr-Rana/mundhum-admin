function truncate(str: string, num: number, suffix: string = "...") {
  if (str?.length > num) {
    return str.slice(0, num) + suffix;
  } else {
    return str;
  }
}
export default truncate;
