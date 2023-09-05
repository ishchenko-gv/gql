import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  avatar: string;
};

export default function Avatar() {
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (_: FormFields, event) => {
    const form = event?.target;

    if (!form) return;

    const formData = new FormData(form);

    await fetch(form.action, {
      method: form.method,
      body: JSON.stringify(formData),
      credentials: "include",
      headers: {
        "Content-Type": form.enctype,
      },
    });
  };

  return (
    <form
      encType="multipart/form-data"
      method="POST"
      action="http://localhost:5005/user/upload-avatar"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-4">
        <input
          {...register("avatar")}
          type="file"
          multiple
          className="file-input w-full"
          onDrop={console.log}
        />
      </div>
      <div>
        <button className="btn">Upload photo</button>
      </div>
    </form>
  );
}
