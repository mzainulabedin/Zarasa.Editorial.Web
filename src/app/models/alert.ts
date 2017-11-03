import { ErrorModel } from '../common/error-model';
export class Alert {
  type: AlertType;
  message: string;
  visible = true;
  errors: Array<ErrorModel>;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
