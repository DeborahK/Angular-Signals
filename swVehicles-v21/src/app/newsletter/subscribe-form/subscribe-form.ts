import { Component, computed, signal } from '@angular/core';
import { form, Field } from '@angular/forms/signals';
import { initialData, Subscription, subscriptionSchema } from '../subscription';

@Component({
  selector: 'swv-subscribe-form',
  imports: [Field],
  templateUrl: './subscribe-form.html',
  styleUrl: './subscribe-form.css',
})
export class SubscribeForm {
  subscribeMessage = '';

  // Create a form model signal with form fields
  // This represents the form's data structure
  subscribeModel = signal<Subscription>(initialData);

  // Define a form from the model
  subscribeForm = form(this.subscribeModel, subscriptionSchema);
  fullName = computed(() => `${this.subscribeForm.firstName().value()} ${this.subscribeForm.lastName().value()}`);

  subscribe() {
    // Display a message
    this.subscribeMessage = `Thank you for your subscription ${this.fullName()}!`;
    // Submit to the server
    console.log('Submitting data to server', this.subscribeForm().value());
    // Reset the form (or navigate to another page)
    this.subscribeForm().reset();
    // Clear the existing data
    this.subscribeModel.set(initialData);
  }
}
