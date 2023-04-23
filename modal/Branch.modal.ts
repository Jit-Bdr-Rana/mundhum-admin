export class Branch {
  id: string; //(autoincrement)
  name: string;
  province: string;
  district: string;
  tole: string;
  city: string;
  primaryEmail: string;
  secondaryEmail: string;
  primaryContact: number;
  secondaryContact: number;
  isActive: boolean;
  type: string;
  country: string;
  image: string;
  createdBy?: object;
  createdAt: Date;
  updatedAt: Date;
  /**
   * Creates an instance of Branch
   * @param {{}} params
   */
  constructor(params: Object = {}) {
    for (let name in params) {
      //@ts-ignore
      this[name] = params[name];
    }
  }
}
