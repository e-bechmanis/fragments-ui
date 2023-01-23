import { Auth, getUser } from "../lib/auth";
import { SWRConfig } from "swr";
import { getUserFragments } from "./api/api";

export default function App({ Component, pageProps }) {
  let user = getUser();
  console.log(user);
  getUserFragments(user);

  return (
    <>
      <SWRConfig
        value={{
          fetcher: async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
              const error = new Error(
                "An error occurred while fetching the data."
              );
              error.info = await res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          },
        }}
      >
        <Component {...pageProps} />
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        {user && <button onClick={Auth.signOut()}>Sign Out</button>}
        {user && <p>Hi, {user.username}</p>}
      </SWRConfig>
    </>
  );
}
