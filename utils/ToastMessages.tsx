import { toast } from "sonner";

export const success = (message: string) => {
  return toast.success(message ? message : "Success");
};

export const fail = (message: string) => {
  return toast.error(message ? message : "Unkown Error Occured");
};

export const aiError = (message: any) => {
  return toast.error(
    message
      ? message?.response?.data?.response?.message?.error?.message
      : "Unkown Error Occured"
  );
};
