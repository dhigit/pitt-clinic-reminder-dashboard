export class Reminder {

  constructor(
    public title: string,
    public desc: string,
    public duration: number,
    public priority: string,
    public mapping: {
      mid: number
    }
  ) {}
}
