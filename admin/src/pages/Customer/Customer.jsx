import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Wrapper from "../../assets/styles/management";
import { Space, Table, Tag } from "antd";
import { deleteUser, getAllCustomer } from "../../app/customer/customerSlice";
import Search from "../../components/Search/Search";

const Customer = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      width: "10%",
      align: "center",
    },
    {
      title: "Full name",
      dataIndex: "fullName",
      width: "40%",
      align: "center",
    },
    {
      title: "email",
      dataIndex: "email",
      width: "40%",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: "10%",
      render: (_, { _id }) => {
        return (
          <Tag
            color={"red"}
            onClick={() => handleDeleteUser(_id)}
            className="cursor-pointer"
          >
            DELETE
          </Tag>
        );
      },
      align: "center",
    },
  ];
  const [search, setSearch] = useState("");
  const listCustomer = useSelector((state) => state.customer.listCustomer);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const actionResult = await dispatch(getAllCustomer({ q: search }));
        unwrapResult(actionResult);
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: error.message,
          showConfirmButton: true,
        });
      }
    };
    fetchCustomer();
  }, [
    search,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
  ]);

  function handleDeleteUser(_id) {
    Swal.fire({
      title: "Do you want to delete this customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultDeleteUser = await dispatch(deleteUser(_id));
          unwrapResult(resultDeleteUser);
          const resultGetAllCustomer = await dispatch(getAllCustomer());
          unwrapResult(resultGetAllCustomer);
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

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <Wrapper>
      <h4>Customer Management</h4>
      <hr />
      <Search
        state={search}
        setState={setSearch}
        placeholder="Search name user"
      />
      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={listCustomer}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </Wrapper>
  );
};

export default Customer;
