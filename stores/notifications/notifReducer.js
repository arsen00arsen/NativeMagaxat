// const initialNotifState = {
//   notifications: {},
//   loading: false,
//   error: null,
// };

// export const notifReducer = (state = initialNotifState, action) => {
//   const {payload, type} = action;
//   switch (type) {
//     case 'NOTIF_START':
//       return {
//         ...state,
//         loading: true,
//       };
//     case 'NOTIF_SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         notifications: payload,
//         error: null,
//       };

//     case 'NOTIF_ERROR':
//       return {
//         ...state,
//         loading: false,
//         notifications: {},
//       };
//     default:
//       return state;
//   }
// };
