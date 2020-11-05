
const initialState = {
            title: "",
            summary: "",
            site: "",
            link: "",
            event: "",
            category: "",
            checked: false,
            sdate: "2020-05-24",
            edate: "2020-11-04",
            stime: "07:30",
            etime: "07:30",
  };
export default function reducer(state=initialState, action) {
    console.log('reducer', state, action);

    switch(action.type) {
        case 'CHANGEINPUT':
          return {
              ...state,
            [action.id]: action.payload,
           
          };
          case 'CHANGESELECT':
            return {
                ...state,
              checked:(action.payload)
            };
            case 'GETINITIALSTATE':
            return initialState
           
        default:
          return state;
      }
      
  }
  
  