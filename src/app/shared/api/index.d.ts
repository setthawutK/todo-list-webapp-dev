declare const PATH = '/todo-list-service';
declare const examplePATH = '/example-service';

declare const enum ExampleAPI {
  // EXAMPLE API
  userApiV1Users$1Update = `${PATH}/user/api/v1/users/$1/update`,
  userApiV1Users$1Deleted = `${PATH}/user/api/v1/users/$1/deleted`,
  userApiV1Users$1Active = `${PATH}/user/api/v1/users/$1/active`,
  userApiV1UsersUploadImage = `${PATH}/user/api/v1/users/upload/image`,
  userApiV1UsersCreate = `${PATH}/user/api/v1/users/create`,
  userApiV1Users = `${PATH}/user/api/v1/users`,
  userApiV1Users$1Info = `${PATH}/user/api/v1/users/$1/info`,
  userApiV1UsersCount = `${PATH}/user/api/v1/users/count`,
  // EXAMPLE API

  // publicCustomerApiV1CustomersActivateIsexist = `${PATH}/public/customer/api/v1/customers/activate/is-exist`,
  // customerApiV1PoliciesClaims$1Cancel = `${PATH}/customer/api/v1/policies/claims/$1/cancel`,
}

declare const enum todoListAPI {
  authLogin = `${PATH}/auth/login`,
  authLoginFinishedShowlist = `${PATH}auth/loginFinished/showlist`,
  createlist = `${PATH}/createlist`,
  delete = `${PATH}/delete`,
  updateUp = `${PATH}/updateUp`,
}
