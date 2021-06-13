
/*
--------
Authorization - auth token - when to require a user to re-login or limit scope of their access based on time away from the comp.
--------
// https://www.youtube.com/watch?v=7Q17ubqLfaM <= WATCH
// https://www.youtube.com/watch?v=mbsmsi7l3r4 <= WATCH
// https://jwt.io/

- JWT for authorization
- following login, store the auth token (generated using jwt library) into the cookies for every follow-on request. Use jwt.verify() on server-side to validate the token and get the user data. To update the hashing algo, change your secret code and your hash's should be all different. To refresh a token, you just need to generate a new token and send it in the cookies down.

header: {
  "alg": "HS256",
  "typ": "JWT"
}

payload: {
  "sub": "1234567890", => spsId (userTable id)
  "name": "John Doe", => userName
  "iat": 1516239022 => issued-at time (for server side time based expiration check)
  "exp": 1516239022 => expire-at time can also be specified
}

Server-side JWT token generation:

const signature = HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload),
    <your-256-bit-secret> (this is your secret key located on the server that will encrypt the payload and header)
) secret base64 encoded
----------------------

NOTE - 6/13/2021 -
1) READ THE CODE TO LEARN THE FLOWS
- login, secure calls using unexpiring auth token flow
- login, secure calls, and refresh token using expiring auth token flow

2) Watch the youtube videos

*/