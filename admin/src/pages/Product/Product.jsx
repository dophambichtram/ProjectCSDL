import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Wrapper from "../../assets/styles/management";
import { Button, Loading } from "../../components";
// import { PopupCategory, SearchProCate } from "./components";
import { Space, Table, Tag } from "antd";
import {
  addingProduct,
  deleteProduct,
  getAllProduct,
} from "../../app/product/productSlice";
import AddAndEditProductPopup from "./components/AddAndEditProductPopup/AddAndEditProductPopup";
import Search from "../../components/Search/Search";

const Product = () => {
  const columns = [
    {
      title: "No.",
      dataIndex: "No",
      width: "10%",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: "images",
      width: "10%",
      render: (images) => <img src={images[0]} style={{ width: "100px" }} />,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "product_name",
      width: "30%",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "product_type",
      align: "center",
      width: "10%",
    },
    {
      title: "Brands",
      dataIndex: "brands",
      width: "10%",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
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
            onClick={() => handleDeleteProduct(_id)}
            className="cursor-pointer"
          >
            DELETE
          </Tag>
        );
      },
      align: "center",
    },
  ];
  const listProduct = useSelector((state) => state.product.listProduct);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const actionResult = await dispatch(getAllProduct({ q: search }));
        unwrapResult(actionResult);
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: error.message,
          showConfirmButton: true,
        });
      }
    }
    fetchProducts();
  }, [
    search,
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
  ]);

  function handleDeleteProduct(_id) {
    Swal.fire({
      title: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultDeleteProduct = await dispatch(deleteProduct(_id));
          unwrapResult(resultDeleteProduct);
          const actionResult = await dispatch(getAllProduct());
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
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const handleAdd = () => {
    dispatch(addingProduct());
    setShowPopup(!showPopup);
  };
  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Wrapper>
      <h4>Product Management</h4>
      <hr />
      <Search
        state={search}
        setState={setSearch}
        placeholder="Search product name"
      />

      <div className="btn-container">
        <Button
          classname="btn-custom btn-icon"
          text="Add Product"
          icon={<BiPlusCircle className="front-icon" />}
          handleFunction={handleAdd}
        />
      </div>

      <Table
        columns={columns}
        rowKey={(record) => record._id}
        dataSource={listProduct}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />

      {showPopup && (
        <AddAndEditProductPopup
          setShowPopup={handlePopup}
          title="Add Product"
        />
      )}
    </Wrapper>
  );
};

export default Product;
