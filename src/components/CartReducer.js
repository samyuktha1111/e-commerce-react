const initialState = {
	items: [],
	products: [],
};
export const CartReducer = (state = initialState, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'ADD_CART_SUCCESS':
			state.items.push(action.id);
			return state;

		case 'DELETE_CART_SUCCESS':
			let items = [...state.items];
			const index = items.findIndex((c) => c.id === action.id);
			items.splice(index, 1);
			return { ...state, items };
		case 'GET_PRODUCTS_SUCCESS':
			console.log(action.products);

			return { ...state, products: action.products };

		case 'GET_PRODUCTS_FAILURE':
			return { ...state, message: action.message };

		default:
			return state;
	}
};
