import useUser from "./useUser";

function UserAvatar() {
  const { user } = useUser();
  return (
    <div className="w-14 h-14 flex items-center justify-center bg-secondary-200 text-center text-secondary-600 rounded-full">
      {user?.name ? user.name.charAt(0) : "RS"}
    </div>
  );
}

export default UserAvatar;
