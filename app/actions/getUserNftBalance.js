"use server";

export async function getUserNftBalance(userPublicKey, nftPostHashHex) {
  try {

    const res = await fetch("https://node.deso.org/api/v0/get-nfts-for-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserPublicKeyBase58Check: userPublicKey,

      }),
    });

    const data = await res.json();
    //console.log(data)
    const nftMap = data.NFTsMap || {};

    const nftEntry = nftMap[nftPostHashHex];
    console.log(nftEntry)

    if (!nftEntry?.NFTEntryResponses || !Array.isArray(nftEntry.NFTEntryResponses)) {
      return {count: 0, extraData: null };
    }
    if (!nftEntry?.PostEntryResponse) {
      return {count: 0, extraData: null };
    }

    const owned = nftEntry.NFTEntryResponses.filter(
      (entry) => entry.OwnerPublicKeyBase58Check === userPublicKey
    );

    return {
      count: owned.length,
      extraData: nftEntry?.PostEntryResponse?.PostExtraData || null,
    };


  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return -1;
  }
}
