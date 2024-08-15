"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyEmailForm = () => {
  const [value, setValue] = React.useState("");
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[400px] gap-6">
        <div className="grid gap-4 text-center">
          <h1 className="text-3xl font-bold">Verify Your Email Address</h1>
          <p className="text-balance text-muted-foreground">
            Enter the token sent to your email address
          </p>
        </div>
        <div className="flex justify-center items-center my-8">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-1/2 mx-auto">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
