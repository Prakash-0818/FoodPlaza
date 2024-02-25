import "./cartstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  removeSingleItems,
  emptyCart,
} from "../redux/feature/cartSlice";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

const CartDetails = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [countItem, setCountItem] = useState(0);

  const { carts } = useSelector((state) => state.allcart);
  //add to cart
  const dispatch = useDispatch();
  const incrementQty = (e) => {
    dispatch(addToCart(e));
  };

  //delete single item from cart
  const deleteCart = (e) => {
    dispatch(removeFromCart(e));
    toast.success("Item deleted from cart");
  };

  //decrease qty
  const decreaseQty = (e) => {
    dispatch(removeSingleItems(e));
  };

  //clear cart
  const clearcart = () => {
    dispatch(emptyCart());
    toast.success("Your cart is empty now");
  };

  //total price function
  const total = () => {
    let totalprice = 0;
    carts.map((ele, index) => {
      totalprice = ele.price * ele.qnty + totalprice;
    });
    setTotalPrice(totalprice);
  };

  const totalItem = () => {
    let Titem = 0;
    carts.map((ele, index) => {
      Titem = ele.qnty + Titem;
    });
    setCountItem(Titem);
  };

  useEffect(
    () => {
      total();
      totalItem();
    },
    [total,totalItem]
  );

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  cart calculation ({carts.length})
                </h5>
                {carts.length > 0 ? (
                  <>
                    <Link to="/" className="text-decoration-none">
                      <button
                        className="btn btn-warning"
                        variant="outline-light"
                      >
                        Add More Item
                      </button>
                    </Link>

                    <button
                      onClick={() => clearcart()}
                      className="btn btn-danger mt-0"
                    >
                      <i className="fa-solid fa-trash pr-2"></i>
                      <span>EmptyCart</span>
                    </button>
                  </>
                ) : (
                  <Link to="/" className="text-decoration-none">
                    <button className="btn btn-warning" variant="outline-light">
                      Buy Now
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <i className="fa-solid fa-cart-shopping"></i>
                          <p>Your cart is empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        {" "}
                        <span id="amount" className="amount">
                          Total amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <button
                                onClick={() => deleteCart(data.id)}
                                className="prdct-delete"
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </td>
                            <td>
                              <div className="product-img">
                                <img src={data.imgdata} alt=""></img>
                              </div>
                            </td>
                            <td>
                              <div className="product-name">
                                <p>{data.dish}</p>
                              </div>
                            </td>
                            <td>
                              <div className="product-price">
                                <p>{data.price}₹</p>
                              </div>
                            </td>
                            <td>
                              <div className="prdct-qty-container">
                                <button
                                  onClick={
                                    data.qnty <= 1
                                      ? () => deleteCart(data.id)
                                      : () => decreaseQty(data)
                                  }
                                  className="prdct-qty-btn"
                                  type="button"
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                                <input
                                  type="text"
                                  disabled
                                  className="qty-input-box"
                                  value={data.qnty}
                                  name=""
                                />
                                <button
                                  onClick={() => incrementQty(data)}
                                  className="prdct-qty-btn"
                                  type="button"
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="text-right">
                              {data.price * data.qnty} ₹
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th className="">
                        Items in Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{countItem}</span>
                      </th>
                      <th className="text-right">
                        Total Price<span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalPrice} ₹</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
