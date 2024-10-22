import { Axios } from "@/utils/Axios";
import { fail, success } from "@/utils/ToastMessages";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

let route = useRouter();

export async function signIn(email: string, password: string) {
  try {
    const response = await Axios.post("/user/signin", { email, password });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

export async function signUp(email: string, password: string) {
  try {
    const username = email.split("@")[0];
    const response = await Axios.post("/user", {
      username,
      email,
      password,
    });
    success("User Created Successfully");
    route.push("/signin");
    console.log(response.data);
  } catch (error: any) {
    console.log(error);
    fail(
      error.response ? error.response.data.message : "Unknown Error Occured"
    );
  }
}
