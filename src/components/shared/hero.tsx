import Image from "next/image";
import Link from "next/link";

// TODO: Animation làm sau đi , làm animation nối các ảnh với nhau như truyền tín hiệu
const Hero = () => {
  return (
    <>
      <section className="w-full pb-[160px] pt-[4rem] relative z-30">
        <div className="flex flex-col items-center gap-14 relative pt-[308px]">
          <div className="flex flex-col text-center items-center gap-6">
            <h1 className="text-5xl font-semibold">
              Your <span className="italic">intelligent</span> canvas.
            </h1>
            <p className="text-xl text-[#999] font-medium">
              Every creative AI tool. Throughtfully connected.
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
              <span className="text-sm font-normal">Get started</span>
            </Link>
          </div>
        </div>

        <div className="absolute top-[14%] left-[8%] flex flex-col items-start gap-[22px]">
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-medium text-[#b4b4b4]">
              Truck sketch
            </span>
            <Image
              src="/assets/images/demo1.jpg"
              width={280}
              height={180}
              loading="lazy"
              className="w-[280px] h-[180px] object-cover rounded-2xl"
              alt="demo1"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <span className="text-xs font-medium text-[#b4b4b4]">
              Grassy desert
            </span>
            <Image
              src="/assets/images/demo2.jpg"
              width={280}
              height={180}
              loading="lazy"
              className="w-[280px] h-[180px] object-cover rounded-2xl"
              alt="demo2"
            />
          </div>
        </div>

        <div className="absolute top-[16%] left-[40%]">
          <div className="flex flex-col items-start gap-2">
            <p className="inline-flex w-full flex-row justify-between text-xs font-medium text-[#b4b4b4]">
              Desert car photoshot
              <span className="text-xs font-medium text-[#b4b4b4]">
                Seedream 4.0
              </span>
            </p>
            <Image
              src="/assets/images/demo3.jpg"
              width={280}
              height={180}
              loading="lazy"
              className="w-[280px] h-[180px] object-cover rounded-2xl"
              alt="demo1"
            />
          </div>
        </div>

        <div className="absolute bottom-[17%] right-[1%] max-w-[498px] w-full">
          <div className="flex flex-col items-start gap-2">
            <p className="inline-flex w-full flex-row justify-between text-xs font-medium text-[#b4b4b4]">
              Truck handheld
              <span className="text-xs font-medium text-[#b4b4b4]">
                Higgsfield DoP
              </span>
            </p>
            <div className="w-full h-[320.14px] rounded-2xl bg-[#000] border border-white/10"></div>
          </div>
        </div>

        <div className="absolute top-[32%] left-[39.7%]">
          <div className="rounded-full bg-[#000] border-2 border-white/20 pl-3.5 pr-1.5 py-1.5 flex flex-row items-center gap-2.5">
            <div className="p-1 bg-[#1b2a1e] rounded-[6px] flex items-center">
              <span className="text-[#71d083] text-xs font-medium">New</span>
            </div>
            <p className="text-sm font-medium">Reve is now available</p>
            <Link
              href="/projects"
              className="rounded-full py-[5px] px-[15px] flex items-center bg-[#ffffff1a]"
            >
              <span className="text-sm font-medium">Try now</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
