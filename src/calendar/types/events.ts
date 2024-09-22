import dayjs from "dayjs";

export interface Event {
  id: number;
  title: string;
  content: string;
  startTime: Date;
  endTime: Date;
  type: string;
  location?: string;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: number;
}
