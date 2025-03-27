import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookName, sortBooks } from "./redux/slice.js";

const Tables = () => {
  const dispatch = useDispatch();
  const { products, loading, error, sortField, sortOrder } = useSelector((state) => state.books);

  // Dropdown state for sorting options
  const [selectedField, setSelectedField] = useState(sortField);
  const [selectedOrder, setSelectedOrder] = useState(sortOrder);

  useEffect(() => {
    dispatch(fetchBookName());
  }, [dispatch]);

  const handleSortChange = () => {
    dispatch(sortBooks({ field: selectedField, order: selectedOrder }));
  };

  return (
    <div>
    <h1>Books List</h1>
      <div>
        <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
          <option value="title">Title</option>
          <option value="brand">Author</option>
          <option value="category">Publisher</option>
        </select>
        
        <select value={selectedOrder} onChange={(e) => setSelectedOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button onClick={handleSortChange}>Sort</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <table style={{ border: "1px solid white", width: "100%", marginTop: "20px", textAlign: "left" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid white" }}>Title</th>
            <th style={{ border: "1px solid white" }}>Author</th>
            <th style={{ border: "1px solid white" }}>Publisher</th>
            <th style={{ border: "1px solid white" }}>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No Data</td>
              <td>No Data</td>
              <td>No Data</td>
              <td>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
