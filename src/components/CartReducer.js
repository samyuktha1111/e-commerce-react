const initialState = {
	items: [],
	products: [],
	subtotal: 0,
	carttotal: 0,
	user: null,
    discountTotal:0,
	notes:[]
};
export const CartReducer = (state = initialState, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'ADD_CART_SUCCESS':
			// eslint-disable-next-line no-unused-vars
			let already = false;
			state.items.forEach((x) => {
				if (x.id === action.id.id) {
					already = true;
					x.qty = x.qty + 1;
					x.amount = x.price * 10 * x.qty;
				}
			});
			if (already === false) {
				state.items.push(action.id);
			}

			return state;

		case 'DELETE_CART_SUCCESS':
			let items = [...state.items];
			const index = items.findIndex((c) => c.id === action.id);
			items.splice(index, 1);
			return { ...state, items };
		case 'GET_PRODUCTS_SUCCESS':
			console.log(action.products);

			return { ...state, products: action.products };
		case 'INCREMENT_SUCCESS':
			const updatedCart = state.items.map((curElem) => {
				if (curElem.id === action.quantity) {
					return {
						...curElem,
						qty: curElem.qty + 1,
						amount: (curElem.qty + 1) * curElem.price*100,
					};
				}
				return curElem;
			});
			return { ...state, items: updatedCart };
		case 'DECREMENT_SUCCESS':
			const updatedCart1 = state.items
				.map((curElem) => {
					if (curElem.id === action.quantity) {
						return {
							...curElem,
							qty: curElem.qty - 1,
							amount: (curElem.qty - 1) * curElem.price*100,
						};
					}
					return curElem;
				})
				.filter((curElem) => curElem.qty !== 0);
			return { ...state, items: updatedCart1 };
		case 'GET_PRODUCTS_FAILURE':
			return { ...state, message: action.message };
		case 'SUBTOTAL_SUCCESS':
			const total = state.items.reduce(
				(total, currentValue) => (total = total + currentValue.amount),
				0
			);
			return { ...state, subtotal: parseFloat(total).toFixed(2) };
		case 'DISCOUNT_TOTAL_SUCCESS':
			const discount = state.items.reduce(
				(total, currentValue) =>
					(total = total + currentValue.discount * currentValue.qty),
				0
			);
			return { ...state, discountTotal: parseFloat(discount).toFixed(2) };
		case 'CART_TOTAL_SUCCESS':
			const carttotal = state.items.reduce(
				(total, currentValue) => (total = total + currentValue.qty),
				0
			);
			return { ...state, carttotal };
		case 'EMPTY_CART_SUCCESS':
			return { ...state, items: [] };

		
			case 'ADD_ADDRESS_SUCCESS':
				{
					state.notes.push(action.payload)
					return state
				}
		default:
			return state;
	}
};
