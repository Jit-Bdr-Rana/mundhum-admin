export function greet(userName: string) {
  const curHr = new Date().getHours();
  return curHr < 12
    ? `Good Morning, ${userName} have a nice day`
    : curHr < 17
    ? `Good Afternoon, ${userName} i hope you're having a great day`
    : curHr < 22
    ? `Good Evening, ${userName} i hope you had better day`
    : `Good Night, ${userName} will catch you tomarrow`;
}
