import Link from "next/link";

const Subscriptions = () => {
  return (
    <section className="relative w-full my-[128px]">
      <div className="flex flex-row items-start justify-between mb-12">
        <div className="flex flex-col items-start gap-0">
          <h2 className="text-3xl font-medium">
            One subscription to rule them all.
          </h2>
          <p className="text-[#999] text-[20px] leading-[27.4px] text-left max-w-[921px] w-full">
            One plan. 50+ models. Stay on the creative edge without chasing
            licenses.
          </p>
        </div>

        <div className="flex flex-row items-center gap-3">
          <Link
            href="/book-a-calls"
            className="hover:bg-[#1a1a1a] rounded-md px-4 py-1"
          >
            <span className="text-white/70 text-sm font-normal">
              Book a call
            </span>
          </Link>
          <Link
            href="/get-started"
            className="bg-[#1a1a1a] rounded-md border border-white/10 px-4 py-1"
          >
            <span className="text-sm font-normal">Sign up for free</span>
          </Link>
        </div>
      </div>
      {/* Grid mansory */}
      <div
        className="flex-none
    grid
    grid-rows-[repeat(5,minmax(0,1fr))]
    grid-cols-[repeat(7,minmax(50px,1fr))]
    auto-rows-[minmax(0,1fr)]
    justify-center
    gap-4
    w-full
    max-w-[1280px]
    h-min
    p-0
    relative
    overflow-visible"
      >
        <div className="grid-cols-5 p-6 w-full flex items-start rounded-3xl border border-white/10 h-[270px]"></div>
      </div>
    </section>
  );
};

export default Subscriptions;
