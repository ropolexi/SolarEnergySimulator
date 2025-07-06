"use server";
import { owner_id } from "@/config/header";

export async function getAssetImage(PostHashHex) {
  try {

    const res = await fetch("https://node.deso.org/api/v0/get-single-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AddGlobalFeedBool: false,
        CommentLimit:0,
        CommentOffset:0,
        FetchParents:false,
        PostHashHex:PostHashHex,
        ReaderPublicKeyBase58Check:owner_id

      }),
    });

    const data = await res.json();
    //console.log(data)
    const post = data?.PostFound || {};

    return(post?.ImageURLs||null)

  } catch (error) {
    console.error("Error fetching NFT URL:", error);
    return -1;
  }
}
