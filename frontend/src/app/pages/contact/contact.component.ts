import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber:  ['', [Validators.required, this.phoneValidator]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  get firstName() {
    return this.contactForm.get('firstName')!;
  }

  get lastName() {
    return this.contactForm.get('lastName')!;
  }

  get phoneNumber() {
    return this.contactForm.get('phoneNumber')!;
  }

  get email() {
    return this.contactForm.get('email')!;
  }

  get subject() {
    return this.contactForm.get('subject')!;
  }

  get message() {
    return this.contactForm.get('message')!;
  }

  phoneValidator(control: AbstractControl) {
    const phoneRegex = /^(?:\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
    if (control.value && !phoneRegex.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      this.contactService.submitContactForm(formData).subscribe(
        response => {
          console.log('Response:', response);
          this.toastr.success('Your message has been sent successfully!', 'Success');
          this.contactForm.reset();
        },
        error => {
          console.error('Error:', error);
          this.toastr.error('An error occurred while sending your message. Please try again.', 'Error');
        }
      );
    } else {
      this.contactForm.markAllAsTouched();
      this.toastr.error('Please fill out all required fields correctly.', 'Error');
    }
  }
}
