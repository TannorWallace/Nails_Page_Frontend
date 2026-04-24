// app/register/page.tsx
'use client';

import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <RegisterForm />
    </div>
  );
}