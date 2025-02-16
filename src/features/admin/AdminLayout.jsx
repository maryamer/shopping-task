import { useNavigate } from "react-router-dom";
import AppLayout from "../../ui/AppLayout";
import { useEffect,  } from "react";
import Cookies from "js-cookie"; // Import js-cookie

function AdminLayout() {
  const navigate = useNavigate('/')

    useEffect(() => {
      const token = Cookies.get("Authorization");
  
      if (!token) {
        navigate("/signin");
      }
    
    }, []);
  return <AppLayout></AppLayout>;
}
export default AdminLayout;
