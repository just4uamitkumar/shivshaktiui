import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import type { ProductType } from "./type";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import IconBtn from "../../common/IconBtn";
import React from "react";

interface Props {
  ProductsList: ProductType[];
  selectPageHandler: (selectedPage: number) => void;
  page: number;
}

const Pagination: React.FC<Props> = ({
  ProductsList,
  selectPageHandler,
  page,
}) => {
  const [pageLength, setPageLength] = useState<number[]>([]);

  useEffect(() => {
    if (ProductsList.length > 0) {
      const n: number = ProductsList.length / 10;
      const pageItem = Array.from({ length: n }, (_, index) => index + 1);
      setPageLength(pageItem);
    }
  }, [ProductsList]);

  console.log("Pagination Component Rendered", {
    ProductsList,
    pageLength,
    page,
  });

  return (
    <Stack
      className="pagination"
      direction={"row"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <IconBtn
        IconComponent={FaRegArrowAltCircleLeft}
        onClick={() => selectPageHandler(page - 1)}
        iconClass={page > 1 ? "" : "disable"}
      />

      {pageLength &&
        pageLength.map((_, i) => {
          return (
            <span
              key={i}
              className={page === i + 1 ? "activePage" : ""}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          );
        })}
      <IconBtn
        IconComponent={FaRegArrowAltCircleRight}
        onClick={() => selectPageHandler(page + 1)}
        iconClass={page < ProductsList?.length / 10 ? "" : "disable"}
      />
    </Stack>
  );
};

export default React.memo(Pagination);
