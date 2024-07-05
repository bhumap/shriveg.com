"use client"
import Link from "next/link";
import Ripple from "material-ripple-effects";
import Image from "next/image";

export default function PopularChefs({chefs}) {

  

  var arr = [1, 2, 3, 4];
  const ripple = new Ripple();

  return (
    <div className="px-4 bg-white py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="lg:text-5xl md:text-4xl text-2xl font-bold text-center mb-3">
          Popular Home Chefs
        </h2>
        <p className="max-w-2xl mx-auto text-center mb-10">
          Indulge in a symphony of flavors curated by top-notch chefs.Explore diverse cuisines and flavors, curated with passion and expertise.
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 mx-auto gap-6">
          {chefs?.data?.map((v, i) => (
            <div
              key={i}
              className="bg-white items-center flex-col overflow-hidden rounded-xl shadow-md"
            >
              <div className="relative">
                <Image width={600} height={400} className="w-[100%] object-cover aspect-video" src={v.coverPhoto || "/images/image.png"} alt="" />
                <Image width={600} height={400}
                  className="rounded-full absolute object-cover -translate-x-1/2 left-1/2 -translate-y-1/2 border-4 border-white shadow-md block mx-auto w-28 h-28"
                  src={v.photo || "/images/user.png"}
                  alt=""
                  srcSet=""
                />
              </div>
              <div className="mt-12 text-center p-4">
                <div className="text-lg font-semibold mt-2">
                  {v.fullName}
                </div>
                <div className="flex justify-center gap-4 mb-4 text-sm">
                  <div className="text-primary font-medium">
                    <i className="bx bxs-star"></i>
                    0
                    <span className="text-gray-500 text-sm">(0)</span>
                  </div>
                  <div className="text-primary flex items-center gap-1 font-medium">
                    <i className="bx bxs-time"></i>
                    0 min
                  </div>
                </div>
                <Link
                  href={`/@${v.username}`}
                  className="text-primary font-medium hover:bg-primary/20 inline-block text-xs bg-primary/10 border-primary/20 border px-4 py-2 rounded-md"
                >
                  See Dishes
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
