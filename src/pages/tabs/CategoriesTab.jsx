import { useState } from "react";
import CategoryActionModal from "../../features/admin/categories/CategoryActionModal";
import HeaderContainer from "../../ui/HeaderContainer";
import CategoriesBody from "../../features/admin/categories/CategoriesBody";

function CategoriesTab() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CategoryActionModal open={open} setOpen={setOpen} />
      <HeaderContainer
        btnAction={() => setOpen(true)}
        btnTitle="Category"
        desc={"Manage the list of new products in this section."}
        title={"Category"}
        breadcrumbs={[{ active: true, label: "Category", href: "/category" }]}
      />
      <CategoriesBody setOpen={setOpen} />
    </>
  );
}
export default CategoriesTab;
