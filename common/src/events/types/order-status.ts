export enum OrderStatus {
  // Oerder has been created and the Ticket not reserved
  Created = "created",

  // The ticket the order trying to reserve has already been reserved
  // Or when the user cancelled the order
  // The order expires before payment
  Cancelled = "cancelled",

  // The order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",

  // The order has reserved the ticket and the user has provided payment successfully
  Complete = "complete",
}
