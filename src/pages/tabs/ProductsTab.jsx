import { useState } from "react";
// import useGetProducts from "../../hooks/tabs/useProducts";
import ProductsActionModal from "../../features/admin/products/ProductsActionModal";
import HeaderContainer from "../../ui/HeaderContainer";
import ProductsBody from "../../features/admin/products/ProductsBody";
import useProductsTab from "../../hooks/tabs/useProductsTab";
function ProductsTab() {
  const [open, setOpen] = useState(false);
  const props = useProductsTab();

  return (
    <>
      <ProductsActionModal
        categories={props?.categories}
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
      <div className="px-1 h-full">
        <ProductsBody {...props} setOpen={setOpen} />
      </div>
    </>
  );
}
export default ProductsTab;
