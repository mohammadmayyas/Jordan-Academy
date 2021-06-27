import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
    ]),       
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    subject: new FormControl('', [
      Validators.required,
    ]), 
    message: new FormControl('', [
      Validators.required,
    ]),   
  });
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.contactForm.value);
  }

}
