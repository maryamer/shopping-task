import { useState } from "react";
import useGetProducts from "../../hooks/tabs/useProducts";
import ProductsActionModal from "../../features/admin/products/ProductsActionModal";
import HeaderContainer from "../../ui/HeaderContainer";
import ProductsBody from "../../features/admin/products/ProductsBody";

function ProductsTab() {
  // const [currentPage, setCurrentPage] = useState(1);

  const [open, setOpen] = useState(false);
  const { data } = useGetProducts();

  return (
    <>
      <ProductsActionModal
        categories={data?.categories}
        open={open}
        setOpen={setOpen}
      />
      <HeaderContainer
        btnAction={() => setOpen(true)}
        btnTitle="Product"
        desc={"Manage the list of new products in this section."}
        title={"Products"}
        breadcrumbs={[{ active: true, label: "Products", href: "/products" }]}
      />
      <div className="px-1">
        <ProductsBody />
      </div>
    </>
  );
}
export default ProductsTab;
