import { v4 as uuidV4 } from "uuid";

export class Task {
  id: string;
  description: string;
  completedAt: Date | null;

  constructor(description: string) {
    this.id = uuidV4();
    this.description = description;
    this.completedAt = null;
  }
}
