import { useEffect, useState } from "react";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  const [editingId, setEditingId] = useState(null);

  const loadProducts = async () => {
    const res = await api.get("/products/");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submitProduct = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/products/${editingId}`, form);
    } else {
      await api.post("/products/", form);
    }

    setForm({
      name: "",
      sku: "",
      price: "",
      quantity: "",
    });

    setEditingId(null);

    loadProducts();
  };

  const editProduct = (product) => {
    setEditingId(product.id);

    setForm({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  return (
    <div>
      <h2>Products</h2>

      <form onSubmit={submitProduct}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) =>
            setForm({ ...form, sku: e.target.value })
          }
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Quantity"
          type="number"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: e.target.value })
          }
        />

        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {products.map((p) => (
        <div key={p.id}>
          <h4>{p.name}</h4>

          <p>SKU: {p.sku}</p>
          <p>Price: ₹{p.price}</p>
          <p>Stock: {p.quantity}</p>

          <button onClick={() => editProduct(p)}>
            Edit
          </button>

          <button
            onClick={() => deleteProduct(p.id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}