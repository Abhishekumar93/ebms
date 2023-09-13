"use client";

import Loading from "@/app/loading";
import { displayErrorFlashMessage } from "@/utils/displayFlashMessage.utils";
import {
  clearLocalStorage,
  getLocalStorageData,
} from "@/utils/localStorage.utils";
import { getApi } from "@/utils/restApi.utils";
import React, { useEffect, useState } from "react";
import CheckIcon from "@/../public/svg/checkIcon";
import CrossIcon from "@/../public/svg/crossIcon";
import EditIcon from "@/../public/svg/editIcon";
import { IUsersList } from "@/interface/user.interface";
import CustomModal from "../modal/modal";
import ReactPaginate from "react-paginate";
import { IPaginatedUserList } from "@/interface/userApi.interface";
import Filter from "../filter/filter";
import { callbackDataType, filterFields } from "@/types/dataType.type";
import Tooltip from "../tooltip/tooltip";
import Link from "next/link";
import { handleHrefEncode } from "@/utils/hrefEncode.utils";
import { useDispatch } from "react-redux";
import { removeUserDetail } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 15;

type userType = "Consumer" | "Staff";

interface IProps {
  userType: userType;
}

const UsersList: React.FC<IProps> = ({ userType }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isUsersListFetched, setIsUsersListFetched] = useState<boolean>(false);
  const [users, setUsers] = useState<IUsersList[]>([
    {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      consumer_number: "",
      staff_id: "",
      is_active: false,
    },
  ]);
  const [selectedUser, setSelectedUser] = useState<IUsersList>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    consumer_number: "",
    staff_id: "",
    is_active: false,
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [filterBy, setFilterBy] = useState<filterFields>("all");
  const [indexValue, setIndexValue] = useState<number>(0);

  useEffect(() => {
    let auth_token = getLocalStorageData("auth_token");
    setIndexValue(PAGE_SIZE * currentPage);

    if (auth_token) {
      setIsUsersListFetched(false);
      getUserData(auth_token, userType === "Consumer" ? "1" : "0");
    } else {
      removeLocalData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterBy, userType]);

  const removeLocalData = () => {
    dispatch(removeUserDetail({}));
    clearLocalStorage();
    router.push("/login");
  };

  const getUserData = async (token: string, role: string) => {
    try {
      let response = await getApi(
        `list/user/?user_role=${role}&page=${
          currentPage + 1
        }&page_size=${PAGE_SIZE}${
          filterBy !== "all"
            ? `&is_active=${filterBy === "active" ? "True" : "False"}`
            : ""
        }`,
        {
          Authorization: `Token ${token}`,
        }
      );
      let response_data: IPaginatedUserList = response.data;
      setUsers(response_data.results);
      setTotalPage(response_data.page_count);
      setIsUsersListFetched(true);
    } catch (error: any) {
      let error_data = error.response.data;
      let error_data_key = Object.keys(error_data)[0];
      let error_message_data = [
        {
          errorKey: "detail",
          errorMessage: "Session expired!",
        },
      ];
      displayErrorFlashMessage(error_data_key, error_message_data);
      if (error.response.status === 401) {
        removeLocalData();
      }
    }
  };

  const handleModalVisibility = (
    e: React.MouseEvent<HTMLElement>,
    user?: IUsersList
  ) => {
    e.stopPropagation();
    setSelectedUser((prevState) => ({
      ...prevState,
      ...user,
    }));
    setShowModal((prevState) => !prevState);
  };

  const hideModal = () => {
    let reset_data = {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      consumer_number: "",
      staff_id: "",
      is_active: false,
    };
    setShowModal((prevState) => !prevState);
    setSelectedUser((prevState) => ({
      ...prevState,
      ...reset_data,
    }));
  };
  const modalCallbackData = (data: IUsersList, dataType: callbackDataType) => {
    if (dataType === "edit") {
      let user_index = users.findIndex((user) => user.id === data.id);
      if (filterBy === "all") {
        users.splice(user_index, 1, data);
      } else {
        users.splice(user_index, 1);
      }
    } else {
      if (filterBy === "all" || filterBy === "inactive") {
        setUsers([data, ...users]);
      }
    }
    hideModal();
  };
  const handlePageClick = (e: any) => {
    setCurrentPage(e.selected);
  };
  const filterClick = (value: filterFields) => {
    setFilterBy(value);
    setCurrentPage(0);
  };

  const displayUsersData = () => {
    if (isUsersListFetched) {
      if (users.length > 0) {
        return (
          <table className="w-full table-fixed border border-collapse text-xs lg:text-base">
            <thead>
              <tr className="mb-3 w-full">
                <th className="px-3 py-2 text-left border border-slate-300 w-1/12">
                  S. No.
                </th>
                <th className="px-3 py-2 text-left border border-slate-300 w-[28.3%]">
                  Name
                </th>
                <th className="px-3 py-2 text-left border border-slate-300">
                  Email
                </th>
                <th className="px-3 py-2 text-left border border-slate-300 w-1/5">
                  {userType === "Consumer" ? "Consumer Number" : "Staff Id"}
                </th>
                <th className="px-3 py-2 text-left border border-slate-300 w-1/12">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>{displayUsersList()}</tbody>
          </table>
        );
      } else {
        return (
          <h4 className="py-10 text-lg text-center">{`No ${
            userType === "Consumer" ? "Consumer" : "Staff"
          } Found!`}</h4>
        );
      }
    } else {
      return (
        <div className="py-10">
          <Loading />
        </div>
      );
    }
  };

  const displayUsersList = () => {
    return users.map((user, index) => {
      return (
        <tr key={user.email} className="mb-2">
          <td className="px-3 py-2 border border-slate-300">
            {indexValue + index + 1}
          </td>
          <td className="px-3 py-2 border border-slate-300 flex items-center">
            <div onClick={(e) => handleModalVisibility(e, user)}>
              <EditIcon className="h-5 w-5 cursor-pointer fill-slate-700 dark:fill-slate-300" />
            </div>
            &ensp;
            <nav>
              <Link
                href={`/user/${handleHrefEncode(user.email, user.id)}`}
                className="text-blue-500 underline cursor-pointer w-fit"
              >{`${user.first_name.trim()} ${user.last_name.trim()}`}</Link>
            </nav>
          </td>
          <td className="px-3 py-2 border border-slate-300">{user.email}</td>
          <td className="px-3 py-2 border border-slate-300">
            {userType === "Consumer" ? user.consumer_number : user.staff_id}
          </td>
          <td className="px-3 py-2 border border-slate-300">
            <Tooltip tooltipText={user.is_active ? "Active" : "Inactive"}>
              {user.is_active ? (
                <CheckIcon className="h-5 w-5 dark:fill-green-500 fill-green-600 hover:fill-green-600 mx-auto" />
              ) : (
                <CrossIcon className="h-5 w-5 dark:fill-red-500 fill-red-600 mx-auto" />
              )}
            </Tooltip>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {showModal && (
        <CustomModal
          modalTitle={`${selectedUser.email ? "Edit" : "Add"} ${
            userType === "Consumer" ? "Consumer" : "Staff"
          }`}
          userData={selectedUser}
          setHideModal={hideModal}
          setModalCallbackData={modalCallbackData}
        />
      )}
      <div className="relative">
        <button
          className="absolute right-4 top-0 global_button active_button shadow-[0_1px_3px_#d1d5db]"
          onClick={(e) => handleModalVisibility(e)}
        >
          {`Add ${userType === "Consumer" ? "Consumer" : "Staff"}`}
        </button>
        <div className="max-w-screen-lg mx-auto shadow-inner dark:shadow-slate-300 shadow-slate-600 my-6 p-4 rounded-md overflow-hidden">
          <h1 className="text-3xl text-center mb-4 font-semibold gradient_text">
            {`${userType === "Consumer" ? "Consumers" : "Staffs"} List`}
          </h1>
          {displayUsersData()}
        </div>
        <Filter setFilterClick={filterClick} />
      </div>
      {totalPage > 1 && (
        <ReactPaginate
          previousLabel="Prev"
          nextLabel="Next"
          pageCount={totalPage}
          breakLabel="..."
          pageRangeDisplayed={5}
          className="flex max-w-[50%] ml-auto w-fit mr-4 rounded dark:bg-gray-600 bg-gray-200 border border-gray-700 mb-4 rounded-l"
          pageClassName="py-2 px-4 border-r border-gray-700 hover:bg-gray-100 dark:hover:text-slate-700"
          previousClassName="py-2 px-4 border-r border-gray-700 hover:bg-gray-100 dark:hover:text-slate-700 hover:rounded-l-sm"
          nextClassName="py-2 px-4 hover:bg-gray-100 dark:hover:text-slate-700 hover:rounded-r-sm"
          breakClassName="px-4 border-r border-gray-700"
          activeClassName="dark:bg-gray-300 bg-gray-100 dark:text-slate-700 bold"
          onPageChange={handlePageClick}
          forcePage={currentPage}
        />
      )}
    </>
  );
};

export default UsersList;
