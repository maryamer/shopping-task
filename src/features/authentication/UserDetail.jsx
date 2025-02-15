function UserDetail({ email, name }) {
  return (
    <div className="flex flex-col text-sm w-full">
      <span className="font-bold truncate w-2/3">{name}</span>{" "}
      {/* Use w-full to make it take full width */}
      <span className="truncate w-2/3">{email}</span>{" "}
      {/* Use w-full to make it take full width */}
    </div>
  );
}

export default UserDetail;
