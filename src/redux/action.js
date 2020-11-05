export function onChangeInput(input,id) {
    return { 
        type: "CHANGEINPUT",
        payload:input,
        id:id
     };
  }

  export function onChangeselect(input) {
    return { 
        type: "CHANGESELECT",
        payload:input,
     };
  }

  export function getInitialState() {
    return { 
        type: "GETINITIALSTATE",
     };
  }