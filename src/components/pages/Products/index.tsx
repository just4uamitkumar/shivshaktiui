import { Grid, TextField } from "@mui/material";

import PageBanner from "../../shared/PageBanner";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import type { ProductType } from "./type";
import Loader from "../../shared/Loader";
import Product from "./Product";
import { useDebounce } from "../../../utils/useDebounce";
import Pagination from "./Pagination";

const Products: React.FC = () => {
  const [ProductsList, setProductsList] = useState<ProductType[]>([]);
  const [filteredProductsList, setFilteredProductsList] = useState<
    ProductType[]
  >([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const debouncedValue = useDebounce(query, 500);
  const debouncedByName = useDebounce(name, 500);
  const debouncedByCategory = useDebounce(category, 500);
  const debouncedByMinPrice = useDebounce(minPrice, 500);
  const debouncedByMaxPrice = useDebounce(maxPrice, 500);

  useEffect(() => {
    getProducts();
  }, []);

  // Get Products by query
  useEffect(() => {
    const getSpecificProducts = async () => {
      setLoading(true);
      if (query !== "") {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${query}&limit=100`
        );
        setFilteredProductsList(response?.data?.products);
      } else {
        setFilteredProductsList(ProductsList); // Reset to full data list when search input is empty
      }
      setLoading(false);
    };
    if (debouncedValue) {
      getSpecificProducts();
    }
  }, [debouncedValue, query, ProductsList]);

  // Get Products by name
  useEffect(() => {
    if (debouncedByName && name !== "") {
      const filtered = ProductsList.filter((item) =>
        item.title.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredProductsList(filtered);
    } else {
      setFilteredProductsList(ProductsList); // Reset to full data list when search input is empty
    }
  }, [name, ProductsList, debouncedByName]);

  // Get Products by category
  useEffect(() => {
    if (debouncedByCategory && category !== "") {
      const filtered = ProductsList.filter((item) =>
        item.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProductsList(filtered);
    } else {
      setFilteredProductsList(ProductsList); // Reset to full data list when search input is empty
    }
  }, [category, ProductsList, debouncedByCategory]);

  // Get Products by min /max price
  useEffect(() => {
    if (
      debouncedByMinPrice &&
      debouncedByMaxPrice &&
      minPrice !== "" &&
      maxPrice !== ""
    ) {
      const filtered = ProductsList.filter(
        (item) =>
          item.price >= parseFloat(minPrice) &&
          item.price <= parseFloat(maxPrice)
      );
      setFilteredProductsList(filtered);
    } else if (debouncedByMinPrice && minPrice !== "" && maxPrice === "") {
      const filtered = ProductsList.filter(
        (item) => item.price >= parseFloat(minPrice)
      );
      setFilteredProductsList(filtered);
    } else if (debouncedByMaxPrice && maxPrice !== "" && minPrice === "") {
      const filtered = ProductsList.filter(
        (item) => item.price <= parseFloat(maxPrice)
      );
      setFilteredProductsList(filtered);
    } else {
      setFilteredProductsList(ProductsList); // Reset to full data list when search input is empty
    }
  }, [
    minPrice,
    maxPrice,
    ProductsList,
    debouncedByMinPrice,
    debouncedByMaxPrice,
  ]);

  const getProducts = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://dummyjson.com/products?limit=200"
    );
    setProductsList(response?.data?.products);
    setFilteredProductsList(response?.data?.products);
    setLoading(false);
  };

  const selectPageHandler = useCallback(
    (selectedPage: number) => {
      if (
        selectedPage >= 1 &&
        selectedPage <= ProductsList?.length / 10 &&
        selectedPage !== page
      ) {
        setPage(selectedPage);
      }
    },
    [ProductsList?.length, page]
  );

  return (
    <>
      <PageBanner title={"Products"} />

      <Grid className="container pb-4 pt-4" spacing={3} container>
        <Grid size={12} display={"flex"} flexWrap={"wrap"} gap={2}>
          <TextField
            value={query}
            variant="outlined"
            placeholder="Search products..."
            type="text"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setQuery(e.target.value)}
          />
          <TextField
            value={name}
            variant="outlined"
            type="text"
            placeholder="Search by name..."
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setName(e.target.value)}
          />
          <TextField
            value={category}
            variant="outlined"
            type="text"
            placeholder="Search by category..."
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setCategory(e.target.value)}
          />
          <TextField
            value={minPrice}
            variant="outlined"
            type="text"
            placeholder="Search by Min Price"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMinPrice(e.target.value)}
          />
          <TextField
            value={maxPrice}
            variant="outlined"
            type="text"
            placeholder="Search by Max Price"
            onChange={(
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => setMaxPrice(e.target.value)}
          />
        </Grid>
        {loading ? (
          <Loader />
        ) : (
          filteredProductsList?.length > 0 &&
          filteredProductsList
            ?.slice(page * 10 - 10, page * 10)
            ?.map((item: ProductType) => (
              <Product
                key={item?.id}
                id={item?.id}
                title={item?.title}
                thumbnail={item.thumbnail}
                price={item.price}
                discountPercentage={item.discountPercentage}
                category={item.category}
                brand={item.brand}
                shippingInformation={item.shippingInformation}
                availabilityStatus={item.availabilityStatus}
              />
            ))
        )}
        {filteredProductsList?.length > 0 && (
          <Grid size={12}>
            <Pagination
              ProductsList={filteredProductsList}
              selectPageHandler={selectPageHandler}
              page={page}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Products;
