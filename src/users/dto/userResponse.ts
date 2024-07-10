export class UserResponse {
  id: number;

  email: string;

  firstName: string;

  lastName: string;

  phoneNo: string;

  constructor(id:number ,email: string, firstName: string, lastName: string, phoneNo: string) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNo = phoneNo;
  }
}
