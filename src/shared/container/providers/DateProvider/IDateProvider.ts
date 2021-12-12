export interface IDateProvider {
  addHours(date: Date, hours: number): Date;
  isBefore(startDate: Date, endDate: Date): boolean;
  dateNow(): Date;
}
