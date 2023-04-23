import { Branch } from "./Branch.modal";

export default class User {
  /**
   * user relate filed
   */
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  phone: number;
  email: string;
  address: string;
  branch: Branch;
  role: object;
  isActive: boolean;
  isDelete: boolean;
  created_at: Date;
  updated_at: Date;
  modules:Array<any>;
  /**
   * Creates an instance of User
   * @param {{}} params
   */
  constructor(params: Object = {}) {
    for (let name in params) {
      //@ts-ignore
      this[name] = params[name];
    }
  }
}
