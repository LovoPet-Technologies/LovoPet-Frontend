import React from "react";
import VeterinarianApplicationForm from "../components/veterinarian/VeterinarianApplicationForm";

export default function VeterinarianApplicationPage() {
  return (
    <div className="min-h-screen bg-[#FDF6EC] pt-10">
      <header className="border-b border-[#E8752E]/20 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <h1 className="text-2xl font-bold text-[#3D1E5C]">
            Join LovoPet as a Veterinarian
          </h1>
          <p className="mt-1 text-sm text-[#3D1E5C]/70">
            Fill in your details below to apply for collaboration with LovoPet.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <VeterinarianApplicationForm />
      </main>
    </div>
  );
}
