import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


const Page = () => {
  return (
    <div className="px-4 py-10">
      <SkeletonTheme baseColor="#ddd">
        {/* <Skeleton duration={1.5} count={3} /> */}

        <div className="max-w-5xl mx-auto rounded-md">
          <div className="relative mb-12">
            {/* cover image */}
            <Skeleton height={200} duration={1.5} count={1} />

            <div className="mx-auto w-20 h-20  rounded-full border-[6px] border-white absolute -translate-y-1/2 top-[100%] left-1/2 -translate-x-1/2">
              <Skeleton
                className="w-full h-full"
                borderRadius={"50%"}
                duration={1.5}
                count={1}
              />
            </div>
          </div>

          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-1">
              <Skeleton width={150} duration={1.5} count={1} />
            </h2>
            <p className="text-sm">
              <Skeleton width={100} duration={1.5} count={1} />
            </p>
          </div>

          <div className="mb-10">
            <div className="max-w-xl grid grid-cols-2 gap-4 sm:grid-cols-4 text-center mx-auto">
              <div>
                  <Skeleton width={50} height={20} duration={1.5} count={1} />
                  <Skeleton width={100} height={20} duration={1.5} count={1} />
              </div>
              <div>
                  <Skeleton width={50} height={20} duration={1.5} count={1} />
                  <Skeleton width={100} height={20} duration={1.5} count={1} />
              </div>
              <div>
                  <Skeleton width={50} height={20} duration={1.5} count={1} />
                  <Skeleton width={100} height={20} duration={1.5} count={1} />
              </div>
              <div>
                  <Skeleton width={50} height={20} duration={1.5} count={1} />
                  <Skeleton width={100} height={20} duration={1.5} count={1} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-5xl gap-6 mb-10">
            {[1, 1, 1, 1, 1, 1].map((v, i) => {
              return (
                <div key={i}>
                    <Skeleton height={150} duration={1.5} count={1} />
                    <Skeleton height={20} duration={1.5} count={1} />
                    <Skeleton width={100} height={20} duration={1.5} count={1} />
                </div>
              );
            })}
          </div>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Page;
