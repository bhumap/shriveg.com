"use client"
import React from 'react'
import "@/Style/style.css";

const Contact = () => {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-4 sm:px-10 md:px-16 lg:px-28 py-10 mx-auto">
          <article className="text-pretty">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800 text-center">Contact Us</h2>
            <div className="flex justify-center items-center mt-5 bg-gray-100">
              <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
               

                <div className="text-sm sm:text-base font-light tracking-wide leading-relaxed text-gray-600 space-y-6">
                  <div className="flex items-center space-x-4">
                  <svg class="h-6 w-8" color='rgb(6 89 18 / var(--tw-bg-opacity))'  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                    <div>
                      <p className="font-medium text-lg sm:text-base">Company Name</p>
                      <p>Shriveg Homemade Service Pvt Ltd</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                  <svg class="h-6 w-8" color='rgb(6 89 18 / var(--tw-bg-opacity))'  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <rect x="10" y="12" width="4" height="4" /></svg>
                    <div>
                      <p className="font-medium text-lg sm:text-base">Company Address</p>
                      <p>123 Business Avenue, Suite 456,<br /> City, State, ZIP Code, Country</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                  <svg class="h-6 w-8" color='rgb(6 89 18 / var(--tw-bg-opacity))'  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                    <div>
                      <p className="font-medium text-lg sm:text-base">Phone No</p>
                      <p>78000 09965</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                  <svg class="h-6 w-8" color='rgb(6 89 18 / var(--tw-bg-opacity))'  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
                    <div>
                      <p className="font-medium text-lg sm:text-base">Email Id</p>
                      <p>shrivegofficial@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Contact