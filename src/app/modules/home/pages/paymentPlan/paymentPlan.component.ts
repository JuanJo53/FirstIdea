import { Component, OnInit } from '@angular/core';
import {PaymentPlanService} from '../../../../services/user_services/paymentPlan.service';
import {PaymentPlan} from '../../../../models/paymentPlan.model';

@Component({
  selector: 'app-paymentPlan',
  templateUrl: './paymentPlan.component.html',
  styleUrls: ['./paymentPlan.component.css']
})
export class PaymentPlanComponent implements OnInit {
  listPaymentPlan: PaymentPlan[];
  constructor(private service: PaymentPlanService) { }
  ngOnInit(): void {
    this.loadlist();
  }
  loadlist(){
    this.service.getAllPaymentPlan().subscribe(data => {
      this.listPaymentPlan = data;
    });
  }
}