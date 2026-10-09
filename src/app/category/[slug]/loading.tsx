export default function CategoryLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f1f8f3] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-[#e2f4e8] p-8">
          <div className="h-4 w-32 rounded bg-green-100" />
          <div className="mt-4 h-9 w-56 rounded bg-green-100" />
          <div className="mt-4 h-4 max-w-lg rounded bg-green-100" />
        </div>

        <div className="mt-8 flex justify-end">
          <div className="h-10 w-52 rounded-xl bg-white" />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-2xl bg-white p-5"
            >
              <div className="size-14 shrink-0 rounded-full bg-gray-200" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/2 rounded bg-gray-100" />
                <div className="h-5 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

