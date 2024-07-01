//* all external libraries at the top
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

//* imported components
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow2 from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCancel }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(errors);

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log(data);
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      // editCabin({ newCabinData: { ...data, image }, id: editId });
      editCabin(
        { newCabinData: data, id: editId },
        {
          onSuccess: (data) => {
            reset();
            console.log(data);
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            console.log(data);
          },
        }
      );
    // else createCabin({ ...data, image: data.image[0] });
    // mutate({ ...data, image: data.image[0] });
    // mutate(data);
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow2 label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is required",
          })}
          disabled={isWorking}
        />
      </FormRow2>

      <FormRow2 label="maxCapacity" error={errors?.name?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
          disabled={isWorking}
        />
      </FormRow2>

      <FormRow2 label="regularPrice" error={errors?.name?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is required",
          })}
          disabled={isWorking}
        />
      </FormRow2>

      <FormRow2 label="discount" error={errors?.name?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
          disabled={isWorking}
        />
      </FormRow2>

      <FormRow2 label="description" error={errors?.name?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow2>

      <FormRow2 label="image" error={errors?.name?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This Field is required",
          })}
        />
      </FormRow2>

      <FormRow2>
        {/* type is an HTML attribute! */}
        <Button onClick={onCancel} variation="danger" type="reset">
          Close Form
        </Button>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {" "}
          {isEditSession ? "Edit cabin" : "Create Cabin"}
        </Button>
      </FormRow2>
    </Form>
  );
}

export default CreateCabinForm;
