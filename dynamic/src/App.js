import logo from "./logo.svg";
import "./App.css";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";

function App() {
  const [dynamicSchema, setDynamicSchema] = useState(Yup.string().required());
  const formSchema = Yup.object().shape({ name: dynamicSchema });
  const form = useForm({
    defaultValues: { name: "" },
    resolver: yupResolver(formSchema),
    mode: "all",
  });
  const { control, handleSubmit } = form;

  useEffect(() => {
    setTimeout(() => {
      setDynamicSchema(Yup.string().min(10).required());
    }, 2000);
  }, []);
  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log({ values });
      })}
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState, formState }) => {
          return (
            <>
              <input {...field} />
              <p>{fieldState.error?.message}</p>
            </>
          );
        }}
      />
    </form>
  );
}

export default App;
