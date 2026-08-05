function VetCareSection() {
  return (
    <section className="bg-[#FDF8F2] py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 lg:flex-row">
        {/* Left Content */}
        <div className="max-w-2xl">
          <h2 className="text-5xl font-extrabold leading-tight text-[#5C2A73] lg:text-6xl">
            Book Trusted
            <br />
            Veterinary Care
            <br />
            In Minutes
          </h2>

          <p className="mt-8 text-xl leading-relaxed text-gray-700 lg:text-2xl">
            Consult licensed veterinarians online and get expert
            <br />
            care for your pets anytime, anywhere.
          </p>

          <button className="mt-10 rounded-xl bg-[#E86A33] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#5C2A73]">
            Book Appointment
          </button>
        </div>

        {/* Right Placeholder */}
        <div className="flex h-[420px] w-full max-w-md items-center justify-center rounded-3xl border-2 border-dashed border-[#E5D8C9] bg-[#F8F3EC]">
          <p className="text-lg font-semibold text-[#5C2A73]/70">
            Vet Image Here
          </p>
        </div>
      </div>
    </section>
  );
}

export default VetCareSection;
