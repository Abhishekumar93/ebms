export const handleHrefEncode = (userEmail: string, userId: number): string => {
  let encodedHref = btoa(
    encodeURIComponent(btoa(`${userEmail}-${userId * 9}`))
  );

  return encodeURIComponent(encodedHref);
};

export const handleHrefDecode = (encodedHref: string): number => {
  let decodedHref =
    parseInt(
      atob(decodeURIComponent(atob(decodeURIComponent(encodedHref))))
        .split("-")
        .pop() as string
    ) / 9;

  return decodedHref;
};
