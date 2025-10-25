"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignUp path="/auth/sign-up" routing="path" signInUrl="/auth/sign-in" />
    </div>
  );
}
