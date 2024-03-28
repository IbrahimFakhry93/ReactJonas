const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

//& Create reducer function for customer
export default function reducerCustomer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

//& Action Creators for customer:

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: { fullName },
  };
}
