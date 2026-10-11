export default function HomeLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f1f8f3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero skeleton */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-[#e2f4e8] px-6 py-8 sm:px-10 md:min-h-[270px] md:flex-row">
          <div className="w-full max-w-2xl space-y-4">
            <div className="h-8 w-56 rounded-full bg-green-100" />
            <div className="h-10 w-3/4 rounded bg-green-100" />
            <div className="h-4 w-full rounded bg-green-100" />
            <div className="h-4 w-2/3 rounded bg-green-100" />
            <div className="h-12 w-36 rounded-xl bg-white" />
          </div>
          <div className="h-48 w-full max-w-[320px] rounded-2xl bg-green-100" />
        </div>

        {/* Product card skeletons */}
        {[1, 2].map((section) => (
          <div key={section} className="mt-8">
            <div className="mb-4 h-7 w-44 rounded bg-gray-200" />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex gap-3 rounded-2xl bg-white p-5">
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
        ))}
      </div>
    </main>
  );
}
