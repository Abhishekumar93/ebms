import { FC, useEffect, useState } from "react";
import { IUserData, IUsersList } from "@/interface/user.interface";
import CloseIcon from "@/../public/svg/closeIcon";
import authApi from "@/utils/authApi.utils";
import { generateRandomPassword } from "@/utils/randomPasswordGenerator.utils";
import { callbackDataType } from "@/types/dataType.type";

interface IProps {
  modalTitle: string;
  userData: IUsersList;
  setHideModal: () => void;
  setModalCallbackData: (value: IUsersList, type: callbackDataType) => void;
}
const CustomModal: FC<IProps> = ({
  modalTitle,
  userData,
  setHideModal,
  setModalCallbackData,
}) => {
  const [showFormButton, setShowFormButton] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<IUsersList>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    consumer_number: "",
    staff_id: "",
    is_active: false,
  });

  useEffect(() => {
    setUserDetails((prevState) => ({
      ...prevState,
      ...userData,
    }));
    updateShowFormButtonValue(userData);
  }, [userData]);
  useEffect(() => {
    updateShowFormButtonValue(userDetails);
  }, [userDetails]);

  const updateShowFormButtonValue = (data: IUsersList | IUserData) => {
    let { email, first_name, last_name, consumer_number, staff_id } = data;
    if (
      email.trim() !== "" &&
      first_name.trim() !== "" &&
      last_name.trim() !== "" &&
      (staff_id?.trim() !== "" || consumer_number?.trim() !== "")
    ) {
      setShowFormButton(true);
    } else {
      setShowFormButton(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setUserDetails((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "is_active" ? !prevState.is_active : e.target.value,
    }));
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowFormButton(false);
    let result: any = {};
    if (!userDetails.id) {
      let data: IUserData = {
        ...userDetails,
        is_staff: userDetails.staff_id ? true : false,
        password: generateRandomPassword(),
      };
      result = await authApi.createUser(data, "?type=add");
      result = { ...userDetails, id: JSON.parse(result["data"]).id };
    } else {
      let data: IUsersList = { ...userDetails };
      result = await authApi.updateUser(data);
    }

    if (result) {
      setShowFormButton(true);
      setModalCallbackData(result, !userDetails.id ? "add" : "edit");
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-black bg-opacity-50 z-50 text-slate-900 flex items-center justify-center">
      <div className="max-w-xl bg-gray-300 rounded-md p-5">
        <div className="min-w-full relative">
          <CloseIcon
            className="h-6 w-6 absolute right-0 cursor-pointer"
            onClick={setHideModal}
          />
          <h2 className="gradient_text text-center font-bold text-2xl mb-7">
            {modalTitle}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <section className="flex items-center justify-between">
              <div className="mr-1">
                <label className="block text-lg">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="form_input"
                  value={userDetails?.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="ml-1">
                <label className="block text-lg">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="form_input"
                  value={userDetails?.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </section>
            <section className="mt-5">
              <label className="block text-lg">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form_input"
                value={userDetails?.email}
                onChange={handleChange}
                required
              />
            </section>
            {userDetails?.staff_id ||
            modalTitle.toLowerCase().includes("staff") ? (
              <section className="mt-5">
                <label className="block text-lg">Staff Id</label>
                <input
                  type="text"
                  name="staff_id"
                  id="staff_id"
                  className="form_input"
                  value={userDetails?.staff_id}
                  onChange={handleChange}
                  required
                />
              </section>
            ) : (
              <section className="mt-5">
                <label className="block text-lg">Consumer Number</label>
                <input
                  type="text"
                  name="consumer_number"
                  id="consumer_number"
                  className="form_input"
                  value={userDetails?.consumer_number}
                  onChange={handleChange}
                  required
                />
              </section>
            )}
            {userData?.email && (
              <section className="mt-5 flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  id="is_active"
                  checked={userDetails?.is_active}
                  onChange={handleChange}
                />
                <p className="ml-2">Account is active or not?</p>
              </section>
            )}
            <button
              type="submit"
              className={`mt-7 global_button ${
                showFormButton
                  ? "active_button"
                  : "inactive_button border-gray-700 border"
              }`}
            >
              {userData?.email ? "Edit" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CustomModal;
