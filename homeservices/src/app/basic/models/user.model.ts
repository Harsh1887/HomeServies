export interface User {
    id: number;
    name: string;
    email: string;
    address: string;
    phone: number;
  }

  export class User {
    constructor(
      public id: number,
      public name: string,
      public email: string,
      public address: string,
      public phone: number
    ) {}
  }
  

  export interface Admin {
    id: number;
    name: string;
    email: string;
  }

  export class Admin {
    constructor(
      public id: number,
      public name: string,
      public email: string,
    ) {}
  }
  

  export interface Emp {
    employee_id: number;
    emp_aadhar_number: number;
    employee_name: string;
    employee_service_name: string;
    employee_image: string;
    employee_phoneno: number;
    employee_email: string;
    employee_desc: string;
    employee_rating: number;
    employee_location: string;
    employee_experience: number;
    employee_service_fee: number;
  }

  

  export class EmpModel {
    constructor(
      public employee_id: number,
      public emp_aadhar_number: number,
      public employee_name: string,
      public employee_service_name: string,
      public employee_image: string,
      public employee_phoneno: number,
      public employee_email: string,
      public employee_desc: string,
      public employee_rating: number,
      public employee_location: string,
      public employee_experience: number,
      public employee_service_fee: number
    ) {}
  }
  


  export interface Order {
    orderId: number;
    userId: number;
    employeeId: number;
    orderTotalAmount: number;
    payAmountToEmp: number;
    empPaymentStatus: number;
    orderPaymentStatus: string;
    userAddress: string;
    userPhoneNo: string;
    serviceDate: Date;
    serviceTime: string;
    bookingTime: Date;
    orderStatus: string;
    orderLocation: string;
    datetimeOfServiceCompletion: Date;
  }

  

  export class Order implements Order {
    orderId: number;
    userId: number;
    employeeId: number;
    orderTotalAmount: number;
    payAmountToEmp: number;
    empPaymentStatus: number;
    orderPaymentStatus: string;
    userAddress: string;
    userPhoneNo: string;
    serviceDate: Date;
    serviceTime: string;
    bookingTime: Date;
    orderStatus: string;
    orderLocation: string;
    datetimeOfServiceCompletion: Date;
  
    constructor(data?: Partial<Order>) {
      this.orderId = data?.orderId || 0;
      this.userId = data?.userId || 0;
      this.employeeId = data?.employeeId || 0;
      this.orderTotalAmount = data?.orderTotalAmount || 0;
      this.payAmountToEmp = data?.payAmountToEmp || 0;
      this.empPaymentStatus = data?.empPaymentStatus || 0;
      this.orderPaymentStatus = data?.orderPaymentStatus || '';
      this.userAddress = data?.userAddress || '';
      this.userPhoneNo = data?.userPhoneNo || '';
      this.serviceDate = data?.serviceDate ? new Date(data.serviceDate) : new Date();
      this.serviceTime = data?.serviceTime || '';
      this.bookingTime = data?.bookingTime ? new Date(data.bookingTime) : new Date();
      this.orderStatus = data?.orderStatus || '';
      this.orderLocation = data?.orderLocation || '';
      this.datetimeOfServiceCompletion = data?.datetimeOfServiceCompletion
        ? new Date(data.datetimeOfServiceCompletion)
        : new Date();
    }
  
    toJson(): Partial<Order> {
      return {
        orderId: this.orderId,
        userId: this.userId,
        employeeId: this.employeeId,
        orderTotalAmount: this.orderTotalAmount,
        payAmountToEmp: this.payAmountToEmp,
        empPaymentStatus: this.empPaymentStatus,
        orderPaymentStatus: this.orderPaymentStatus,
        userAddress: this.userAddress,
        userPhoneNo: this.userPhoneNo,
        serviceDate: this.serviceDate,
        serviceTime: this.serviceTime,
        bookingTime: this.bookingTime,
        orderStatus: this.orderStatus,
        orderLocation: this.orderLocation,
        datetimeOfServiceCompletion: this.datetimeOfServiceCompletion,
      };
    }
  }