import React, { useState, useEffect } from "react";
import "./product-page.scss";
import "react-multi-carousel/lib/styles.css";

import axios from "axios";
import Heropic from "../../assets/img/product/hero.png";
import High from "../../assets/img/product/highlight.png";
import Button from "../../components/common/button/button.jsx";
import Productcard from "../../components/common/product-card/product-card.jsx";
import Carousel from "react-multi-carousel";
import Pagination from "@mui/material/Pagination";
import PopUpChat from "../../components/common/PopUpChat.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    let _search = search;
    let _sortBy = sortBy;
    if (!search) {
      _search = "";
    }
    if (!sortBy) {
      _sortBy = "";
    }

    fetch(
      `http://localhost:3000/product/products?q=${_search}&sortBy=${_sortBy}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [search, sortBy]);

  useEffect(() => {
    fetch("http://localhost:3000/product/brands")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/product/types")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [inputValue, setInputValue] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 24;
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleAddToCart = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      product,
    ]);
  };

  const handleChange = (event, value) => {
    setPage(value);
    const elements = document.getElementsByClassName("prod-query-content");
    if (elements && elements[0]) {
      window.scrollTo({ top: elements[0].offsetTop, behavior: "smooth" });
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [iconState, setIconState] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setIconState(!iconState);
  };

  const [isExpanded2, setIsExpanded2] = useState(false);
  const [iconState2, setIconState2] = useState(false);

  const handleClick2 = () => {
    setIsExpanded2(!isExpanded2);
    setIconState2(!iconState2);
  };

  const handleBrandClick = (brand) => {
    fetch(`http://localhost:3000/product/products/brand/${brand}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error:", error));
    const elements = document.getElementsByClassName("prod-query-content");
    if (elements && elements[0]) {
      window.scrollTo({ top: elements[0].offsetTop, behavior: "smooth" });
    }
  };

  const handleTypeClick = (type) => {
    fetch(`http://localhost:3000/product/products/type/${type}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error:", error));
    const elements = document.getElementsByClassName("prod-query-content");
    if (elements && elements[0]) {
      window.scrollTo({ top: elements[0].offsetTop, behavior: "smooth" });
    }
  };

  const currentItems = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="product-page">
      <div className="main-container flex-col">
        <div className="section-container flex-col">
          <div className="hero-sct section flex-col">
            <div className="img-slider">
              <img src={Heropic} alt="hero-img" />
            </div>
          </div>
        </div>
        <div className="section-container flex-col">
          <div className="prod-query-sct section flex-col align-left">
            <div className="promo-collection-sct flex-row">
              <div className="collection-img flex-col">
                <img src={High} alt="" />
              </div>
              <div className="vt-divider"></div>
              <div className="collection-content flex-col gap-ms align-left">
                <h3 className="h3">GLASTING WATER TINT COLLECTION</h3>
                <div className="prod-collection-container prod-collection-scroll">
                  <Carousel
                    responsive={responsive}
                    containerClass="carousel-container"
                    itemClass="width-reset flex-col"
                    slidesToSlide={1}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                  >
                    {products.slice(0, 8).map((product, index) => (
                      <Productcard
                        product={product}
                        key={index}
                        onAddToCart={handleAddToCart}
                      ></Productcard>
                    ))}
                  </Carousel>
                </div>
                <p className="body-lgt collection-description">
                  Son Tint Nước Siêu Lì, Lâu Trôi Romand Glasting Water Tint là
                  son tint lì của thương hiệu Romand có chất son tint bóng tự
                  như một lớp màng nước lướt nhẹ trên môi, chứa nhiều dưỡng chất
                  giúp nuôi dưỡng đôi môi, son lên môi nhẹ và mướt mịn, dễ tán
                  đều cùng với bảng màu rực rỡ đa dạng mang đến cho bạn đôi môi
                  căng mọng tràn đầy sức sống, tự tin cả ngày dài.
                </p>
              </div>
            </div>
            <div className="prod-query-content flex-row align-left">
              <div className="filter-container flex-col gap-ms align-left">
                <div className="filter-sct flex-col align-left gap-sm">
                  <h4 className="h4 filter-title">COLLECTION</h4>
                  <div className="sub-filter-container flex-col align-left">
                    <Button
                      text="COLLECTION 1"
                      btnStyle="underline-btn"
                    ></Button>
                    <Button
                      text="COLLECTION 2"
                      btnStyle="underline-btn"
                    ></Button>
                    <Button
                      text="COLLECTION 3"
                      btnStyle="underline-btn"
                    ></Button>
                    <Button
                      text="COLLECTION 4"
                      btnStyle="underline-btn"
                    ></Button>
                  </div>
                </div>
                <div className="hr-divider"></div>
                <div className="filter-sct flex-col align-left gap-sm">
                  <h4 className="h4 filter-title">CATEGORY</h4>
                  <div className="sub-filter-container flex-col align-left">
                    <div
                      className={`types-btn-holder flex-col align-left ${
                        isExpanded2 ? "expanded" : ""
                      }`}
                    >
                      {types.map((type, index) => (
                        <Button
                          key={index}
                          text={type}
                          frameStyle="uppercase"
                          btnStyle="underline-btn"
                          onClick={() => handleTypeClick(type)}
                        ></Button>
                      ))}
                    </div>
                    <button
                      className="expand-contact-button flex-col"
                      onClick={handleClick2}
                    >
                      <i
                        className={`bi ${
                          isExpanded2 ? "bi-chevron-up" : "bi-chevron-down"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="hr-divider"></div>
                <div className="filter-sct flex-col align-left gap-sm">
                  <h4 className="h4 filter-title">BRAND</h4>
                  <div className="sub-filter-container brand-collection flex-col align-left">
                    <div
                      className={`brands-btn-holder flex-col align-left ${
                        isExpanded ? "expanded" : ""
                      }`}
                    >
                      {brands.map((brand, index) => (
                        <Button
                          key={index}
                          text={brand}
                          frameStyle="uppercase"
                          btnStyle="underline-btn"
                          onClick={() => handleBrandClick(brand)}
                        ></Button>
                      ))}
                    </div>
                    <button
                      className="expand-contact-button flex-col"
                      onClick={handleClick}
                    >
                      <i
                        className={`bi ${
                          isExpanded ? "bi-chevron-up" : "bi-chevron-down"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
                <div className="hr-divider"></div>
                <div className="filter-sct flex-col align-left gap-sm">
                  <h4 className="h4 filter-title">PRICE RANGE</h4>
                  <div className="sub-filter-container flex-col align-left">
                    <Button
                      text="PRICE RANGE 1"
                      btnStyle="underline-btn"
                    ></Button>
                    <Button
                      text="PRICE RANGE 2"
                      btnStyle="underline-btn"
                    ></Button>
                    <Button
                      text="PRICE RANGE 3"
                      btnStyle="underline-btn"
                    ></Button>
                    <Button
                      text="PRICE RANGE 4"
                      btnStyle="underline-btn"
                    ></Button>
                  </div>
                </div>
              </div>
              <div className="vt-divider"></div>
              <div className="prod-display flex-col align-left gap-md">
                <div className="product-dis-icon flex-row gap-md max-wdth">
                  <h3 className="h3">PRODUCT SEARCH BY INDEX</h3>
                  <div className="flex-row gap-xs">
                    <div className="product-collect3-search-bar">
                      <button
                        className="product-collect3-search-btn"
                        // onClick={() => set(inputValue)}
                      >
                        <i className="bi bi-search"></i>
                      </button>
                      <input
                        className="product-collect3-search-input body"
                        type="text"
                        placeholder="Search"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                    <div className="sort-filter-selected flex-row gap-2xs">
                      <select
                        name="sort"
                        className="body"
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="">Sort by</option>
                        <option value="price:1">Price: Low to High</option>
                        <option value="price:-1">Price: High to Low</option>
                        <option value="product_name:1">Name: A to Z</option>
                        <option value="product_name:-1">Name: Z to A</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="prod-grid gap-xs">
                  {currentItems.map((product, index) => (
                    <Productcard
                      key={index}
                      product={product}
                      onAddToCart={handleAddToCart}
                      expandDisable="disable"
                    ></Productcard>
                  ))}
                </div>
                <div className="pagination flex-col max-wdth">
                  <div className="flex-row">
                    <Pagination
                      count={Math.ceil(products.length / itemsPerPage)}
                      page={page}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PopUpChat />
      </div>
    </div>
  );
};
export default ProductPage;
