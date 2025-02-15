export default function useUser() {
  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return { user };
  // const { data, isLoading } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getUser,
  //   retry: false,
  // });

  // const { user } = data || {};

  // return { isLoading, user };
}
