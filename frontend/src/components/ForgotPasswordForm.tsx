import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ForgotPasswordForm = () => {
  return (
    <div className="h-dvh flex items-center justify-center py-12">
      <div className="mx-auto grid w-[400px] gap-6">
        <div className="grid gap-4 text-center">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Get Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
