import React from "react";
import * as style from "../styles/pizzaform.module.css";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import Input from "./Input";
import Select from "./Select";
import MaskInput from "./MaskInput";

interface FormInterface {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich";
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread: number;
}

const OrderForm = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormInterface>();

  const dishTypeOptions = ["", "pizza", "soup", "sandwich"];

  const dishType = watch("type");

  const handleSendData = async (data: FormInterface) => {
    setLoading(true);
    const req = await fetch(
      "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res: {
      [key: string]: string;
    } = await req.json();

    if (req.status === 200) {
      console.log(res);
    } else if (req.status === 400) {
      const fields = Object.keys(res);
      console.log(res);
      for (const i in fields) {
        const fieldName = fields[i];
        const message =
          typeof res[fieldName] === "string"
            ? res[fieldName]
            : (res[fieldName] as unknown as string[]).join(" ");
        setError(`root.${fieldName}`, {
          message,
        });
      }
    } else {
      console.error(res);
    }
    setLoading(false);
  };

  const dishTypeFields = (type: "pizza" | "soup" | "sandwich") => {
    switch (type) {
      default:
        return null;
      case "pizza": {
        const noOfSlicesRegister = register("no_of_slices", {
          required: "Type a number of slices!",
          valueAsNumber: true,
          shouldUnregister: true,
        });
        const diameterRegister = register("diameter", {
          required: "Type a diameter of pizza!",
          valueAsNumber: true,
          shouldUnregister: true,
        });

        return (
          <>
            <Input
              register={noOfSlicesRegister}
              type="number"
              errors={errors}
              label="No. of slices"
            />
            <Input
              register={diameterRegister}
              type="number"
              errors={errors}
              label="Diameter"
              step="0.01"
            />
          </>
        );
      }
      case "soup": {
        const spicinessScaleRegister = register("spiciness_scale", {
          required: "Scale of spiciness is required!",
          min: {
            value: 1,
            message: "Minimal value is 1!",
          },
          max: {
            value: 10,
            message: "Maximal value is 10!",
          },
          valueAsNumber: true,
          shouldUnregister: true,
        });

        return (
          <Input
            register={spicinessScaleRegister}
            type="number"
            errors={errors}
            label="Spiciness scale"
          />
        );
      }
      case "sandwich": {
        const slicesOfBreadRegister = register("slices_of_bread", {
          required: "Type a number of bread slices!",
          valueAsNumber: true,
          shouldUnregister: true,
        });

        return (
          <Input
            register={slicesOfBreadRegister}
            type="number"
            errors={errors}
            label="Slices of bread"
          />
        );
      }
    }
  };

  const nameRegister = register("name", { required: "Name is required!" });
  const preparationTimeRegister = register("preparation_time", {
    required: "Preparation time is required!",
    pattern: {
      value: /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/,
      message: "Time isn't correct!",
    },
  });
  const typeRegister = register("type", { required: "Choose a dish type!" });

  return (
    <form onSubmit={handleSubmit(handleSendData)} className={style.pizzaForm}>
      <h1>Order form</h1>
      <Input register={nameRegister} type="text" errors={errors} label="Name" />
      <MaskInput
        mask="99:99:99"
        placeholder="00:00:00"
        register={preparationTimeRegister}
        errors={errors}
        label="Preparation time"
      />
      <Select
        options={dishTypeOptions}
        label="Dish type"
        errors={errors}
        register={typeRegister}
      />
      {dishTypeFields(dishType)}
      <button type="submit">Send</button>
      {loading && <Loader />}
    </form>
  );
};

export default OrderForm;
