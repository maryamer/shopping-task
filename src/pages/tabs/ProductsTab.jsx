import { useState } from "react";
import ProductsActionModal from "../../features/admin/products/ProductsActionModal";
import HeaderContainer from "../../ui/HeaderContainer";
import ProductsBody from "../../features/admin/products/ProductsBody";
import useProductsTab from "../../hooks/tabs/useProductsTab";
import { FormProvider } from "react-hook-form";
function ProductsTab() {
  // for action modal
  const [open, setOpen] = useState(false);
  // for filter modal
  const [filterOpen, setFilterOpen] = useState(false);

  const { useFormProps, ...props } = useProductsTab({ setFilterOpen });

  return (
    <>
      {/* for add and edit product */}
      <ProductsActionModal
        categories={props?.categories?.map((item) => ({
          label: item?.title,
          value: item?.id,
        }))}
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

      {/* a provider for react hook form of filter modal */}
      <FormProvider {...useFormProps}>
        {/* body of products */}
        <ProductsBody
          {...props}
          setOpen={setOpen}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
      </FormProvider>
    </>
  );
}
export default ProductsTab;
