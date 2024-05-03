import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./payment-page.scss";
import dongFormatter from "../../utils/dongFormatter/dongFormatter.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const initialValue = {
  cardNumber: "",
  name: "",
  expireDate: "",
  cvv: "",
  recipientName: "",
  recipientPhone: "",
  recipientAddress: "",
};
const PaymentPage = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [paymentInformation, setPaymentInformation] = useState(initialValue);
  const [orderDetail, setOrderDetails] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");
        if (!authToken) {
          throw new Error(
            "User not logged in. Please log in to view cart items."
          );
        }

        const response = await fetch("http://localhost:3000/cart", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const cartItems = Array.isArray(data)
          ? data
          : data && Array.isArray(data.items)
          ? data.items
          : [];

        const products = [];
        for (let product of cartItems) {
          const response = await fetch(
            `http://localhost:3000/product/products/${product.productId}`
          );
          const data = await response.json();
          products.push(data);
        }

        const _orderDetail = [];
        for (let item of cartItems) {
          const product = products.find(
            (product) => product._id === item.productId
          );
          _orderDetail.push({
            productId: item.productId,
            productPrice: product.price,
            productName: product.product_name,
            quantity: item.quantity,
          });
        }
        setOrderDetails(_orderDetail);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const subtotal = calculateSubtotal();
    const delivery = calculateDelivery();
    const discount = calculateDiscount(subtotal);
    const tax = calculateTax(subtotal);
    const total = calculateTotal(subtotal, delivery, discount, tax);
    setTotal(total);
  }, [orderDetail]);

  const calculateSubtotal = () =>
    orderDetail.length > 0
      ? orderDetail.reduce(
          (total, product) => total + product.productPrice * product.quantity,
          0
        )
      : 0;

  const calculateDelivery = () => 5.0;

  const calculateDiscount = (subtotal) => subtotal * 0.2; // 20% discount

  const calculateTax = (subtotal) => subtotal * 0.1; // 10% tax

  const calculateTotal = (subtotal, delivery, discount, tax) => {
    return subtotal + delivery - discount + tax;
  };

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  const handleConfirmOrder = async () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt hàng không?")) {
      for (let key in paymentInformation) {
        if (
          typeof paymentInformation[key] === "string" &&
          paymentInformation[key].trim() === ""
        ) {
          toast.error("Please enter all fields", {
            position: "top-right",
          });
          return;
        }
      }

      const data = {
        recipientInformation: paymentInformation,
        products: orderDetail,
        totalPrice: total,
      };
      try {
        await axios.post("http://localhost:3000/order", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setShowSuccessMessage(true);
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
        });
      }
    }
  };

  const renderSelectedProducts = () =>
    orderDetail.length > 0
      ? orderDetail.map((product) => (
          <div key={product.productId} className="order-detail">
            <div className="body-sml">
              {`${product.productName} - Quantity: ${product.quantity}`}
            </div>
            <div className="body-sml">
              {dongFormatter(product.productPrice)}
            </div>
          </div>
        ))
      : null;

  return (
    <div className="payment-page">
      <div className="LinkADD">
        <Link className="LinkOB" to="/">
          HOME
        </Link>
        <span> / </span>
        <Link className="LinkOB" to="/cart">
          CART
        </Link>
      </div>
      <div className="main-UI">
        <div className="payment-detail">
          <div className="h4 title">Payment Detail</div>
          <div className="payment-table">
            <div className="action-bar-parent">
              <div className="card">
                <div className="body-bld-white">Credit/Debit card</div>
              </div>
              <div className="action-bar-child body">Paypal</div>
              <div className="action-bar-child body">E-Wallet</div>
              <div className="action-bar-child body">COD</div>
            </div>
            <div className="selection-table">
              <div className="left-info">
                <div className="VCB">
                  <p className="body card-text">Vietcombank</p>
                  <p className=" card-textbody">*** **** **99</p>
                  <i className="bi bi-exclude"></i>
                </div>
                <div className="vietin">
                  <p className="body card-text">Vietinbank</p>
                  <p className="body card-text">*** **** **99</p>
                  <i className="bi bi-exclude"></i>
                  {/* <exclude /> */}
                </div>
                <div className="new-card">
                  <p className="body card-text">New</p>
                  <i className="bi bi-plus-lg"></i>
                </div>
              </div>
              <div className="right-frame">
                <div className="card-num">
                  <label htmlFor="" className="body">
                    Card Number
                  </label>
                  <div className="form-card-num">
                    <input
                      type="text"
                      inputMode="numeric"
                      className="fill-num"
                      value={paymentInformation.cardNumber}
                      onChange={(e) => {
                        setPaymentInformation({
                          ...paymentInformation,
                          cardNumber: e.target.value,
                        });
                      }}
                    />
                    <select
                      className="card-type-list body"
                      defaultValue="credit"
                    >
                      <option value="credit">Card Type</option>
                      <option value="debit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                    </select>
                  </div>
                </div>
                <div className="name-fill">
                  <label htmlFor="" className="body">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-name-fill"
                    value={paymentInformation.name}
                    onChange={(e) => {
                      setPaymentInformation({
                        ...paymentInformation,
                        name: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="expi-cvv">
                  <div className="expi-date">
                    <label htmlFor="" className="body">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      className="expi-fill"
                      value={paymentInformation.expireDate}
                      onChange={(e) => {
                        setPaymentInformation({
                          ...paymentInformation,
                          expireDate: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="cvv">
                    <label htmlFor="" className="body">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="cvv-fill"
                      value={paymentInformation.cvv}
                      onChange={(e) => {
                        setPaymentInformation({
                          ...paymentInformation,
                          cvv: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="name-fill">
                  <label htmlFor="" className="body">
                    Recipient name
                  </label>
                  <input
                    type="text"
                    className="form-name-fill"
                    value={paymentInformation.recipientName}
                    onChange={(e) => {
                      setPaymentInformation({
                        ...paymentInformation,
                        recipientName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="name-fill">
                  <label htmlFor="" className="body">
                    Recipient phone
                  </label>
                  <input
                    type="text"
                    className="form-name-fill"
                    value={paymentInformation.recipientPhone}
                    onChange={(e) => {
                      setPaymentInformation({
                        ...paymentInformation,
                        recipientPhone: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="name-fill">
                  <label htmlFor="" className="body">
                    Recipient address
                  </label>
                  <input
                    type="text"
                    className="form-name-fill"
                    value={paymentInformation.recipientAddress}
                    onChange={(e) => {
                      setPaymentInformation({
                        ...paymentInformation,
                        recipientAddress: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="btn">
                  <div className="action-btn button_2">
                    <Link to="" className="LinkBut">
                      <button
                        className="ButtonConfirm"
                        onClick={handleConfirmOrder}
                      >
                        <i className="bi bi-check-circle"></i>
                        <span>CONFIRM</span>
                      </button>
                    </Link>
                  </div>
                  <div className="action-btn button_2">
                    <Link to="/cart" className="LinkBut">
                      <button className="ButtonCancel">
                        <i className="bi bi-x-circle"></i>
                        <span>CANCEL</span>
                      </button>
                    </Link>
                  </div>
                </div>

                {showSuccessMessage && (
                  <div className="success-message">
                    <p>Đặt hàng thành công!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="billing-detail">
          <div className="bill-title">
            <div className="h4">Billing Detail</div>
            {/* <div className="name body">{cartInfo?.customerName}</div> */}
          </div>
          <div className="order-sum">
            <div className="order-sum-title">
              <div className="body-bld OST">Order Summary</div>
              <div className="body-bld">Price</div>
            </div>

            {renderSelectedProducts()}
          </div>

          <div className="subtotal">
            <div className="body-bld">Subtotal</div>
            <div className="sub-line">
              <div className="body-sml left-item">Delivery</div>
              <div className="body-sml">
                {dongFormatter(calculateDelivery())}
              </div>
            </div>
            <div className="sub-line">
              <div className="body-sml left-item">Discount</div>
              <div className="body-sml">
                - {dongFormatter(calculateDiscount(calculateSubtotal()))} (20%)
              </div>
            </div>
            <div className="sub-line">
              <div className="body-sml left-item">Tax</div>
              <div className="body-sml">
                {dongFormatter(calculateTax(calculateSubtotal()))} (10%)
              </div>
            </div>
          </div>

          <div className="total">
            <div className="total-title body-bld">Total</div>
            <div className="total-cost body-bld">{formatCurrency(total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
