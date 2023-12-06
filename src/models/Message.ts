export class Message {
  constructor(
      private id: string,
      private senderId: string,
      private chatId: string,
      private content: string,
      private createdAt: string
  ) {}
}