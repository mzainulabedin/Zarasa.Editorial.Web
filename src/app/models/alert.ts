export class Alert {
  type: AlertType;
  message: string;
  visible = true;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
