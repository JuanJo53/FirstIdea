import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {CardService} from '../../../../services/user_services/card.service';
import {Card} from '../../../../models/card.model';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})

export class CreateCardComponent implements OnInit {
  formCard: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private route: ActivatedRoute,
    private cardService: CardService,
    public dialogRef: MatDialogRef<CreateCardComponent>
  ) { }
  edit = false;
  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close(false);
  }
  cancel() {
    this.edit = false;
  }
  ngOnInit(): void {
    this.editCard();
  }
  editCard(): void {
    this.edit = true;
    this.formCard = this.fromBuilder.group({
      cardId: [0, [Validators.required]],
      cardName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expirationYear: ['', [Validators.required]],
      expirationMonth: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      creationDate: ['', [Validators.required]],
    });
  }
  savecard():void {
    if (this.formCard.valid)
    {
      const cert = this.formCard.value;
      console.log(cert);
      this.createcard(cert);
    }
  }

  createcard(card: Card): void {
    this.cardService
      .postnewcard(card)
      .subscribe((card) => {
        console.log(card);
      });
    this.onNoClick();
  }
}
