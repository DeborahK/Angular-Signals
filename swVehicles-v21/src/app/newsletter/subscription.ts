export interface Subscription {
  email: string;
  subscribedDate: Date;
  firstName?: string;
  lastName?: string;
  yearsAsFan?: number;
  priceAlerts?: boolean;
}
