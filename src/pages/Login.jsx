import { useState } from "react";
// import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import api from "@/services/api.js";

export default function Login() {
  const navigate = useNavigate();
  const _initialForm = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(_initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    // prev : params
    // console.log(`Input change  ${e.target.name} = ${e.target.value}`);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // setFormData(function(prev){})
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", formData);
      console.log(res);

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center">
          {/* <div className="mb-2 flex h-12 w-12 items-start justify-center rounded-sm shadow"></div> */}
          <h1 className="text-2xl font-bold tracking-tight">Point Of Sales | PPKD JP</h1>
          <p className="text-sm text-muted">Point Of Sales</p>
        </div>

        <Card className="shadow-lg border-border p-6">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg font-semibold">Sign In your Account</CardTitle>
            <CardDescription>Enter your credential</CardDescription>
            {errorMsg && <p className="text-red-900">{errorMsg}</p>}
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required autofocus />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-3">
              <Button type="submit" className="w-full">
                {isLoading ? "Please Wait..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
    // <Container
    //   className="d-flex align-items-center
    //      justify-content-center min-vh-100"
    // >
    //   <div className="w-100 d-flex align-items-center justify-content-center">
    //     <Card className="shadow" style={{ width: "400px" }}>
    //       <Card.Body className="p-4">
    //         <h2 className="font-weight-bold text-center mb-4">Login Form</h2>

    //         <Form>
    //           <Form.Group className="mb-3">
    //             <Form.Label>Email</Form.Label>
    //             <Form.Control name="email" value={formData.email} onChange={handleChange} type="email" required></Form.Control>
    //           </Form.Group>
    //           {/* SSO : */}
    //           <Form.Group className="mb-3">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control name="password" onChange={handleChange} type="password" value={formData.password} required></Form.Control>
    //           </Form.Group>
    //           <Form.Group>
    //             <Button variant="primary" type="submit" className="w-100" onClick={handleLogin}>
    //               {isLoading ? "Loading..." : "Sign In"}
    //             </Button>
    //           </Form.Group>
    //         </Form>
    //       </Card.Body>
    //     </Card>
    //   </div>
    // </Container>
  );
}
