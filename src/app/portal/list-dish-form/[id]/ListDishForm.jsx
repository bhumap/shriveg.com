"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import "next-cloudinary/dist/cld-video-player.css";
import Image from "next/image";

const ListDishForm = ({dish}) => {

  var router = useRouter()

  const [formLoading, setFormLoading] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    price: "",
    title: "",
    servingPerson: "",
    category: "breakfast",
    images: [],
    latitude: 123,
    longitude: 123,
    ...dish,
  });

  const [formInputs, setFormInputs] = useState([
    {
      label: "Dish Title",
      name: "title",
      type: "text",
      cols: 1,
      required: true,
    },
    {
      label: "Dish Category",
      name: "category",
      type: "select",
      cols: 1,
      required: true,
      options: [],
    },
    {
      label: "Price",
      name: "price",
      placeholder: "Enter Price in Indian Rupees",
      type: "number",
      cols: 1,
      required: true,
    },
    {
      label: "No of Person Served",
      name: "servingPerson",
      type: "text",
      cols: 2,
      required: true,
    },
    {
      label: "Description",
      name: "description",
      type: "textarea",
      cols: 2,
      required: true,
    },
  ]);



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
          setLocationFetched(true);
          console.log("Latitude and Longitude set:", { latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Unable to retrieve location. Please allow location access.");
        }
      );
    }
  }, []);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  
  const saveChanges = async (data) => {
    try {
      setFormLoading(true);
      const res = await axios.put(`/api/dishes/${formData._id}`, data);
      toast.success(res.data.message);
    } catch (error) {
      alert(error);
    } finally {
      setFormLoading(false);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!locationFetched) {
      toast.error("Please wait while we fetch your location.");
      return;
    }
    try {
      setFormLoading(true);
      const res = await axios.put(`/api/dishes/${formData._id}`, {
        ...formData,
        status: "Published",
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setFormLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure to delete this Dish?")) {
      return;
    }
    try {
      const res = await axios.delete(`/api/dishes/${id}`);
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/portal/my-dishes");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };


  
  return (
    <div>
      {formLoading && <Loader />}

      <div className="sm:p-10">
        <h2 className="text-black font-semibold text-2xl mb-4">
          Dish Details
        </h2>

        <form onSubmit={submitForm} className={``}>
          <div className="grid grid-cols-2 gap-6">
            {formInputs.map((v, i) => {
              var label = (
                <label
                  className="absolute flex items-center rounded-md bg-white text-sm text-gray-500  duration-300 transform -translate-y-4 scale-[0.85] top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-priborder-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-[0.85] peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  htmlFor={v.name}
                >
                  {v.label}
                  {v.required && <div className="text-red-600 text-xl">*</div>}
                </label>
              );
              switch (v.type) {
                case "text":
                case "number":
                  return (
                    <div
                      key={i}
                      className={`relative bg-white col-span-2 sm:col-span-${v.cols}`}
                    >
                      <input
                        required={v.required}
                        id={v.name}
                        value={formData[v.name]}
                        onChange={changeHandler}
                        name={v.name}
                        placeholder={v.placeholder || ""}
                        type={v.type}
                        className={`block placeholder:opacity-0 focus:placeholder:opacity-100 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer`}
                      />
                      {label}
                    </div>
                  );
                case "select":
                  return (
                    <div
                      key={i}
                      className={`relative bg-white col-span-2 sm:col-span-${v.cols}`}
                    >
                      <select
                        value={formData[v.name]}
                        required
                        onChange={changeHandler}
                        name={v.name}
                        id={v.name}
                        className={`w-full px-2.5 pb-2.5 pt-3 placeholder:text-sm rounded-md border-gray-300 focus:outline-none focus:border-indigo-500 border`}
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="brunch">Brunch</option>
                        <option value="dinner">Dinner</option>
                        
                      </select>
                      {label}
                    </div>
                  );
                case "textarea":
                  return (
                    <div
                      key={i}
                      className={`relative bg-white col-span-2 sm:col-span-${v.cols}`}
                    >
                      <textarea
                        required={v.required}
                        id={v.name}
                        value={formData[v.name]}
                        onChange={changeHandler}
                        name={v.name}
                        placeholder=""
                        type={v.type}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer`}
                      />
                      {label}
                    </div>
                  );
              }
            })}

            <div className={`relative col-span-2`}>
              <h2 className="font-semibold text-xl mb-1">Dish Images</h2>
              {formData.images?.length ? (
                <p className="pb-2 text-gray-600">
                  {formData.images?.length}/4 images selected.
                </p>
              ) : null}

              {formData.images.length ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {formData.images?.map((v, i) => {
                    return (
                      <div
                        key={i}
                        className="rounded-md group overflow-hidden relative border"
                      >
                        <Image width={600} height={400}
                          className="w-full aspect-video object-cover"
                          src={v.secure_url}
                          alt=""
                        />
                        <div className="hidden absolute top-0 left-0 w-full h-full bg-black/40 group-hover:flex justify-end items-end p-2">
                          <i
                            className="bx text-white hover:bg-black/50 p-1 rounded-md cursor-pointer bxs-trash"
                          ></i>
                        </div>
                      </div>
                    );
                  })}

                  {formData.images.length != 3 && (
                    <CldUploadWidget
                    options={{
                      cropping:"server",
                      cropping_aspect_ratio : 16/9
                    }}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                    }
                    onSuccess={(res) => {
                      var imgs = formData.images
                      imgs.push({public_id:res.info.public_id,secure_url:res.info.secure_url})
                      setFormData({ ...formData, images:  imgs});
                      saveChanges({ ...formData, images:  imgs})
                      document.body.style.overflow = "auto";
                    }}
                  >
                    {({ open }) => {
                      return (
                        <label
                        onClick={()=>open()}
                        htmlFor="images"
                        className="rounded-md p-4 cursor-pointer hover:bg-gray-100 flex flex-col justify-center items-center group overflow-hidden relative border"
                      >
                        <i className="bx mb-2 bx-images"></i>
                        <div>More Images</div>
                      </label>
                      );
                    }}
                  </CldUploadWidget>
                    
                  )}
                </div>
              ) : (
                <CldUploadWidget
                  options={{
                    cropping:"server",
                    cropping_aspect_ratio : 16/9
                  }}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  onSuccess={(res) => {
                    var imgs = formData.images
                    imgs.push({public_id:res.info.public_id,secure_url:res.info.secure_url})
                    setFormData({ ...formData, images:  imgs});
                    saveChanges({ ...formData, images:  imgs})
                    document.body.style.overflow = "auto";
                  }}
                >
                  {({ open }) => {
                    return (
                        <label
                        onClick={()=>open()}
                        htmlFor="images"
                        className="border text-xl bg-primary/5 cursor-pointer hover:bg-primary/10 border-dashed rounded-md border-primary p-4 flex justify-center items-center"
                      >
                        <i className="bx mr-2 bx-images"></i> Select Images
                      </label>
                    );
                  }}
                </CldUploadWidget>
                
              )}
            </div>

            <div className="col-span-2 text-xs sm:text-base flex justify-between">
              <div>
              <button
                type="button"
                onClick={()=>deleteItem(formData._id)}
                className="border-primary border px-3 py-2 rounded-md text-primary mr-3"
              >
                Delete
              </button>
              </div>
              <div>
              <button
                type="button"
                onClick={()=>saveChanges(formData)}
                className="border-primary bg-primary/10 border px-5 py-2 rounded-md text-primary mr-3"
              >
                Save
              </button>

             {formData?.status != "Published" && <button className="bg-primary border-primary border hover:bg-primary px-5 py-2 rounded-md text-white">
                <span>{formLoading ? "Processing..." : "Publish"}</span>
              </button>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListDishForm;
