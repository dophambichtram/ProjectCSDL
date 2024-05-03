import { useEffect, useState } from "react";
import Wrapper from "./style";
import { Table } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../../../../components";
function OrderDetail({ setShowPopup, data }) {
  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      width: "10%",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "productImage",
      width: "10%",
      render: (productImage) => (
        <img src={productImage} style={{ width: "100px" }} />
      ),
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "productName",
      width: "30%",
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      width: "10%",
    },
    {
      title: "Unit price",
      dataIndex: "productUnitPrice",
      width: "10%",
      align: "center",
    },
    {
      title: "Total price",
      render: (_, { quantity, productUnitPrice }) =>
        quantity * productUnitPrice,
      width: "10%",
      align: "center",
    },
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [orderDetail, setOrderDetail] = useState([]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = [];
        for (let product of data.products) {
          const response = await fetch(
            `http://localhost:3000/product/products/${product.id}`
          );
          const data = await response.json();
          products.push(data);
        }
        const _orderDetail = [];
        data.products.map((item, index) => {
          const product = products.find((product) => product._id === item.id);
          _orderDetail.push({
            No: index + 1,
            productImage: product.images[0],
            productUnitPrice: product.price,
            productName: product.product_name,
            quantity: item.quantity,
          });
        });
        setOrderDetail(_orderDetail);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <Wrapper>
      {" "}
      <div className="container">
        <h4>Order detail #{data.orderNumber}</h4>
        <hr />
        <Table
          columns={columns}
          rowKey={(record) => record.No}
          dataSource={orderDetail}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
        <br />
        <p>
          <b>Total price:</b> {data?.totalPrice} đ
        </p>
        <p>
          <b>Receipt Name: </b>
          {data?.recipientInformation?.recipientName}
        </p>
        <p>
          <b>Receipt Phone: </b>
          {data?.recipientInformation?.recipientPhone}
        </p>
        <p>
          <b>Receipt Address: </b>
          {data?.recipientInformation?.recipientAddress}
        </p>
        <div className="btn-container-product">
          <Button
            type="button"
            classname="btn-custom  btn-icon btn-delete"
            text="Cancel"
            icon={<AiOutlineDelete className="front-icon" />}
            handleFunction={() => setShowPopup((state) => !state)}
          />
        </div>
      </div>
    </Wrapper>
  );
}

export default OrderDetail;
