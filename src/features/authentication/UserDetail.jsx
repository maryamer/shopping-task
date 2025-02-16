function UserDetail({ email, name }) {
  return (
    <div className="flex flex-col text-sm w-full">
      <span className="font-bold truncate w-2/3">{name}</span>{" "}
      <span className="truncate w-2/3">{email}</span>{" "}
    </div>
  );
}

export default UserDetail;
