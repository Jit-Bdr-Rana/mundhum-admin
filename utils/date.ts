export class DateFormat {
  public date: Date;

  constructor(timestamap: string) {
    this.date = new Date(timestamap);
  }

  public getFullDate(formate?: string) {
    return (
      this.date.getFullYear() +
      `${formate! ?? "-"}` +
      (this.date.getMonth() + 1) +
      `${formate! ?? "-"}` +
      this.date.getDate()
    );
  }
}
