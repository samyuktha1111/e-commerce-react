import React from 'react'

const CartOrders = () => {
    const carts = JSON.parse(localStorage.getItem('carts'));
  return (
		<div className="grid grid-flow-row mt-11 overflow-scroll h-fit">
			{carts.map((item, index) => (
				<div className="grid grid-cols-5">
					<div>
						<img
							src={item.image}
							alt="shampoo"
							className="max-w-xs h-16 pl-10 mb-6 transform transition ease-in-out duration-1000 hover:scale-125"
						/>
					</div>
					<div className="line-clamp-1 text-sm" key={index}>
						{item.title}
					</div>

					<div className="text-sm">Quantity-{item.qty}</div>
					<div className="text-sm">{item.amount - item.discount}</div>
				</div>
			))}
		</div>
	);
}

export default CartOrders