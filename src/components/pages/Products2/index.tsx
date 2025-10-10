import { Grid } from "@mui/material";
import PageBanner from "../../shared/PageBanner";
import { lazy, useEffect, useState } from "react";
import type { product } from "./types";
import "./styles.scss";
import Filters from "./Filters";

const Product = lazy(() => import("./Product"));

const Product2: React.FC = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState<product[]>([]);
  const [query, setQuery] = useState<string>("");
  const [categoryList, setCategoryList] = useState<string[] | unknown[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    getData();
  }, []);

  //Get data type title
  useEffect(() => {
    if (query !== "") {
      const newData = data.filter((item: product) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(newData);
    } else {
      setFilteredData(data); // Reset to full data list when search input is empty
    }
  }, [query, data]);

  //Get data on the bases of category
  useEffect(() => {
    if (selectedCategory === "none" || selectedCategory === "") {
      setFilteredData(data);
      return;
    }
    const newData: product[] = data.filter(
      (item: product) => item.category === selectedCategory
    );
    setFilteredData(newData);
  }, [selectedCategory, data]);

  //Get Data from api
  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const response = await res.json();
    const categoriesArray = response.map((item: product) => item.category);
    const categories = new Set(categoriesArray);
    setCategoryList([...categories]);
    setData(response);
    setFilteredData(response);
  };

  const handleIncrement = () => {
    const newData = [...filteredData].sort((a, b) => a.price - b.price);
    setFilteredData(newData);
  };

  const handleDecrement = () => {
    const newData = [...filteredData].sort((a, b) => b.price - a.price);
    setFilteredData(newData);
  };

  return (
    <>
      <PageBanner title={"Products 2"} />

      <Grid className="container pb-4 pt-4" spacing={3} container>
        <Grid size={12} container>
          <Filters
            query={query}
            setQuery={setQuery}
            categoryList={categoryList}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
        </Grid>
        <Grid size={12} container className="ProductWrapper">
          {filteredData &&
            filteredData.map((item) => (
              <Product
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
                rating={item.rating}
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Product2;
