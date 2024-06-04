import React from 'react'
import WorkFlow from '@/components/home/WorkFlow'
import PopularChefs from '@/components/home/PopularChefs'
import PopularFoods from '@/components/home/PopularFoods'
import MobileApp from '@/components/home/MobileApp'
import NewsLetter from '@/components/common/NewsLetter'
import Hero from '@/components/home/Hero'
import Category from '@/components/home/Category'

export const metadata = {
  title:"Home - Shri Veg",
  desc:"Online Food Delivery Service Providers"
}


var fetchChefs = async () => {
  try {
    var res = await fetch(`${process.env.DOMAIN}/api/users?userType=Chef`, {
      cache: "no-store",
    });
    res = await res.json();
    return res.message;
  } catch (error) {
    console.log(error);
  }
};

var fetchPopularFoods = async () => {
  try {
    var res = await fetch(`http://localhost:3000/api/dishes/?lat=${28.5709396}&lon=${77.2896636}`, {
      cache: "no-store",
    });
    res = await res.json();
    return res.message;
  } catch (error) {
    console.log(error);
  }
};

const page = async () => {

  var chefs = await fetchChefs()
  var foods = await fetchPopularFoods()


  return (
    <div>
      <Hero />
      {/* <WorkFlow /> */}
      <Category/>
      <PopularChefs chefs={chefs} />
      <PopularFoods dishes={foods} />
      <MobileApp />
      <NewsLetter />
    </div>
  )
}

export default page