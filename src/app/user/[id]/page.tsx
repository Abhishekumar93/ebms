import Loading from "@/app/loading";
import flashMessage from "@/components/flashmessage/flashMessage";
import { IUserDetail } from "@/interface/user.interface";
import { getApi } from "@/utils/restApi.utils";
import GoBack from "./goBack";
import { handleHrefDecode } from "@/utils/hrefEncode.utils";
import utcDateTime from "@/utils/utcDateTime.utils";

const UserDetail = async ({ params }: { params: { id: string } }) => {
  const decodedId = handleHrefDecode(params.id);

  const fetchUserDetail = async () => {
    try {
      let response = await getApi(`user/detail/${decodedId}/`);
      return response.data;
    } catch (error) {
      flashMessage.showErrorMessage("Something went wrong! Please try again.");
      return false;
    }
  };

  const data: IUserDetail = await fetchUserDetail();

  const displayUserDetail = () => {
    if (data) {
      let user_consumer_number = data.consumer_number;
      let user_phone_number = data.phone_number;
      let user_last_login = new Date(data.last_login);

      return (
        <div className="p-4 relative">
          <GoBack />
          <div className="max-w-screen-sm mx-auto shadow-inner dark:shadow-slate-300 shadow-slate-600 my-6 p-4 rounded-md overflow-hidden">
            <h1 className="text-3xl text-center font-semibold mb-8 gradient_text">{`${data.first_name.trim()} ${data.last_name.trim()}`}</h1>
            <div className="text-base">
              <section className="grid grid-cols-3 gap-4 mb-4 bg-gray-200 py-1 px-2 rounded bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-700 dark:to-blue-700">
                <p className="font-bold">Email</p>
                <p className="col-span-2 pl-2">{data.email}</p>
              </section>
              <section className="grid grid-cols-3 gap-4 mb-4 bg-gray-200 py-1 px-2 rounded bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-700 dark:to-blue-700">
                {user_consumer_number ? (
                  <>
                    <p className="font-bold">Consumer Number</p>
                    <p className="col-span-2 pl-2">{user_consumer_number}</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold">Staff Id</p>
                    <p className="col-span-2 pl-2">{data.staff_id}</p>
                  </>
                )}
              </section>
              <section className="grid grid-cols-3 gap-4 mb-4 bg-gray-200 py-1 px-2 rounded bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-700 dark:to-blue-700">
                <p className="font-bold">Phone Number</p>
                <p className="col-span-2 pl-2">
                  {user_phone_number ? user_phone_number : "NA"}
                </p>
              </section>
              <section className="grid grid-cols-3 gap-4 mb-4 bg-gray-200 py-1 px-2 rounded bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-700 dark:to-blue-700">
                <p className="font-bold">Active Status</p>
                <p className="col-span-2 pl-2">
                  {data.is_active ? "Active" : "Inactive"}
                </p>
              </section>
              <section className="grid grid-cols-3 gap-4 mb-4 bg-gray-200 py-1 px-2 rounded bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-700 dark:to-blue-700">
                <p className="font-bold">Joined On</p>
                <p className="col-span-2 pl-2">
                  {utcDateTime.localDateTime(`${data.date_joined}`)}
                </p>
              </section>
              <section className="grid grid-cols-3 gap-4 mb-4 bg-gray-200 py-1 px-2 rounded bg-gradient-to-r from-cyan-300 to-blue-400 dark:from-cyan-700 dark:to-blue-700">
                <p className="font-bold">Last Login</p>
                <p className="col-span-2 pl-2">{`${
                  user_last_login.getFullYear() === 1970
                    ? "NA"
                    : utcDateTime.localDateTime(`${data.last_login}`)
                }`}</p>
              </section>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  };

  return displayUserDetail();
};

export default UserDetail;
