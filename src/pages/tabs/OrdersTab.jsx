import HeaderContainer from "../../ui/HeaderContainer";
import OrdersBody from "../../features/admin/orders/OrdersBody";

function OrdersTab() {
  return (
    <>
      <HeaderContainer
        btnAction={false}
        btnTitle="Orders"
        desc={"Manage the list of new orders in this section."}
        title={"Orders"}
        breadcrumbs={[{ active: true, label: "Orders", href: "/category" }]}
      />
      <div className="mt-5">
        <OrdersBody />
      </div>
    </>
  );
}
export default OrdersTab;
