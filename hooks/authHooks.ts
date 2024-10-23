import { Axios } from "@/utils/Axios";
import { fail, success } from "@/utils/ToastMessages";
import Cookies from "js-cookie";
// let route = useRouter();

export async function signIn(email: string, password: string) {
  try {
    const response = await Axios.post("/user/signin", { email, password });
    console.log(response.data);
    const DATA = response.data.message;
    Cookies.set("user", JSON.stringify(DATA.user));
    Cookies.set("authToken", DATA.token);
    success("User Logged-In Successfully");
    window.location.href = "/";
  } catch (error: any) {
    console.log(error);
    fail(
      error.response ? error.response.data.message : "Unknown Error Occured"
    );
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
    // route.push("/signin");
    window.location.href = "/signin";
    console.log(response.data);
  } catch (error: any) {
    console.log(error);
    fail(
      error.response ? error.response.data.message : "Unknown Error Occured"
    );
  }
}
