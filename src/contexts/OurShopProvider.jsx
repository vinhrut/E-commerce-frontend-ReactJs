import { useEffect } from "react";
import { createContext, useState } from "react";
import { getProducts, filterProducts } from "../apis/productsService";

export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
  const sortOptions = [
    { label: "Mặc định", value: "createdAt_desc" },
    { label: "Giá: Thấp → Cao", value: "price_asc" },
    { label: "Giá: Cao → Thấp", value: "price_desc" },
    { label: "Mới nhất", value: "createdAt_desc" },
  ];

  const showOptions = [
    { label: "8", value: 8 },
    { label: "12", value: 12 },
    { label: "Tất cả (20)", value: 20 },
  ];

  const [sortId, setSortId] = useState("createdAt_desc");
  const [showId, setShowId] = useState(8);
  const [isShowGrid, setIsShowGrid] = useState(true);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  // Parse sortId → sortBy + direction
  const parseSortId = (id) => {
    const [sortBy, direction] = id.split("_");
    return { sortBy, direction };
  };

  const fetchProducts = (pageNum = 0, append = false) => {
    const { sortBy, direction } = parseSortId(sortId);
    const hasFilter = Object.keys(filterValues).length > 0;

    const action = hasFilter
      ? filterProducts(filterValues, { page: pageNum, size: showId, sortBy, direction })
      : getProducts(); // simple list, no pagination on public endpoint

    setIsLoading(true);
    action
      .then((res) => {
        if (res.code === 1000) {
          // getProducts trả List, filterProducts trả Page (có .result.content)
          const data = res.result;
          const list = Array.isArray(data) ? data : data.content || [];
          const totalElements = Array.isArray(data) ? data.length : data.totalElements || 0;

          setProducts(append ? (prev) => [...prev, ...list] : list);
          setTotal(totalElements);
          setPage(pageNum);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        setIsLoadMore(false);
      });
  };

  const handleLoadMore = () => {
    setIsLoadMore(true);
    fetchProducts(page + 1, true);
  };

  const handleFilter = (values) => {
    setFilterValues(values);
  };

  useEffect(() => {
    fetchProducts(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortId, showId, filterValues]);

  const values = {
    sortOptions,
    showOptions,
    setShowId,
    setSortId,
    setIsShowGrid,
    products,
    isShowGrid,
    isLoading,
    handleLoadMore,
    handleFilter,
    total,
    isLoadMore,
  };

  return (
    <OurShopContext.Provider value={values}>{children}</OurShopContext.Provider>
  );
};

