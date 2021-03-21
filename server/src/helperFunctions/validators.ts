import validator from "validator";

class Validator {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: any;

  constructor(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.errors = {};
  }

  validateUsername(): void {
    if (validator.isEmpty(this.username))
      this.errors.emptyUsername = "Username cannot be empty.";
  }

  validateEmail(): void {
    if (validator.isEmpty(this.email)) {
      this.errors.emptyEmail = "Email is empty.";
    } else if (!validator.isEmail(this.email)) {
      this.errors.noEmail = "This isnt an email.";
    }
  }

  validatePassword(): void {
    if (validator.isEmpty(this.password)) {
      this.errors.emptyPassword = "Password cannot be empty.";
    }
  }

  comparePassword(): void {
    if (this.password !== this.confirmPassword) {
      this.errors.samePw = "Passwords do not match.";
    }
  }
}

export class SignupValidator extends Validator {
  constructor(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    super(username, email, password, confirmPassword);
  }

  validData() {
    this.validateEmail();
    this.validateUsername();
    this.validatePassword();
    this.comparePassword();
    return {
      errors: this.errors,
      validData: Object.keys(this.errors).length === 0,
    };
  }
}

export class LoginValidator extends Validator {
  constructor(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    super(username, email, password, confirmPassword);
  }

  validData() {
    this.validateEmail();
    this.validatePassword();
    this.validateUsername();
    return {
      errors: this.errors,
      validData: Object.keys(this.errors).length === 0,
    };
  }
}
