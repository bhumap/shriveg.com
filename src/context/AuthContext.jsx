import { createContext, } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

const fetchUser = async () => {
  try {
    var res = await axios.get("http://localhost:3000/api/auth/profile");
    return res.data.message;
  } catch (error) {
    return null
  }
};


const fetchNotifications = async () => {
  try {
    var res = await axios.get("http://localhost:3000/api/notifications");
    return res.data.message;
  } catch (error) {
    return null
  }
};

export const AuthContext = createContext();

const Context = ({ children }) => {

  var { data, refetch, isLoading } = useQuery("session", fetchUser, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  var notifications = useQuery("notifications", fetchNotifications);

  const marksAsRead = async (id) =>{
    try {
      var {data} = await axios.put(`http://localhost:3000/api/notifications/${id}`,{read:true})
      if(data.success){
        notifications.refetch()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <AuthContext.Provider value={{ user: data || null, refetch,notifications,marksAsRead }}>
      <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position:"fixed",
            top:0,
            left:0,
            width:"100vw",
            height:"100vh",
            backgroundColor:"white",
            zIndex:"999999",
            transition:".5s",
            opacity:isLoading ? "1" : "0",
            visibility:isLoading ? "visible" : "hidden"
          }}
        >
          <svg
            width="88"
            height="88"
            viewBox="0 0 88 88"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#275914"
          >
            <g fill="none" fillRule="evenodd" strokeWidth="2">
              <circle cx="44" cy="44" r="1">
                <animate
                  attributeName="r"
                  begin="0s"
                  dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="0s"
                  dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="44" cy="44" r="1">
                <animate
                  attributeName="r"
                  begin="-0.9s"
                  dur="1.8s"
                  values="1; 20"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.165, 0.84, 0.44, 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  begin="-0.9s"
                  dur="1.8s"
                  values="1; 0"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.3, 0.61, 0.355, 1"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
      </div>
      {children}
    </AuthContext.Provider>
  );
};

export default Context;
