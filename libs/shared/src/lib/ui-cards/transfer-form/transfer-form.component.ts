import { Component, EventEmitter, LOCALE_ID, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTransactionPayload } from '@commerzbank-interview-ws/data-access-transactions';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-transfer-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.scss',

})
export class TransferFormComponent {
  @Output() transfer = new EventEmitter<CreateTransactionPayload>();

  accountName = 'NevBank Savings Account';
  accountNumber = '44219245/8209';
  availableFunds = 82134.56;

  transferForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transferForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      receiver: ['', Validators.required], // Still required for form validity display
    });
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      const amountToTransfer = this.transferForm.value.amount;
      if (this.availableFunds >= amountToTransfer) { // Basic check
        const randomReceiverAccount = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const payload: CreateTransactionPayload = {
          amount: amountToTransfer,
          receiverAccount: randomReceiverAccount,
        };
        this.transfer.emit(payload);

        // ---- SIMULATE BALANCE UPDATE (Local Mock) ---- better way would be wait for actual amount from backend
        this.availableFunds -= amountToTransfer;
        // ---- END SIMULATE ----

        this.transferForm.reset();
      } else {
        // Handle insufficient funds - maybe add an error to the form
        this.transferForm.get('amount')?.setErrors({ insufficientFunds: true });
        console.error("Insufficient funds for transfer");
      }
    } else {
        this.transferForm.markAllAsTouched();
    }

  }
}
