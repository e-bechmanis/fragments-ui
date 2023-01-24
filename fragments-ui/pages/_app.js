import { Authenticator } from "@aws-amplify/ui-react";
import { getUserFragments } from "./api/api";
import { Auth, getUser } from "../lib/auth";
import "@aws-amplify/ui-react/styles.css";

export default function App() {
  function connectToApi() {
    getUser().then((user) => getUserFragments(user));
  }

  return (
    <Authenticator signUpAttributes={["email", "name"]}>
      {({ signOut, user }) => (
        <main onLoad={connectToApi()}>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}
