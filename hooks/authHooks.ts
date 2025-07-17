import { Axios } from "@/utils/Axios";
import { fail, success } from "@/utils/ToastMessages";
import Cookies from "js-cookie";
// let route = useRouter();

export async function signIn(email: string, password: string, router: any) {
  try {
    const response = await Axios.post("/user/signin", { email, password });

    console.log("🚀 ~ signIn ~ response:", response);
    const DATA = response.data.message;
    Cookies.set("user", JSON.stringify(DATA.user));
    Cookies.set("authToken", DATA.token);
    success("User Logged-In Successfully");
    window.location.href = "/";
    router.push("/");
  } catch (error: any) {
    console.log(error);
    fail(
      error.response ? error.response.data.message : "Unknown Error Occured"
    );
  }
}

export async function signUp(email: string, password: string, router: any) {
  try {
    const username = email.split("@")[0];
    const response = await Axios.post("/user", {
      username,
      email,
      password,
      type: "user",
      plan: "free",
      subscription: "",
      credits: 10,
    });
    success("User Created Successfully");
    router.push("/signin");
    // window.location.href = "/signin";
  } catch (error: any) {
    console.log(error);
    fail(
      error.response ? error.response.data.message : "Unknown Error Occured"
    );
  }
}

export async function logout() {
  try {
    Cookies.remove("user");
    Cookies.remove("authToken");
    success("Logged Out Successfully");
    window.location.href = "/";
  } catch (error: any) {
    console.log(error);
    fail(
      error.response ? error.response.data.message : "Unknown Error Occured"
    );
  }
}
