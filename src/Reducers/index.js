let initialState = {
    products: []
}

export const Set_reducer = (state = initialState, action) => {
    switch (action.type) {
        case "Set_Products":
            return {
                ...state, products: action.payload
            }
        default:
            return state;
    }

}

let initDesc = {
    descCart: []
}

export const desc_Reducer = (state = initDesc, action) => {
    switch (action.type) {
        case "Desc_Cart":
            return {
                ...state, descCart: action.payload
            }
        default:
            return state;
    }

}

let initCart = {
    productCart: []
}

export const Cart_Reducer = (state = initCart, action) => {
    switch (action.type) {
        case "Add_Cart":
            let index = state.productCart.findIndex(elem => elem.id === action.payload.id);
            if (index >= 0) {
                state.productCart[index].quantity += 1;
                // alert("this product already exist in the cart")
            } else {
                let temp = { ...action.payload, quantity: 1 };
                state.productCart.push(temp)
                // alert("you have added a product")
            }
            return state;
        case "Remove_Product":
            let newList = state.productCart.filter(elem => elem.id !== action.payload.id);
            return {
                ...state, productCart: newList
            }

        case "Increment":
            let indexitem = state.productCart.findIndex(elem => elem.id === action.payload.id);
            if (indexitem >= 0) {
                state.productCart[indexitem].quantity += 1;

            }
            return state;
        case "Decrement":
            let decrement = state.productCart.findIndex(elem => elem.id === action.payload.id);
            if (decrement >= 0) {
                state.productCart[decrement].quantity -= 1;

            }
            return state;








        default:
            return state;
    }
}
