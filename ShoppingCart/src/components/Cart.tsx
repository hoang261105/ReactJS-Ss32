type Cart = {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
};

type Carts = {
  cartList: () => void;
  carts: Cart[];
  handleIncrease: (product: Cart) => void;
  handleDecrease: (product: Cart) => void;
  handleDelete: (product: Cart) => void;
};

export default function Cart({
  carts,
  handleIncrease,
  handleDecrease,
  handleDelete,
}: Carts) {
  return (
    <div className="products">
      <div className="top">Cart</div>
      <div className="line"></div>
      <div className="center">
        {carts.map((product: Cart) => (
          <div className="listProduct" key={product.id}>
            <div className="image">
              <img src={product.img} alt={product.name} />
            </div>
            <div className="info">
              <p>{product.name}</p>
            </div>
            <div className="button">
              <button
                onClick={() => handleDecrease(product)}
                disabled={product.quantity === 1}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button onClick={() => handleIncrease(product)}>+</button>
            </div>
            <div className="deleteCart">
              <button onClick={() => handleDelete(product)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="line"></div>
      <div className="bottom">
        Total:{" "}
        {carts.reduce((total, item) => total + item.price * item.quantity, 0)}
      </div>
    </div>
  );
}
