// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments({ user }) {
  console.log("Requesting user fragments data...");
  console.log({ user });
  try {
    const res = await fetch(`${apiUrl}/v1/fragments?expand=1`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
    return data.fragments;
  } catch (err) {
    console.error("Unable to call GET /v1/fragments", { err });
  }
}

/**
 * Given an authenticated user, delete fragment for this user from the
 * fragments microservice. We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function deleteUserFragments({ user }, id) {
  console.log("Deleting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "DELETE",
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Deleted user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call DELETE /v1/fragments/:id", { err });
  }
}

export async function postUserFragment(user, type, fragment) {
  console.log("Sending user fragments data...");
  console.log(user);
  console.log(type);
  console.log(fragment);
  const idToken = user.idToken;
  // IF content-type is application/json, we need to stringify the data to be able to send it
  if (type === "application/json") {
    fragment = JSON.stringify(fragment);
  }
  try {
    console.log(fragment);
    //const rawBody = Buffer.from(fragment);
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      // Generate headers with the proper Authorization bearer token to pass
      headers: {
        "Content-Type": type,
        Authorization: `Bearer ${idToken}`,
      },
      body: fragment,
    });
    if (!res.ok) {
      console.log(res.status, res.statusText);
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Data received from POST request");
    console.log(data);
    if (res.status === 201) {
      console.log("Success", { data });
      return { data };
    }
  } catch (err) {
    console.error("Unable to call POST /v1/fragments", { err });
  }
}

export async function updateUserFragment({ user }, type, id, fragment) {
  console.log("Updating user fragments data...");
  console.log(fragment);
  const idToken = user.idToken;
  // IF content-type is application/json, we need to stringify the data to be able to send it
  if (type === "application/json") {
    fragment = JSON.stringify(fragment);
  }
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": type,
        Authorization: `Bearer ${idToken}`,
      },
      body: fragment,
    });
    if (!res.ok) {
      console.log(res.status, res.statusText);
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Data received from PUT request");
    console.log(data);
    if (res.status === 201) {
      console.log("Success", { data });
      return { data };
    }
  } catch (err) {
    console.error("Unable to call PUT /v1/fragments", { err });
  }
}

export async function getFragmentById({ user }, id, ext = "N/A") {
  console.log("Requesting user fragment data");
  if (ext == "N/A") {
    try {
      console.log(`URL being called is ${apiUrl} /v1/fragments/ ${id}`);
      const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
        method: "GET",
        // Generate headers with the proper Authorization bearer token to pass
        headers: user.authorizationHeaders(),
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const contentType = res.headers.get("content-type");
      console.log("Content-type is ", contentType);
      let data = "";
      if (contentType.startsWith("image")) {
        data = await res.blob();
      } else if (contentType.startsWith("application")) {
        data = await res.json();
      } else {
        data = await res.text();
      }
      console.log(typeof data);
      console.log(data);
      return { data: data, type: contentType };
    } catch (err) {
      console.error("Unable to call GET /v1/fragments", { err });
    }
  } else {
    console.log("Non/N/A extension");
    console.log(`${apiUrl}/v1/fragments/${id}${ext}`);
    try {
      const res = await fetch(`${apiUrl}/v1/fragments/${id}${ext}`, {
        method: "GET",
        // Generate headers with the proper Authorization bearer token to pass
        headers: user.authorizationHeaders(),
      });
      console.log(res);
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const contentType = res.headers.get("content-type");
      let data = "";
      if (contentType.startsWith("image")) {
        data = await res.blob();
      } else if (contentType.startsWith("application")) {
        data = await res.json();
      } else {
        data = await res.text();
      }
      console.log(typeof data);
      console.log(data);
      return { data: data, type: contentType };
    } catch (err) {
      console.error("Unable to call GET /v1/fragments", { err });
    }
  }
}
