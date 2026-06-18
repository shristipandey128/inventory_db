import { useEffect, useState } from "react";
import api from "../services/api";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const [editingId, setEditingId] = useState(null);

  const loadCustomers = async () => {
    const res = await api.get("/customers/");
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const submitCustomer = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(
        `/customers/${editingId}`,
        form
      );
    } else {
      await api.post("/customers/", form);
    }

    setForm({
      full_name: "",
      email: "",
      phone: "",
    });

    setEditingId(null);

    loadCustomers();
  };

  const editCustomer = (customer) => {
    setEditingId(customer.id);

    setForm({
      full_name: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    });
  };

  const deleteCustomer = async (id) => {
    await api.delete(`/customers/${id}`);
    loadCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>

      <form onSubmit={submitCustomer}>
        <input
          placeholder="Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({
              ...form,
              full_name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value,
            })
          }
        />

        <button type="submit">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      {customers.map((c) => (
        <div key={c.id}>
          <h4>{c.full_name}</h4>

          <p>{c.email}</p>
          <p>{c.phone}</p>

          <button
            onClick={() => editCustomer(c)}
          >
            Edit
          </button>

          <button
            onClick={() => deleteCustomer(c.id)}
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}