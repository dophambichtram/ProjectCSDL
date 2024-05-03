import { FastField, Form, Formik } from "formik";
import { AiOutlineDelete } from "react-icons/ai";
import { BiPlusCircle } from "react-icons/bi";
import Wrapper from "./style";
import {
  Button,
  FormRow,
  FormRowTextArea,
  Loading,
} from "../../../../components";
import React, { useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import {
  createProduct,
  getAllProduct,
  uploadProductImg,
} from "../../../../app/product/productSlice";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { validationProduct } from "../../../../schema";

const defaultProduct =
  "https://curie.pnnl.gov/sites/default/files/default_images/default-image_0.jpeg";
const numDetailImages = 3;

export default function AddAndEditProductPopup({
  isEditing,
  setShowPopup,
  title,
  isLoading,
}) {
  const [variants, setVariants] = useState([""]);
  const uploadFileRef = useRef(null);
  const uploadFileDetailRefs = Array(numDetailImages)
    .fill(null)
    .map(() => React.createRef(null));
  const [thumbnail, setThumbnail] = useState(defaultProduct);
  const [images, setImages] = useState([
    defaultProduct,
    defaultProduct,
    defaultProduct,
  ]);
  const dispatch = useDispatch();

  const handChangeUploadThumbnail = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const result = await dispatch(uploadProductImg(file));
        unwrapResult(result);
        setThumbnail(result.payload.url);
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: error.message,
          showConfirmButton: true,
        });
      }
    }
  };

  const handChangeUploadDetail = async (event, index) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      try {
        const result = await dispatch(uploadProductImg(file));
        unwrapResult(result);
        let newImages = [...images];
        newImages[index] = result.payload.url;
        setImages(newImages);
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: error.message,
          showConfirmButton: true,
        });
      }
    }
  };
  function handleChangeVariants(type, index) {
    if (type === "add") {
      setVariants(variants.concat([""]));
    } else if (type === "minus") {
      setVariants([...variants.slice(0, index), ...variants.slice(index + 1)]);
    }
  }
  const handleSubmit = async (currentProduct) => {
    const product_images = [...images];
    product_images.unshift(thumbnail);
    const data = {
      price: currentProduct.price,
      product_type: currentProduct.type,
      brands: currentProduct.brands,
      product_name: currentProduct.name,
      variants: variants.filter((i) => i),
      images: product_images,
      tab_data: {
        description: currentProduct.description.split("\n"),
      },
    };
    try {
      const resultCreateProduct = await dispatch(createProduct(data));
      unwrapResult(resultCreateProduct);
      const resultGetAllProduct = await dispatch(getAllProduct());
      unwrapResult(resultGetAllProduct);

      setShowPopup();
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: error.message,
        showConfirmButton: true,
      });
    }
  };
  const initialValues = isEditing
    ? currentProduct
    : {
        name: "",
        type: "",
        price: "",
        brands: "",
        description: "",
      };
  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationProduct}
      >
        {(formikProps) => {
          return (
            <Form className="form-product">
              <h5>{title}</h5>
              <hr />
              <div className="form-center-product">
                <div className="form-center-product-container">
                  <p>Product Thumbnail</p>
                  <img
                    src={thumbnail}
                    className="imagePreview"
                    onClick={() => uploadFileRef.current.click()}
                  />
                  <input
                    ref={uploadFileRef}
                    id="uploadFile"
                    type="file"
                    name="image"
                    onChange={handChangeUploadThumbnail}
                    accept="image/*"
                  />

                  <FastField
                    name="name"
                    component={FormRow}
                    type="text"
                    labelText="Product name"
                    placeholder="Product name"
                  />
                  <FastField
                    name="type"
                    component={FormRow}
                    type="text"
                    labelText="Product type"
                    placeholder="Product type"
                  />
                  <FastField
                    name="price"
                    component={FormRow}
                    type="number"
                    labelText="Product price"
                    placeholder="Product price"
                  />
                  <FastField
                    name="brands"
                    component={FormRow}
                    type="text"
                    labelText="Product brand"
                    placeholder="Product brand"
                  />
                  <div>
                    <p>Variants</p>
                    {variants.map((item, index) => (
                      <div
                        key={index}
                        className="form-unit"
                        style={{ alignItems: "normal" }}
                      >
                        <input
                          placeholder="Add variant"
                          type="text"
                          className="form-unit-input"
                          style={{ marginBottom: "10px" }}
                          value={variants[index]}
                          onChange={(e) => {
                            let newArray = [...variants];
                            newArray[index] = e.target.value;
                            setVariants(newArray);
                          }}
                        />
                        <span
                          className="cursor-pointer"
                          onClick={() => handleChangeVariants("minus", index)}
                        >
                          <MdDeleteOutline />
                        </span>
                      </div>
                    ))}
                    <Button
                      classname="btn-outline"
                      type="button"
                      text="+ Add Variant"
                      handleFunction={() => handleChangeVariants("add")}
                    ></Button>
                  </div>
                  <br />
                  <FastField
                    name="description"
                    component={FormRowTextArea}
                    labelText="Description"
                    placeholder="Description"
                  />
                  <div className="product-detail">
                    <p>Product Detail</p>
                    <div className="product-detail-images">
                      {images.map((_, index) => {
                        return (
                          <div key={index}>
                            <img
                              src={images[index]}
                              className="imagePreview"
                              onClick={() =>
                                uploadFileDetailRefs[index].current.click()
                              }
                            />
                            <input
                              ref={uploadFileDetailRefs[index]}
                              id="uploadFile"
                              type="file"
                              name="image"
                              onChange={(e) => handChangeUploadDetail(e, index)}
                              accept="image/*"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="btn-container-product">
                  {isLoading ? (
                    <Loading center />
                  ) : (
                    <>
                      <Button
                        type="submit"
                        classname="btn-custom  btn-icon"
                        text={isEditing ? "Cập Nhật" : "Add"}
                        icon={<BiPlusCircle className="front-icon" />}
                      />
                      <Button
                        type="button"
                        classname="btn-custom  btn-icon btn-delete"
                        text="Cancel"
                        icon={<AiOutlineDelete className="front-icon" />}
                        handleFunction={setShowPopup}
                      />
                    </>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
}
