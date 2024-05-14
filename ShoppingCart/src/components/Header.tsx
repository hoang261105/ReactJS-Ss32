import { useState } from "react";
import Cart from "./Cart";

type Cart = {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
};

const data = [
  {
    id: 1,
    name: "Samsung Galaxy S22 Ultra",
    img: "https://thanhdatmobile.vn/wp-content/uploads/2022/11/936943183.jpeg",
    price: 29000000,
    quantity: 2,
  },
  {
    id: 2,
    name: "Iphone 14 pro max",
    img: "https://bizweb.dktcdn.net/100/463/685/products/fs-fcc006dd-226b-4f21-a046-1ccdc1a268a7-c13e0207-1c70-4783-9e38-bcf3d71010fb-090f59fe-ddf7-464f-9365-4bc5948da1f9.png?v=1713857431890",
    price: 35000000,
    quantity: 2,
  },
  {
    id: 3,
    name: "Redmi Note 13 pro",
    img: "https://cdn.hoanghamobile.com/i/productlist/dsp/Uploads/2024/02/20/redmi-note-13-pro.png",
    price: 35000000,
    quantity: 2,
  },
  {
    id: 4,
    name: "VSmart Aris",
    img: "https://cdn.tgdd.vn/Products/Images/42/230413/vsmart-aris-xanhduong-600x600-200x200.jpg",
    price: 5000000,
    quantity: 2,
  },
  {
    id: 5,
    name: "Oppo Reno 10 5G",
    img: "https://cdn.tgdd.vn/Products/Images/42/305695/oppo-reno10-blue-thumbnew-600x600.jpg",
    price: 29000000,
    quantity: 2,
  },
  {
    id: 6,
    name: "Iphone 15 pro max",
    img: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg",
    price: 29590000,
    quantity: 2,
  },
  {
    id: 7,
    name: "Samsung Galaxy S24 Ultra",
    img: "https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumb-600x600.jpg",
    price: 40000000,
    quantity: 2,
  },
  {
    id: 8,
    name: "Samsung Galaxy S8+ plus",
    img: "https://cdn.viettablet.com/images/thumbnails/480/516/detailed/26/samsung-galaxy-s8-plus-cu-viettablet.jpg",
    price: 4790000,
    quantity: 2,
  },
];

export default function Header() {
  const [cartQuantity, setCartQuantity] = useState<number>(0);
  const [showCart, setShowCart] = useState<boolean>(false);

  // Hàm render dữ liệu

  // Hàm lấy dữ liệu từ local
  const [cartLocal, setCartLocal] = useState<Cart[]>(() => {
    const carts = localStorage.getItem("carts");
    const listCart = carts ? JSON.parse(carts) : [];
    return listCart;
  });

  // Hàm lưu lên local
  const saveToLocal = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    setCartLocal(value);
    handleChange(value);
  };

  // Thêm vào giỏ hàng
  const handleAdd = (product: Cart) => {
    /* 
    B1 .khi click lấy được id sản phẩm
    B2: kiểm tra sản phẩm có trong giỏ hàng hay không
      + nếu có thì tăng số tượng
      + không thì push vào
      ==> sau khi làm xong lưu lại trên local
     */
    const findCartIndex = cartLocal.findIndex((item) => item.id === product.id);

    if (findCartIndex !== -1) {
      cartLocal[findCartIndex].quantity += 1;
      saveToLocal("carts", cartLocal);
    } else {
      cartLocal.push({ ...product, quantity: 1 });
      saveToLocal("carts", cartLocal);
    }
  };

  // Hàm thông báo tăng số lượng sản phẩm
  const handleChange = (product: Cart[]) => {
    // Tính tổng số sản phẩm
    const updateQuantity = product.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartQuantity(updateQuantity);
  };

  // Hàm ẩn hiện form cart
  const cartList = () => {
    setShowCart(!showCart);
  };

  // Hàm cập nhật số lượng tăng
  const handleIncrease = (product: Cart) => {
    const findCart = cartLocal.findIndex((item) => item.id === product.id);
    if (findCart !== -1) {
      cartLocal[findCart].quantity += 1;
      saveToLocal("carts", cartLocal);
    }
  };

  // Hàm cập nhật số lượng giảm
  const handleDecrease = (product: Cart) => {
    const findCart = cartLocal.findIndex((item) => item.id === product.id);
    if (findCart !== -1) {
      cartLocal[findCart].quantity -= 1;
      saveToLocal("carts", cartLocal);
    }
  };

  // Hàm xóa sản phẩm trong giỏ hàng
  const handleDelete = (product: Cart) => {
    const findCart = cartLocal.find((item) => item.id === product.id);
    if (findCart) {
      const confirmDelete = confirm(
        `Bạn có chắc chắn muốn xóa sản phẩm ${findCart.name} không?`
      );
      if (confirmDelete) {
        const filterCart = cartLocal.filter((cart) => cart.id !== product.id);
        saveToLocal("carts", filterCart);
      }
    }
  };
  return (
    <div>
      <div className="container">
        <div className="left-container">
          <a href="">Trang chủ</a>
          <a href="">Danh sách sản phẩm</a>
        </div>
        <div className="right-container">
          <button onClick={cartList}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          <span>{cartQuantity}</span>
        </div>
      </div>
      <br />
      <div className="listCart">
        {data.map((product: Cart) => (
          <div className="cart" key={product.id}>
            <img src={product.img} alt="" />
            <div>
              <p>${product.name}</p>
              <p>
                ${product.price} <u>đ</u>
              </p>
              <button onClick={() => handleAdd(product)}>
                <i className="fa-solid fa-cart-shopping"></i>
                <span>Thêm vào giỏ hàng</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <br />
      {showCart && (
        <Cart
          cartList={cartList}
          carts={cartLocal}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
