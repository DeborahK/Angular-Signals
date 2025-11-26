import { email, max, min, required, schema } from "@angular/forms/signals";

export interface Subscription {
  email: string;
  firstName: string;
  lastName: string;
  yearsAsFan: number;
  priceAlerts: boolean;
}

export const initialData = {
  email: '',
  firstName: '',
  lastName: '',
  yearsAsFan: 0,
  priceAlerts: false,
};

// Define the validation as part of the model
export const subscriptionSchema = schema<Subscription>((path) => {
  required(path.email, { message: 'Email is required to receive our newsletter' });
  email(path.email, { message: 'Please enter a valid email address' });
  min(path.yearsAsFan, 0, { message: 'Years cannot be negative' });
  max(path.yearsAsFan, 100, { message: 'Please enter a valid number of years' });
})
