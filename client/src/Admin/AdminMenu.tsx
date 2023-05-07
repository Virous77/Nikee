import { MdCreateNewFolder, MdFeaturedPlayList } from "react-icons/md";
import { AiOutlineDashboard } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdminMenu = () => {
  const navigate = useNavigate();
  return (
    <aside>
      <ul>
        <li onClick={() => navigate("/admin/dashboard")}>
          <AiOutlineDashboard /> Dashboard
        </li>

        <li onClick={() => navigate("/admin/products")}>
          <MdFeaturedPlayList /> Products
        </li>

        <li onClick={() => navigate("/admin/add-product")}>
          <MdCreateNewFolder /> Add Product
        </li>
      </ul>
    </aside>
  );
};

export default AdminMenu;
