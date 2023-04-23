const auth: any = {
  login: "login",
  current: "current",
  logout: "logout",
};

const user: any = {
  getall: "user", //                                          /user                     get
  save: "user", //                                           /user                      post
  resetPassword: "/reset/password", //                      /reset/password             post
  resetPasswordRequest: "/reset/request", //               /reset/request               post
  updateForAdmin: "/user/admin/", //                      /user/admin/{id}              put
  updateForUser: "/user/", //                            /user/{id}                     put
  changeStatus: "/user/change/status/", //              /user/change/status/{id}        get
  changePassword: "/user/change-password", //          /user/change-password            post
};

const carrier: any = {
  save: "carrier",
  getall: "carrier",
  delete: "carrier/",
};
const payment: any = {
  save: "payment",
  getall: "payment",
  delete: "payment/",
};
const branch: any = {
  getall: "branch",
  save: "branch",
  changeStatus: "branch/status/",
  update: "branch/", //                        /branch/{id}      put
  delete: "branch/", //                       /branch/{id}       delete
};

const shipment: any = {
  save: "shipment", //                               /shipment              post
  update: "shipment/", //                           /shipment/{id}          put
  delete: "shipment/", //                          /shipment/{id}           delete
  softdelete: "shipment/soft/", //                /shipment/soft/{id}       delete
  getallUsingFilter: "/shipment/filter/", //     /shipment/filter/{draft}   get        takes draft as 1 or 0
  mail: "shipment/mail/", //                    /shipment/mail/{id}         get         send mail
  destinationList:'shipment/destination-list',//shipment/destination-list   get         destinationlist
};

const shipmentStatus: any = {
  save: "shipment-status", //                               /shipment-status                post
  update: "shipment-status/", //                           /shipment-status/{id}            put
  getallByshipmentid: "shipment-status/shipment/", //     /shipment-status/shipment/{id}    get
  delete: "shipment-status/", //                         /shipment-status/{id}              delete
  softDelete: "shipment-status/shipment/", //           /shipment-status/soft/{id}          delete
  massUpdate:'shipment-status/massupdate'//            /shipment-status/massupdate          post
};

const status: any = {
  getall: "status", //                                /status        get
  save: "status", //                                 /status         post
  getbyid: "status/", //                            /status/{id}     get
  delete: "status/", //                            /status/{id}      delete
  update: "status/", //                           /status/{id}       put
};

const role: any = {
  getall: "role", //                         /role                    get
  save: "role", //                          /role                     post
  update: "role/", //                      /role/{id}                 put
  delete: "role/", //                     /role/{id}                  delete
};
const roleAccess: any = {
  getByRoleId: "role-access/", //           /role-access/{id}        get
  save: "role-access", //                  /role-access              post
};

const modules: any = {
  getall: "module",
};

const gallery: any = {
  getall: "gallery", //                           /gallery             get
  save: "gallery", //                            /gallery              post
  getbyAlbumid: "gallery/album/", //            /gallery/album/{id}    get
  delete: "gallery/", //                       /gallery/{id}           delete
};

const album: any = {
  getAll: "album", //            /album       get
  save: "album", //             /album        post
  update: "album/", //         /album/{id}    post
  getById: "album/", //       /album/{id}     get
  delete: "album/", //        /album/{id}      delete
};
const userFeedback: any = {
  getAll: "user-feedback", //      /user-feedback   get
  save: "user-feedback", //       /user-feedback    post
  delete: "user-feedback/", //    /user-feedback     delete
};
const dashboard: any = {
  stat: "/statistic", //             /statistic
};
const parcelDetail: { [key: string]: string } = {
  update: "/shipment/parcel/", //   /shipement/parcel/{id}
};
export {
  auth as authUrl,
  carrier as carrierUrl,
  payment as paymentUrl,
  branch as branchUrl,
  shipment as shipmentUrl,
  status as statusUrl,
  shipmentStatus as shipmentStatusUrl,
  user as userUrl,
  role as roleUrl,
  roleAccess as roleAccessUrl,
  modules as moduleUrl,
  gallery as galleryUrl,
  album as albumUrl,
  userFeedback as userFeedbackUrl,
  dashboard as dashboardUrl,
  parcelDetail as parcelDetailUrl,
};
