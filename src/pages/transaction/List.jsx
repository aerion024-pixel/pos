import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "../../components/AppModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/services/api";

const ListTransaction = () => {
  const navigate = useNavigate()
  const _initForm = {
    id: null,
    name: "",
    email: "",
    password: "",
    is_active: 1,
  };

  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);
  const fetchTransaction = async () => {
    try {
      // get All transactions
      const response = await api.get("/transaction");
      setTransactions(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (transaction) => {
    console.log(transaction);
    setShowModal(true);
    setIsEdit(true);
    setFormData(transaction);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_active: parseInt(formData.is_active),
      };
      if (isEdit) {
        // update data
        await api.put(`/user/${formData.id}`, payload);
        // setTransactions(transactions.map((user) => (user.id === formData.id ? formData : user)));
      } else {
        // insert data
        await api.post("/user", payload);
        // const newUser = {
        //   ...formData,
        //   id: Date.now(),
        // };

        // setTransactions([...transactions, newUser]);
      }
      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      fetchTransaction();
      setShowModal(false);
    }
    // jika edit data
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      // delete
      await api.delete(`/user/${id}`);
      fetchTransaction();
      // setTransactions(transactions.filter((u) => u.id !== id));
    }
    // filter: transactions
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Transaction</CardTitle>
          </div>
          <Button onClick={() => navigate("/transaction/create")}>Create New Transaction</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h4 className="mb-0 fw-bold">Data Transaction</h4>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Order Number</th>
                <th className="px-6 py-3 font-medium">Payment Method</th>
                <th className="px-6 py-3 font-medium">Products</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{transaction.order_number}</td>
                    <td>{transaction.payment_method === 1 ? "Gopay" : "Cash"}</td>
                    <td>
                      {transaction.items.map((item) => (
                        <ul>
                          <li>{item.name}</li>
                        </ul>
                      ))}
                    </td>

                    <td className="px-4 py-6 whitespace-nowrap">
                      <Button onClick={() => handleEditModal(transaction)} size="sm" className="me-2 bg-green-600">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(transaction.id)} variant="destructive" size="sm" className="me-2">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    Belum ada data user
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit User" : "Transaction"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Change" : "Save"}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required={isEdit ? false : true} placeholder="Enter your password" />
          </div>
          {isEdit ? (
            <div className="space-y-2">
              <Label>Activation</Label>
              <RadioGroup value={String(formData.is_active)} onValueChange={(val) => setFormData({ ...formData, is_active: parseInt(val) })} className="w-fit flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0" id="inactive" />
                  <Label htmlFor="inactive">In-Active</Label>
                </div>
              </RadioGroup>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter your name" required value={formData.name} onChange={handleChange}></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control value={formData.email} onChange={handleChange} type="email" name="email" placeholder="Enter your email" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control value={formData.password} onChange={handleChange} type="password" name="password" placeholder="Enter your passwod" required></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select One</option>
              <option value="Active">Publish</option>
              <option value="In Active">Draft</option>
            </Form.Select>
          </Form.Group>
        </Form> */}
      </AppModal>
    </>
  );
};

export default ListTransaction;
