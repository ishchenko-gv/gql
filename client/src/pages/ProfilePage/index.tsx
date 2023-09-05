import { useContext, useEffect } from "react";
import { UserContext } from "../../common/user";
import { gql, useQuery } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Avatar from "./components/Avatar/intex";

const GET_USER_PROFILE = gql`
  query getUserProfile {
    userProfile {
      firstName
      lastName
    }
  }
`;

type FormFields = {
  firstName: string;
  lastName: string;
};

export default function ProfilePage() {
  const { data, loading, error } = useQuery(GET_USER_PROFILE);
  const userCtx = useContext(UserContext);
  const { register, reset, handleSubmit } = useForm<FormFields>();

  useEffect(() => {
    reset({
      firstName: data?.userProfile.firstName,
      lastName: data?.userProfile.lastName,
    });
  }, [data, reset]);

  const onSubmit: SubmitHandler<FormFields> = (data: FormFields, event) => {
    console.log(event, data);
    const formData = new FormData(event?.target);
    for (const item of formData) {
      console.log(item);
    }
  };

  if (loading) return <p>loading</p>;
  if (error) return <p>error</p>;

  return (
    <div>
      <Avatar />
      <form
        className="w-[300px] ml-auto mr-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <TextInput value={userCtx.user?._id || ""} label="id" isDisabled />
        </div>
        <div className="mt-4">
          <TextInput
            value={userCtx.user?.email || ""}
            label="email"
            isDisabled
          />
        </div>
        <div className="mt-4">
          <TextInput {...register("firstName")} label="first name" />
        </div>
        <div className="mt-4">
          <TextInput {...register("lastName")} label="last name" />
        </div>
        <div className="mt-4">
          <button type="submit" className="btn w-full">
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
}
