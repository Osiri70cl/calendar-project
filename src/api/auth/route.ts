import makeApiRequest from "@global/utils/apiRequest";

export async function fetchPostLogin(formData: any) {
  return await makeApiRequest("/login", "POST", formData);
}

export async function fetchPostSignup(formData: any) {
  return await makeApiRequest("/signup", "POST", formData);
}

export async function fetchPostLogout() {
  return await makeApiRequest("/logout", "POST");
}
