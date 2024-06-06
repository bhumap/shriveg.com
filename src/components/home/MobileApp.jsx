import React from "react";
import Image from "next/image";

export default function MobileApp() {
  return (
    <div className="py-20 border-gray-400 px-4 bg-white">
      <div className="grid lg:grid-cols-2 bg-[rgb(241,241,241)] gap-4 p-4 sm:p-8 rounded-lg relative max-w-5xl mx-auto">
        <div>
          <div className="text-primary font-bold text-2xl">
            Put us in your pocket
          </div>

          <div className="flex gap-4 flex-col sm:flex-row mb-8 mt-4">
            <div className="max-w-32 sm:block hidden">
              <Image
                width={600}
                height={400}
                className="w-full"
                src="/images/qrCodeApp.png"
                alt=""
                srcSet=""
              />
            </div>
            <p className="text-gray-500 text-sm">
              Embark on a culinary journey where every bite tells a story
              crafted by talented home-based chefs. Join us in supporting local
              talent and savoring homemade goodness with every order. Download
              the app now!
            </p>
          </div>

          <div className="flex gap-4 myapp">
            <a href="./shriveg.apk" download>
              <Image
                width={600}
                height={400}
                className="rounded w-[25%]"
                src="/images/appStore.svg"
                alt="Download App"
              />
            </a>
            <a href="./shriveg.apk" download>
              <Image
                width={600}
                height={400}
                className="rounded w-[25%]"
                src="/images/playStore.svg"
                alt=""
              />
            </a>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Image
            width={600}
            height={400}
            className="w-[90%] xl:w-[57%] bottom-[-75px]   right-0  xl:absolute"
            src="/images/mobileApp.png"
            alt=""
            srcSet=""
          />
        </div>
      </div>
    </div>
  );
}
