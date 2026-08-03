function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDF8F2]">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-[#5C2A73]">
          Welcome to <span className="text-[#E86A33]">Lovo</span>
          <span className="text-[#5C2A73]">Pet</span>
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          AI-Powered Animal Care, Better Together.
        </p>

        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[#E86A33]" />
      </div>
    </main>
  );
}

export default HomePage;
