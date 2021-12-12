import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayJSDateProvider implements IDateProvider {
  isBefore(startDate: Date, endDate: Date): boolean {
    const startDateUTC = this.dateToUTC(startDate);
    const endDateUTC = this.dateToUTC(endDate);

    return dayjs(endDateUTC).isBefore(startDateUTC);
  }

  addHours(date: Date, hours: number): Date {
    const dateUTC = this.dateToUTC(date);

    return dayjs(dateUTC).add(hours, "hours").toDate();
  }

  private dateToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow() {
    return dayjs().utc().local().toDate();
  }
}
