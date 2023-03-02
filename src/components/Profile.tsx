import { message } from "antd";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";

import editImg from "../assets/img/edit-img.png";
import acctdp from "../assets/img/image 1.png";
// import acctdp from "../assets/img/acctdp.png";
// import { userData } from "../helpers/authHelper";
import {
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useUploadImageMutation,
} from "../redux/services/auth-services";

import Button from "./bits/Button";
import Input from "./bits/InputText";
import LoadingButton from "./bits/LoadingButton";
import LoadingRoller from "./bits/LoadingRoller";
import NoData from "./bits/NoData";

interface FormDataProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  address: string;
  dob: string;
  referralLink: string;
  avatarUrl: string;
  avatarFile: File | string;
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const {
    data: userData,
    isLoading: dataLoading,
    refetch,
  }: any = useGetUserProfileQuery();
  const [formData1, setFormData1] = useState<FormDataProps>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    dob: "",
    referralLink: "https://google.com",
    avatarUrl: "",
    avatarFile: "",
    // gender: "male"
  });
  const [updateUser] = useUpdateUserMutation();
  const [uploadImage] = useUploadImageMutation();

  const [formData2, setFormData2] = useState({
    fullName: "",
    relationship: "",
    email: "",
    phoneNo: "",
  });

  useLayoutEffect(() => {
    setFormData1((currData) => {
      return {
        ...currData,
        firstName: userData?.name,
        lastName: userData?.last_name,
        email: userData?.email,
        phoneNo: userData?.phone,
        address: userData?.user_profile.address,
        dob: userData?.user_profile.date_of_birth,
        referralLink: "https://google.com",
        avatarUrl: userData?.user_profile.avatar,
        avatarFile: "",
      };
    });

    setFormData2((currData) => {
      return {
        ...currData,
        fullName: userData?.user_profile.next_of_kin_name,
        relationship: userData?.user_profile.next_of_kin_relationship,
        email: userData?.user_profile.next_of_kin_email,
        phoneNo: userData?.user_profile.next_of_kin_number,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let avatarUrl = "";

  const profileData = [
    {
      key: 1,
      name: "firstName",
      label: "First Name",
      value: formData1.firstName,
      type: "text",
      disabled: false,
      required: true,
    },
    {
      key: 2,
      name: "lastName",
      label: "Last Name",
      value: formData1.lastName,
      type: "text",
      disabled: false,
      required: true,
    },
    {
      key: 3,
      name: "email",
      label: "Email Address",
      value: formData1.email,
      type: "email",
      disabled: true,
      required: false,
    },
    {
      key: 4,
      name: "phoneNo",
      label: "Phone Number",
      value: formData1.phoneNo,
      type: "tel",
      disabled: false,
      required: true,
    },
    {
      key: 5,
      name: "dob",
      label: "Date of Birth",
      value: formData1.dob,
      type: "date",
      disabled: false,
      required: true,
    },
    {
      key: 6,
      name: "referralLink",
      label: "Referral Link",
      value: formData1.referralLink,
      type: "url",
      disabled: false,
      required: false,
    },
  ];

  const nextOfKinData = [
    {
      key: 1,
      name: "fullName",
      label: "Full Name",
      value: formData2.fullName,
      type: "text",
      disabled: false,
      required: true,
    },
    {
      key: 2,
      name: "relationship",
      label: "Last Name",
      value: formData2.relationship,
      type: "text",
      disabled: false,
      required: true,
    },
    {
      key: 3,
      name: "email",
      label: "Email Address",
      value: formData2.email,
      type: "email",
      disabled: false,
      required: true,
    },
    {
      key: 4,
      name: "phoneNo",
      label: "Phone Number",
      value: formData2.phoneNo,
      type: "tel",
      disabled: false,
      required: true,
    },
  ];

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFormData1({
        ...formData1,
        avatarUrl: URL.createObjectURL(e.target.files[0]),
        avatarFile: e.target.files[0],
      });
    }
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  const handleKinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData2({
      ...formData2,
      [name]: value,
    });
  };

  // let user = userData();

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (formData1.avatarFile) {
        const imgUploadData = new FormData();
        imgUploadData.append("image", formData1.avatarFile);
        const res: any = await uploadImage(imgUploadData);
        if (res?.data?.status === "success") {
          // console.log("success");
          avatarUrl = res.data?.data?.url;
        } else {
          message.error(res?.error?.data?.message);
        }
        setIsLoading(false);
      }

      const res: any = await updateUser({
        firstname: formData1.firstName,
        lastname: formData1.lastName,
        address: formData1.address,
        avatar: avatarUrl,
        next_of_kin_name: formData2.fullName,
        next_of_kin_number: formData2.phoneNo,
        next_of_kin_email: formData2.email,
        next_of_kin_relationship: formData2.relationship,
        date_of_birth: formData1.dob,
        meta: "{'extra': 'valid'}",
      });
      if (res?.data?.status === "success") {
        localStorage.setItem("user", JSON.stringify(res?.data?.data));
        message.success("User profile updated successfully");
      } else {
        message.error(res?.error?.data?.message);
      }
      setIsLoading(false);
    } catch (error: any) {
      message.error(error?.data?.message);
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <section className="form-container col-md-10 mx-auto">
        {dataLoading ? (
          <LoadingRoller />
        ) : userData ? (
          <form onSubmit={(e) => submitHandler(e)} className="form-inner">
            <div className="icon">
              {formData1.avatarUrl ? (
                <img
                  src={formData1.avatarUrl}
                  alt="profile icon"
                  className="profile-icon"
                />
              ) : (
                <img src={acctdp} alt="profile icon" className="profile-icon" />
              )}
              <label htmlFor="img-upload" className="edit-icon">
                <img src={editImg} alt="edit-icon" />
              </label>
            </div>
            <input
              type="file"
              id="img-upload"
              onChange={handleFile}
              accept="image/*"
              className="i-none"
            />
            <div className="form-body">
              {profileData.map((profile, id) => (
                <div key={id} className="profile">
                  <p className="label">{profile.label}</p>
                  {
                    <Input
                      key={profile.key}
                      name={profile.name}
                      type={profile.type}
                      value={
                        profile.type === "date"
                          ? profile?.value?.toString().slice(0, 10) || ""
                          : profile.value
                      }
                      placeholder={profile.label}
                      onChange={handleProfileChange}
                      disabled={profile.disabled}
                      required={profile.required}
                    />
                  }
                </div>
              ))}
            </div>
            <div className="kin">
              <p>
                <b>Next of kin</b>
              </p>
              <p>Enter details about your next of kin here:</p>
            </div>
            <div className="form-body">
              {nextOfKinData.map((kin, id) => (
                <div key={id} className="profile">
                  <p className="label">{kin.label}</p>
                  {
                    <Input
                      key={kin.key}
                      name={kin.name}
                      type={kin.type}
                      value={kin.value}
                      placeholder={kin.label}
                      onChange={handleKinChange}
                      disabled={kin.disabled}
                      required={kin.required}
                    />
                  }
                </div>
              ))}
            </div>
            <div className="mt-2 col-sm-12 px-0 col-md-4 ml-auto">
              <Button type="submit" styleClass="mr-4 mb-2">
                {isLoading ? <LoadingButton /> : "Save Changes"}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-4 pt-4">
            <NoData text="Please check your internet connection or reload the page." />
          </div>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;

  .form-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // width: 100%;
    margin-top: 3rem;

    .icon {
      margin: 0rem 0 2rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100%;
      width: 200px;
      height: 200px;
      position: relative;

      .profile-icon {
        width: 200px;
        height: 200px;
        border-radius: 100%;
      }

      .edit-icon {
        cursor: pointer;
        position: absolute;
        z-index: 10;
        top: 5px;
        right: 0;
      }
    }
    .i-none {
      display: none;
    }

    .form-body {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 80%;
      .profile {
        width: 47%;
        margin-bottom: 1rem;
      }
      .label {
        margin: 0.5rem 0;
        font-weight: bold;
        // font-size: 16px;
        color: #33277b;
      }
    }
    .kin {
      margin-top: 2rem;
      // font-size: 16px;
      color: #33277b;
    }
    .button {
      display: flex;
      justify-content: flex-end;
      margin: 3rem 0;
    }
  }

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .form-container {
      margin-top: 0rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0;
      .form-inner {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .kin {
          width: 100%;
        }
      }
      // .icon {
      //   // margin-top: 3rem;
      //   margin: 1rem 0 1rem 0;
      // }
      // .icon-cover {
      //   display: flex;
      //   flex-direction: row;
      //   justify-content: center;
      //   align-items: center;
      // }
      .form-body {
        width: 100% !important;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        // align-items: center;
        // flex-wrap: wrap;
        padding: 0;
        .profile {
          width: 100% !important;
        }
        // .label {
        //   margin: 1rem 0;
        //   /* font-family: Mollen Personal Use; */
        //   font-weight: bold;
        //   font-size: 13px;
        //   line-height: 16px;
        //   color: #7b7b7b;
        // }
      }
    }
  }
`;

export default Profile;
