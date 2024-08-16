import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CountryService } from '../../services/country.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  countries: string[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private countryService: CountryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.countries = this.countryService.getAllCountries();
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, this.phoneValidator]],
      country: ['', Validators.required],
      state: [''],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  togglePasswordVisibility(fieldId: string): void {
    const field: HTMLInputElement = document.getElementById(fieldId) as HTMLInputElement;
    field.type = field.type === 'password' ? 'text' : 'password';
  }

  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  phoneValidator(control: AbstractControl) {
    const phoneRegex = /^(?:\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
    if (control.value && !phoneRegex.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(
        response => {
          this.toastr.success('Signup successful', 'Success', {
            positionClass: 'toast-center',
            timeOut: 5000,
            progressBar: true
          });
          this.signupForm.reset();
        },
        error => {
          this.toastr.error(error, 'Error', {
            positionClass: 'toast-center',
            timeOut: 5000,
            progressBar: true
          });
        }
      );
    }
  }
}
