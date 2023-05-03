import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { useAuthContext } from "../../store/authContext";

const Address = () => {
  const { UserData } = useAuthContext();

  const { data } = useQuery(["address"], () =>
    getData(`/address/${UserData?._id}`)
  );

  console.log(data);

  return <section>Address</section>;
};

export default Address;
