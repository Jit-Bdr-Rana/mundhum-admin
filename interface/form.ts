export interface CarrierForm {
  id: number;
  name: string;
  website: string;
  email: string;
  contact: number;
}

export interface PaymentForm {
  id: number;
  name: string;
}
export interface RoleForm extends PaymentForm {}
export interface BranchForm {
  id: number;
  name: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryContact: string;
  secondaryContact: string;
  type: string;
  city: string;
  tole: string;
  country: string;
  province: string;
  district: string;
  image: File[];
}

export interface ShipmentForm extends ShipmentStatusForm {
  id: number;
  billNo: string;
  carrierReferenceNo: string;

  shipperName: string;
  shipperContact: number;
  shipperMail: string;
  shipperAddress: string;

  receiverName: string;
  receiverMail: string;
  receiverPrimaryContact: number;
  receiverSecondaryContact: number;
  receiverPrimaryAddress: string;
  receiverSecondaryAddress: string;


  varient:string;
  shipmentType: string;
  weight: string;
  courier: string;
  packages: string;
  mode: string;
  price: number;
  quantity: string;
  paymentId: number;
  totalFreight: string;
  origin: string;
  destination: string;
  departureTime: Date;
  pickupTime: Date;
  pickupDate: Date;
  deliveryDate: Date;
  comment: string;
  carrierId: number;
  isDraft: number;

  parcel: {
    id: number;
    description: string;
    cod: string;
    code: string;
    weight: number;
    qty: number;
    unit: number;
    total: number;
  }[];
}

export type Parcel = Pick<ShipmentForm, "parcel">;

export interface ShipmentStatusForm {
  id: number;
  location: string;
  time: Date;
  date: Date;
  remarks: string;
  shipmentId: number;
  statusId: number;
}

export interface StatusForm {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserForm {
  id: number;
  roleId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  email: string;
  address: string;
  isActive: number;
  branchId: number;
}

export interface PasswordResetResponse {
  password: string;
  user: any;
}

export type RoleAccessForm = {
  roleAccess: {
    moduleId: number;
    roleId: number;
    access: boolean;
  }[];
};

export type PasswordChangeForm = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type AlbumForm = {
  id: number;
  name: string;
  description: string;
  coverImage: File;
};

export type GalleryForm = {
  albumId: number;
  image: File[];
};
