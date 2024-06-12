"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

const Authentication = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repassword: "",
    phonenumber: "",
    verificationCode: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  function handleVerify() {}

  async function handleSignUp() {
    const data = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  }

  async function handleLogIn() {
    // const data = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Log In</TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="la.patisserie@gmail.com"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="12345"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="repassword">Re-Password</Label>
                <Input
                  type="password"
                  id="repassword"
                  placeholder="12345"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phonenumber">Phone Number</Label>
                <Input
                  type="number"
                  id="phonenumber"
                  placeholder="76453164"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="verificationContainer">Verification Code</Label>

                <div id="verificationContainer" className="flex items-center">
                  <InputOTP
                    maxLength={6}
                    required
                    value={formData.verificationCode}
                    onChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        verificationCode: value,
                      }))
                    }
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>

                  <Button
                    onClick={() => {
                      handleVerify();
                    }}
                    type="submit"
                    variant="secondary"
                    className="ml-3"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                onClick={() => {
                  handleSignUp();
                }}
                type="submit"
              >
                Sign Up
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="phonenumber">Phone number</Label>
                <Input id="phonenumber" type="number" onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" onChange={handleChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogIn}>Log In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Authentication;
