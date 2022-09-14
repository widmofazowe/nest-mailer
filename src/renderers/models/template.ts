import { EmailComponent } from "./component";

export interface EmailTemplate {
  subject: string;
  body: EmailComponent[];
}
