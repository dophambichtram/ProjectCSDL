import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Wrapper from "../../assets/styles/management";
import { Table, Tag } from "antd";
import { deleteOrder, getAllOrder } from "../../app/order/orderSlice";
import OrderDetail from "./components/OrderDetail/OrderDetail";
import Search from "../../components/Search/Search";

const Order = () => {
  const [showPopup, setShowPopup] = useState();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [search, setSearch] = useState("");

  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      width: "10%",
      align: "center",
    },
    {
      title: "Order number",
      dataIndex: "orderNumber",
      // render: (name) => `${name.first} ${name.last}`,
      width: "20%",
      align: "center",
    },
    {
      title: "Recipient Information",
      dataIndex: "recipientInformation",
      render: (r) => `${r?.recipientName} - ${r.recipientPhone}`,
      width: "20%",
      align: "center",
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      width: "20%",
      align: "center",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (createdAt) => `${new Date(createdAt).toLocaleString()}`,

      width: "20%",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: "10%",
      render: (_id, data) => {
        return (
          <div style={{ display: "flex" }}>
            <Tag
              color={"green"}
              onClick={() => handlePopup(data)}
              className="cursor-pointer"
            >
              DETAIL
            </Tag>
            <Tag
              color={"red"}
              onClick={() => handleDeleteOrder(_id)}
              className="cursor-pointer"
            >
              DELETE
            </Tag>
          </div>
        );
      },
      align: "center",
    },
  ];
  const listOrder = useSelector((state) => state.order.listOrder);
  const dispatch = useDispatch();

  const handlePopup = (data) => {
    setCurrentOrder(data);
    setShowPopup(!showPopup);
  };

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  useEffect(() => {
    async function fetchOrders() {
      try {
        const actionResult = await dispatch(getAllOrder({ q: search }));
        unwrapResult(actionResult);
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: error.message,
          showConfirmButton: true,
        });
      }
    }
    fetchOrders();
  }, [
    search,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  function handleDeleteOrder(_id) {
    Swal.fire({
      title: "Do you want to delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultDelete = await dispatch(deleteOrder(_id));
          unwrapResult(resultDelete);
          const actionResult = await dispatch(getAllOrder());
          unwrapResult(actionResult);
        } catch (error) {
          Swal.fire({
            icon: "warning",
            title: error.message,
            showConfirmButton: true,
          });
        }
      }
    });
  }

  return (
    <Wrapper>
      <h4>Order Management</h4>
      <hr />
      <Search
        state={search}
        setState={setSearch}
        placeholder="Search order number"
      />

      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={listOrder}
        pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
      />
      {showPopup && (
        <OrderDetail setShowPopup={setShowPopup} data={currentOrder} />
      )}
    </Wrapper>
  );
};

export default Order;
