import User from "./User.modal";

export class CurrentUser {
  /**
   * current user instance
   */
  public user: User = new User();
  public loggedIn: boolean = false;

  constructor(user: User, loggedIn: boolean) {
    this.user = user;
    this.loggedIn = loggedIn;
  }

  /**
   * check super admin
   */
  public isSuperAdmin(): boolean {
    return false;
  }

  /**
   * check role
   */
  public getRoleId(): number | string {
    return 15;
  }
  /**
   * get full name
   */
  public getFullName(): string {
    return (
      (this.user?.firstName ?? "") +
      " " +
      (this.user?.middleName ?? "") +
      " " +
      (this.user?.lastName ?? "")
    );
  }
  /**
   * get branch name
   */
  public getBranchName(): string {
    return this.user?.branch?.name;
  }
  /**
   * check logged in
   */
  public isLoggedIn(): boolean {
    return this.loggedIn;
  }
  /**
   *
   * @param loggedIn
   */
  public isModuleAllowed(moduleId: number | number[] | undefined) {
    let status: boolean = false;
    if (typeof moduleId === "undefined") {
      // console.log('helllow form undefine',moduleId)
      status = true;
    }
    if (Array.isArray(moduleId)) {
      // console.log('hello from array',moduleId)
      this.user?.modules?.map((data, index) => {
        if (moduleId.includes(parseInt(data?.id))) {
          status = true;
        }
      });
    }
    if (typeof moduleId === "number") {
      // console.log('hello number',moduleId)
      this.user?.modules?.map((data, index) => {
        if (moduleId === parseInt(data?.id)) status = true;
      });
    }
    return status;
  }

  public setLoggedIn(loggedIn: boolean): void {
    this.loggedIn = loggedIn;
  }
}
