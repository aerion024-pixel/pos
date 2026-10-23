import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppModal from "../../components/AppModal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/services/api";

const CategoryPage = () => {
  const _initForm = {
    id: null,
    name: "",
  };

  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(_initForm);
  const [isEdit, setIsEdit] = useState(false);

  const fetchCategories = async () => {
    try {
      // get All Users
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log("render ini");
    fetchCategories();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    setFormData(_initForm);
    setIsEdit(false);
  };

  const handleEditModal = (user) => {
    console.log(user);
    setShowModal(true);
    setIsEdit(true);
    setFormData(user);
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
      };
      if (isEdit) {
        // update data
        await api.put(`/category/${formData.id}`, payload);
        // setUsers(users.map((user) => (user.id === formData.id ? formData : user)));
      } else {
        // insert data
        await api.post("/category", payload);
      }
      setFormData(_initForm);
    } catch (error) {
      const errMsg = error.message;
      console.log(errMsg);
    } finally {
      await fetchCategories();
      setShowModal(false);
    }
    // jika edit data
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure want to delete this data?");
    if (confirmation) {
      // delete
      await api.delete(`/category/${id}`);
      fetchCategories();
    }
  };

  return (
    <>
      <Card className="shadow-sm border-border p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-bold">Data Category</CardTitle>
          </div>
          <Button onClick={handleOpenModal}>Create New Category</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-y bg-muted/30 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-6 whitespace-nowrap">{index + 1}</td>
                    <td>{category.name}</td>
                    <td className="px-4 py-6  whitespace-nowrap">
                      <Button onClick={() => handleEditModal(category)} size="sm" className="me-2 bg-green-600">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(category.id)} variant="destructive" size="sm" className="me-2">
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

      <AppModal show={showModal} onClose={handleCloseModal} title={isEdit ? "Edit Category" : "Create New Category"} onSubmit={handleSubmit} submitLabel={isEdit ? "Save Change" : "Save"}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your name" />
          </div>
        </div>
      </AppModal>
    </>
  );
};

export default CategoryPage;
