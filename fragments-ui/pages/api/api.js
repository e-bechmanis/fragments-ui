// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", { data });
  } catch (err) {
    console.error("Unable to call GET /v1/fragments", { err });
  }
}

export async function postUserFragment(user) {
  console.log("Sending user fragments data...");

  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
      "Content-Type": "text/plain",
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (res.status === 200) {
      console.log("Success", { data });
      return data;
    }
  } catch (err) {
    console.error("Unable to call POST /v1/fragments", { err });
  }
}

export async function getFragmentById(id) {
  console.log("Requesting user fragment data");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragment data", { data });
  } catch (err) {
    console.error("Unable to call GET /v1/fragments", { err });
  }
}