/*

Shopify Youtube Tutorial - https://www.youtube.com/watch?v=A8YCxBTgsbI

HOW TO BUILD A SHOPIFY APP:
------------------------
- https://shopify.dev/apps/getting-started/create

Your app server needs an endpoint that takes in "shop" and "host" query params and checks whether the app is installed on the store
  - The app is installed on a store basis, and a merchant can have many stores.
  - When you develop your app, you connect it to a test store to see what the experience will be like.
    - In the Merchant's App dashboard, they will see an iframe of your store's page.
    - The merchant can also be redirected to your own website instead of being shown in the iframe (like how Privy's app in the merchant dashboard redirects AND logs the user into the Privy dashboard.)
      -

Endpoint you need that will be called by the Shopify app ___ ? :
- http://localhost:63783?shop=max-test-wizard-store-for-partner-account.myshopify.com&host=bWF4LXRlc3Qtd2l6YXJkLXN0b3JlLWZvci1wYXJ0bmVyLWFjY291bnQubXlzaG9waWZ5LmNvbS9hZG1pbg
  - shop=max-test-wizard-store-for-partner-account.myshopify.com
  - host=bWF4LXRlc3Qtd2l6YXJkLXN0b3JlLWZvci1wYXJ0bmVyLWFjY291bnQubXlzaG9waWZ5LmNvbS9hZG1pbg




=================================================
Shopify CLI start of application process:
=================================================

0) First you run npm run dev which has the script of "shopify app dev"

- This will trigger the node_modules/.bin/shopify to run

- Then that script imports node_modules/@shopify/cli/dist/index.js > runCLI and passes in {development:false}.

  - runCLI is named runShopifyCLI in node_modules/@shopify/cli/dist/index.js

  - the runShopifyCLI then calls node_modules/@shopify/cli-kit/dist/node/cli.js > runCLI

  - this function uses the run method from @oclif/core lib (https://github.com/oclif/core which is a cli building library)
    - the run method is passed an options object = {
      moduleURL: "file:///Users/maxtam/Desktop/development/shopify-demo-app/demo-app-1/node_modules/@shopify/cli/dist/index.js",
      development: false,
    }

    - the run method will somehow pull out the additional cli params of "app" and "dev" in contrast to just running "shopify" as a standalone command.

1) then the command will route to - node_modules/@shopify/app/dist/cli/services/dev.js > dev

2) dev then calls - node_modules/@shopify/cli-kit/dist/session.js > ensureAuthenticatedPartners

  - Function to execute auth to the partner's dashboard
  -

3) node_modules/@shopify/cli-kit/dist/session.js > ensureAuthenticated
  - ensureAuthenticated is a central method for auth execution for various APIs.

  - This function takes in an object of the application + scopes you want access to, and the environment vars of process.env and executes authentication:
    - ex of application + scopes obj => {
      partnersApi: {
          scopes: [
          ],
        },
      }

    - The function logic is
      A) find the Identity service url to ping (identity fqdn)
        - process.env.SHOPIFY_SERVICE_ENV =
          = local => identity.myshopify.io
          = spin => identity.<fqdn of spin instance>
          = production => accounts.shopify.com

        - if no env var is specified, default to prod fqdn

      B) node_modules/@shopify/cli-kit/dist/session/store.js > fetch
        - This is used to fetch the currentSession

        - The function uses the keytar npm package to store and access Mac keychain. (https://www.npmjs.com/package/keytar)

          - The credentials for Shopify CLI are stored in keychain under the "service" aka keyname => shopify-cli

          - The service schema looks like this in keychain:
            - {
              [service]: {
                [accounts]: <anything as a string>
                ...
              },
              shopify-cli: {
                session: <stringified json obj that is seen below as currentSession when parsed>,
              }
            }

        - ex currentSession = {
          "accounts.shopify.com": {
            identity: {
              accessToken: "atkn_e3d8b91cd7f3280403daa174d34859bf45531029a75383a4c703f701bff51581",
              refreshToken: "atkn_ab7142fe0f966f6b196d5575e81262fcd89f4a131f0fa5deb29995049dd0996a",
              expiresAt: Date object that when consoled, results in UTC => "2022-09-26T23:39:47.915Z" which is Mon Sep 26 2022 16:39:47 GMT-0700 (Pacific Daylight Time),
              scopes: [
                "openid",
                "https://api.shopify.com/auth/shop.admin.graphql",
                "https://api.shopify.com/auth/shop.admin.themes",
                "https://api.shopify.com/auth/partners.collaborator-relationships.readonly",
                "https://api.shopify.com/auth/shop.storefront-renderer.devtools",
                "https://api.shopify.com/auth/partners.app.cli.access",
              ],
            },
            applications: {
              [appId based on env and is hardcoded in node_modules/@shopify/cli-kit/dist/session/identity.js for different applications]: {...}

              "271e16d403dfa18082ffb3d197bd2b5f4479c3fc32736d69296829cbb28d41a6": {
                accessToken: "atkn_eyJhbGciOiJSUzI1NiIsImtpZCI6Ik4teW1MUDR5TWt2MlR2X3hjWkNNSlltZ2JDbjhQbm5WLWRBbUJHbTlHb3cifQ.eyJ0IjoicE5TcUxTWFRoRXBGZFo1ZFBOZjIxTkJyUHRjczFtdUlmR2FUdFBQekRSRT0ifQ.YZkB3XTVvmFbVnA8ahkIYzSVRh15QfrXHk-1UQGe3YGHp8mLPe5R4HrEAh-nsx1E95qCk7dcyXBtlaXBprTSmXdWBUYWjTqu-5Hrnn61PHJEaADGTEkddNTWuD-zLZB7tx7yUpv6GY6-C8L0-9ep3jKoZ_rqgQIL6kMFDXWN9M0pgDl4XxfURjW1YEuP-q-56KAEg_ihd4rUZvKGa_Z5MdxWK5e18hZrgVarBy0xNztU2HP7L9lKTUZvGqjRxbntQl65u8xZ2LkLrO_8wtNJl0QVySbBaTjZWP3EwJS5Hpaa3Xw1TJmD0mhcfrkCeABupGW4obkoHMu9SWOlVZZGSw",
                expiresAt: { ... Date object which results in Mon Sep 26 2022 16:39:48 GMT-0700 (Pacific Daylight Time)
                },
                scopes: [
                  "https://api.shopify.com/auth/partners.app.cli.access",
                  "openid",
                ],
              },
              "ee139b3d-5861-4d45-b387-1bc3ada7811c": {
                accessToken: "atkn_eyJhbGciOiJSUzI1NiIsImtpZCI6Ik4teW1MUDR5TWt2MlR2X3hjWkNNSlltZ2JDbjhQbm5WLWRBbUJHbTlHb3cifQ.eyJ0IjoiL1RmRzBoREhKOU5LQ1R4ditPZklsc21zMzFTaGoxRDNWQ21XcGZjVStRRT0ifQ.OEaV9NPL0ZCrumG24crmPnlEv0MXlhYxNLKqYNTr-q3Upj30iep3vtnScNsFLQPdTBlGmI886jt_WsQoEGiVgSTJ9Vv9gyUUrHF42Wi6yg2xRQARqe8yB6Uv2uqeMl0KATcgqAMZM2IWcTL4GTw3yGzG09ptQA_UoFLQn-QcG1KCnEiyfRlofDkXBYScPKMcIJEc9k7WH031IYJJ1DYMJFjeyEqrsqza27bRpKCUWeWNDVdDWTAsoUcgbwtd017GC-sBWu2XZN4i7KMNPH9MIIvUO3khcy5OwUUuB-XL-dPINzDQZgXmanFCSMjunTKTgxZf494py4NOI8CY408g6A",
                expiresAt: { ... Date object which results in Mon Sep 26 2022 16:39:48 GMT-0700 (Pacific Daylight Time)
                },
                scopes: [
                  "https://api.shopify.com/auth/shop.storefront-renderer.devtools",
                  "openid",
                ],
              },
            },
          },
        }

      C) After pulling the session data from the keychain (basically the last stored data for shopify cli), it then compares the application + scopes input to the ensureAuthenticated function to the session's scopes (sessionFromKeyChain[fqdn].identity.scopes) to see if the requested scopes match the one from the keychain.
        - This happens in node_modules/@shopify/cli-kit/dist/session/validate.js > validateScopes(scopes, session.identity)

      D) Then it needs to validate the identity access token against the identity fqdn. The identity fqdn is computed based on the service environment env var which, if not provided, defaults to "production" vs "spin" or "local" (see identity service url computation fn above).

        - A GET call is made to https://${await identity()}/.well-known/openid-configuration.json => which for production is => https://accounts.shopify.com/.well-known/openid-configuration.json.
          - This URL provides introspection to identity urls to use.
          - In this ensureAuthenticated use case, the endpoint of interest is => introspection_endpoint = https://accounts.shopify.com/oauth/introspection

        - Then using the introspection url, a POST request is made to the URL with the following body, where the "accessToken" from the currentSession is used
            - body = {
              method: "POST",
              headers: {
                Authorization: "Bearer atkn_e3d8b91cd7f3280403daa174d34859bf45531029a75383a4c703f701bff51581",
                "Content-Type": "application/json",

              },
              body: "{\"token\":\"atkn_e3d8b91cd7f3280403daa174d34859bf45531029a75383a4c703f701bff51581\"}",
            }

          - Response = {
            valid: true,
            scope: "openid https://api.shopify.com/auth/shop.admin.graphql https://api.shopify.com/auth/shop.admin.themes https://api.shopify.com/auth/partners.collaborator-relationships.readonly https://api.shopify.com/auth/shop.storefront-renderer.devtools https://api.shopify.com/auth/partners.app.cli.access",
            client_id: "fbdb2649-e327-4907-8f67-908d24cfd7e3",
            token_type: "bearer",
            exp: 1664235587,
            iat: 1664228387,
            sub: "7c58c539-de06-49ed-bfa9-6eb5840b1296",
            aud: "fbdb2649-e327-4907-8f67-908d24cfd7e3",
            iss: "https://accounts.shopify.com",
            dest: "e70982c5-81b8-483b-bdda-7c53a833421e",
            sid: "7c9a551f-d4a7-4bca-9736-88d2e2210cae",
            anum: 0,
            auth_time: 1664228386,
            amr: [
              "pwd",
            ],
            device_uuid: "3509c11b-9106-48aa-8841-15aebfbf549f",
          }

        - A valid accessToken response is above ^ where the json.valid is the value used to determine validity of the token.

      E) If the access token is valid, then, we check the expiresAt Date object value from the existing identity data in our session to see if the date has passed.

      F) Then based on the applications and scopes desired passed into ensureAuthenticated, validation then checks the accessToken for the applications.
          - In this case, it checks the accessToken validity of the partnersApi by making a gql call to check if the token is REVOKED.

            - First find the fqdn for the partners api using node_modules/@shopify/cli-kit/dist/environment/fqdn.js > partners
              - serviceEnv =
                - local => partners.myshopify.io
                - spin => partners.<fqdn of spin instance>
                - production => partners.shopify.com

            - in local (production) case, we are using
              - POST "https://partners.shopify.com/api/cli/graphql"

              - with the gql query of:
                {
                  organizations(first: 1) {
                    nodes {
                      id
                    }
                  }
                }

              - and headers of = {
                "User-Agent": "Shopify CLI; v=3.13.1",
                "Sec-CH-UA-PLATFORM": "darwin",
                "X-Request-Id": "a00ef2d7-1d95-471d-a0ff-c03b4501dba7",
                authorization: "Bearer atkn_eyJhbGciOiJSUzI1NiIsImtpZCI6Ik4teW1MUDR5TWt2MlR2X3hjWkNNSlltZ2JDbjhQbm5WLWRBbUJHbTlHb3cifQ.eyJ0IjoicE5TcUxTWFRoRXBGZFo1ZFBOZjIxTkJyUHRjczFtdUlmR2FUdFBQekRSRT0ifQ.YZkB3XTVvmFbVnA8ahkIYzSVRh15QfrXHk-1UQGe3YGHp8mLPe5R4HrEAh-nsx1E95qCk7dcyXBtlaXBprTSmXdWBUYWjTqu-5Hrnn61PHJEaADGTEkddNTWuD-zLZB7tx7yUpv6GY6-C8L0-9ep3jKoZ_rqgQIL6kMFDXWN9M0pgDl4XxfURjW1YEuP-q-56KAEg_ihd4rUZvKGa_Z5MdxWK5e18hZrgVarBy0xNztU2HP7L9lKTUZvGqjRxbntQl65u8xZ2LkLrO_8wtNJl0QVySbBaTjZWP3EwJS5Hpaa3Xw1TJmD0mhcfrkCeABupGW4obkoHMu9SWOlVZZGSw",
                "X-Shopify-Access-Token": "Bearer atkn_eyJhbGciOiJSUzI1NiIsImtpZCI6Ik4teW1MUDR5TWt2MlR2X3hjWkNNSlltZ2JDbjhQbm5WLWRBbUJHbTlHb3cifQ.eyJ0IjoicE5TcUxTWFRoRXBGZFo1ZFBOZjIxTkJyUHRjczFtdUlmR2FUdFBQekRSRT0ifQ.YZkB3XTVvmFbVnA8ahkIYzSVRh15QfrXHk-1UQGe3YGHp8mLPe5R4HrEAh-nsx1E95qCk7dcyXBtlaXBprTSmXdWBUYWjTqu-5Hrnn61PHJEaADGTEkddNTWuD-zLZB7tx7yUpv6GY6-C8L0-9ep3jKoZ_rqgQIL6kMFDXWN9M0pgDl4XxfURjW1YEuP-q-56KAEg_ihd4rUZvKGa_Z5MdxWK5e18hZrgVarBy0xNztU2HP7L9lKTUZvGqjRxbntQl65u8xZ2LkLrO_8wtNJl0QVySbBaTjZWP3EwJS5Hpaa3Xw1TJmD0mhcfrkCeABupGW4obkoHMu9SWOlVZZGSw",
                "Content-Type": "application/json",
              }

            - And if the GQL response is a 200 status code, then the accessToken is NOT REVOKED. Else, if the GQL endpoint results in a thrown error with a response status code of 401, then it is not valid. node_modules/@shopify/cli-kit/dist/api/partners.js > checkIfTokenIsRevoked

        - The conditions are as follows for token validation:
          if (tokensAreRevoked)         <= if partnerApi token is revoked based on the gql response
              return 'needs_full_auth';

          if (!identityIsValid)         <= if identity token is
              return 'needs_full_auth';

          if (tokensAreExpired)         <= if any (identity, or any app accessToken is expired based on the expiredAt timestamp when the token was created)
              return 'needs_refresh';

      G) Based on the analyses, do a full auth or not. A full auth is done using
        - node_modules/@shopify/cli-kit/dist/session.js > executeCompleteFlow

        - A refresh of the identity token is done using the refresh token stored for the identity to refresh the identity accessToken which is then used to request application accessTokens for the other applications.

        - The possible applications with tokens are
          - admin
          - partners
          - storefront-renderer

4) node_modules/@shopify/cli-kit/dist/session.js > executeCompleteFlow

5) node_modules/@shopify/cli-kit/dist/session/authorize.js > authorize

  6) node_modules/@shopify/cli-kit/dist/session/redirect-listener.js > listenRedirect

    - host - 127.0.0.1
    - port - 3456


-------------
- So Admin Api is used to access a specific store, and auth is granted store by store for a given application.
- Partners Api is access granted for any app-store application servers
  - In the demo app locally, it is used to access ?



https: //accounts.shopify.com/oauth/authorize?
client_id=fbdb2649-e327-4907-8f67-908d24cfd7e3
code_challenge=aRWcpJqkZxaPWWsPAnvbmmt7lUgQ1i7T3bDCTVWitaA
code_challenge_method=S256
redirect_uri=http: //127.0.0.1: 3456
response_type=code
rid=b8c9a707-4c84-4d02-9bbd-31eb678d77ea
scope=openid+https: //api.shopify.com/auth/shop.admin.graphql+https: //api.shopify.com/auth/shop.admin.themes+https: //api.shopify.com/auth/partners.collaborator-relationships.readonly+https: //api.shopify.com/auth/shop.storefront-renderer.devtools+https: //api.shopify.com/auth/partners.app.cli.access
state=2163adab3f2cd10a64920742f836fd781f31931c171aa49f55efdbf71c9d











====================
Expired Identity accessToken Case:

- currentSession => {
  "accounts.shopify.com": {
    identity: {
      accessToken: "atkn_e3d8b91cd7f3280403daa174d34859bf45531029a75383a4c703f701bff51581",
      refreshToken: "atkn_ab7142fe0f966f6b196d5575e81262fcd89f4a131f0fa5deb29995049dd0996a",
      expiresAt: {...(2022-09-26T23:39:47.915Z) => Mon Sep 26 2022 16:39:47 GMT-0700 (Pacific Daylight Time)
      },
      scopes: [
        "openid",
        "https://api.shopify.com/auth/shop.admin.graphql",
        "https://api.shopify.com/auth/shop.admin.themes",
        "https://api.shopify.com/auth/partners.collaborator-relationships.readonly",
        "https://api.shopify.com/auth/shop.storefront-renderer.devtools",
        "https://api.shopify.com/auth/partners.app.cli.access",
      ],
    },
    applications: {
      "271e16d403dfa18082ffb3d197bd2b5f4479c3fc32736d69296829cbb28d41a6": {
        accessToken: "atkn_eyJhbGciOiJSUzI1NiIsImtpZCI6Ik4teW1MUDR5TWt2MlR2X3hjWkNNSlltZ2JDbjhQbm5WLWRBbUJHbTlHb3cifQ.eyJ0IjoicE5TcUxTWFRoRXBGZFo1ZFBOZjIxTkJyUHRjczFtdUlmR2FUdFBQekRSRT0ifQ.YZkB3XTVvmFbVnA8ahkIYzSVRh15QfrXHk-1UQGe3YGHp8mLPe5R4HrEAh-nsx1E95qCk7dcyXBtlaXBprTSmXdWBUYWjTqu-5Hrnn61PHJEaADGTEkddNTWuD-zLZB7tx7yUpv6GY6-C8L0-9ep3jKoZ_rqgQIL6kMFDXWN9M0pgDl4XxfURjW1YEuP-q-56KAEg_ihd4rUZvKGa_Z5MdxWK5e18hZrgVarBy0xNztU2HP7L9lKTUZvGqjRxbntQl65u8xZ2LkLrO_8wtNJl0QVySbBaTjZWP3EwJS5Hpaa3Xw1TJmD0mhcfrkCeABupGW4obkoHMu9SWOlVZZGSw",
        expiresAt: {... (2022-09-26T23:39:48.915Z) Mon Sep 26 2022 16:39:48 GMT-0700 (Pacific Daylight Time)
        },
        scopes: [
          "https://api.shopify.com/auth/partners.app.cli.access",
          "openid",
        ],
      },
      "ee139b3d-5861-4d45-b387-1bc3ada7811c": {
        accessToken: "atkn_eyJhbGciOiJSUzI1NiIsImtpZCI6Ik4teW1MUDR5TWt2MlR2X3hjWkNNSlltZ2JDbjhQbm5WLWRBbUJHbTlHb3cifQ.eyJ0IjoiL1RmRzBoREhKOU5LQ1R4ditPZklsc21zMzFTaGoxRDNWQ21XcGZjVStRRT0ifQ.OEaV9NPL0ZCrumG24crmPnlEv0MXlhYxNLKqYNTr-q3Upj30iep3vtnScNsFLQPdTBlGmI886jt_WsQoEGiVgSTJ9Vv9gyUUrHF42Wi6yg2xRQARqe8yB6Uv2uqeMl0KATcgqAMZM2IWcTL4GTw3yGzG09ptQA_UoFLQn-QcG1KCnEiyfRlofDkXBYScPKMcIJEc9k7WH031IYJJ1DYMJFjeyEqrsqza27bRpKCUWeWNDVdDWTAsoUcgbwtd017GC-sBWu2XZN4i7KMNPH9MIIvUO3khcy5OwUUuB-XL-dPINzDQZgXmanFCSMjunTKTgxZf494py4NOI8CY408g6A",
        expiresAt: {
          ... ((2022-09-26T23:39:48.915Z) Mon Sep 26 2022 16:39:48 GMT-0700 (Pacific Daylight Time)
        },
        scopes: [
          "https://api.shopify.com/auth/shop.storefront-renderer.devtools",
          "openid",
        ],
      },
    },
  },
}

- after validating the identity accessToken with the identity service URL and receiving a "false",

  - partnersToken is Revoked = true
  - partnerToken is expired = true

  - this means that "needs_full_auth" is done and executeCompleteFlow is triggered.

- executeCompleteFlow which fetches a new identity token which is then used to fetch application tokens.
  - node_modules/@shopify/cli-kit/dist/session.js > executeCompleteFlow

  - you use device auth => Request a device code to authorize without a browser redirect.

  - or you can => Authorize user via browser using
    - node_modules/@shopify/cli-kit/dist/session/authorize.js > authorize

      - authorize takes in
        - scopes => [
          "openid",
          "https://api.shopify.com/auth/shop.admin.graphql",
          "https://api.shopify.com/auth/shop.admin.themes",
          "https://api.shopify.com/auth/partners.collaborator-relationships.readonly",
          "https://api.shopify.com/auth/shop.storefront-renderer.devtools",
          "https://api.shopify.com/auth/partners.app.cli.access",
        ]

        - state => randomHex(30) which looks like:
          - '35fe9c6fd6fb46efde5c3ce4de24a591629f320fca67e20667240c80727d'

      - authorize will open a browser window to
        - "http://accounts.shopify.com/oauth/authorize" with a bunch of params which results in
          - 'http://accounts.shopify.com/oauth/authorize?client_id=fbdb2649-e327-4907-8f67-908d24cfd7e3&scope=openid+https%3A%2F%2Fapi.shopify.com%2Fauth%2Fshop.admin.graphql+https%3A%2F%2Fapi.shopify.com%2Fauth%2Fshop.admin.themes+https%3A%2F%2Fapi.shopify.com%2Fauth%2Fpartners.collaborator-relationships.readonly+https%3A%2F%2Fapi.shopify.com%2Fauth%2Fshop.storefront-renderer.devtools+https%3A%2F%2Fapi.shopify.com%2Fauth%2Fpartners.app.cli.access&redirect_uri=http%3A%2F%2F127.0.0.1%3A3456&state=35fe9c6fd6fb46efde5c3ce4de24a591629f320fca67e20667240c80727d&response_type=code&code_challenge_method=S256&code_challenge=jfC-gU5XvH2G6TNibGJOR1rd6qZMDpWwN7Mr1LHAp6w'

            - which is just the base url + these params put into a query string: params = {
                client_id: "fbdb2649-e327-4907-8f67-908d24cfd7e3",
                scope: "openid https://api.shopify.com/auth/shop.admin.graphql https://api.shopify.com/auth/shop.admin.themes https://api.shopify.com/auth/partners.collaborator-relationships.readonly https://api.shopify.com/auth/shop.storefront-renderer.devtools https://api.shopify.com/auth/partners.app.cli.access",
                redirect_uri: "http://127.0.0.1:3456",
                state: "35fe9c6fd6fb46efde5c3ce4de24a591629f320fca67e20667240c80727d",
                response_type: "code",
                code_challenge_method: "S256",
                code_challenge: "jfC-gU5XvH2G6TNibGJOR1rd6qZMDpWwN7Mr1LHAp6w",
              }

              - where client_id is a hardcoded value that is based on serviceEnv
              - where the redirectUri is hardcoded to "http://127.0.0.1:3456" in authorize.js

              - where the "accounts.shopify.com" is the identity url to use based on the serviceEnv (spin, local, production (default))


        - The http://accounts.shopify.com/oauth/authorize?... url will redirect to => https://accounts.shopify.com/select?rid=10d9ef57-3b6d-4214-b456-7a8ae0f5e1fc where you need to log with a partner account or select a shopify partner account.

        - After successful login/selection of an already logged in partner account, https://accounts.shopify.com/select?rid=10d9ef57-3b6d-4214-b456-7a8ae0f5e1fc will redirect you to the url you initially told it to redirect to which is
          - redirect_uri: "http://127.0.0.1:3456"

          - Locally, in the authorize method, under listenRedirect function, a server is spun up locally with that port with only a single GET /* endpoint which will get called via the redirect in the browser that is initiated by shopify.
              - The redirect url looks like:

              http://127.0.0.1:3456/?code=a1eeaefe651eed7faf5433a4c0c45d045da48181ac9394e1002773f8bfef14d5&state=9af35456afc9ff750a34b35ec075da3db5d745988ebf7f4b1f7e858a3081

              Where there is a code and a state. The code is the authorization code which locally is used to fetch a new identity token for your session and that identity token is used to fetch application tokens.

              - To fetch a new identity token the parent function is

                - node_modules/@shopify/cli-kit/dist/session.js > exchangeCodeForAccessToken

                - the parnet uses the node_modules/@shopify/cli-kit/dist/session/exchange.js > tokenRequest

                - which ultimately uses POST https://accounts.shopify.com/oauth/token?... params where the params are from the object:

                  {
                      grant_type: 'authorization_code',
                      code: codeData.code,
                      redirect_uri: 'http://127.0.0.1:3456',
                      client_id: clientId,
                      code_verifier: codeData.codeVerifier,
                  };

                  note - there is no payload, all data is encoded in the query string.

                  - where there response (result) is used to create an identity token locally:

                    {
                        accessToken: result.access_token,
                        refreshToken: result.refresh_token,
                        expiresAt: new Date(Date.now() + result.expires_in * 1000),
                        scopes: result.scope.split(' '),
                    }

              - Then after fetching an identity token by passing in the "code" received from auth of the session which in the above example is a1eeaefe651eed7faf5433a4c0c45d045da48181ac9394e1002773f8bfef14d5& , in the executeCompleteFlow, the next step is to call

                - node_modules/@shopify/cli-kit/dist/session.js > exchangeAccessForApplicationTokens

                - this parent method takes in
                  - exchangeAccessForApplicationTokens(identityToken, exchangeScopes, store)

                - at the core, all applications (partners, store-renderer, admin) use the function
                => node_modules/@shopify/cli-kit/dist/session/exchange.js > tokenRequest

                  - which ultimately calls the same url as the identity token endpoint but with different params in their query string.


- Now after successful new session creation given the new tokens, you are completed with the executeCompleteFlow flow and back into the ensureAuthenticated flow
  - node_modules/@shopify/cli-kit/dist/session.js > ensureAuthenticated

  - The next thing is to store the new session data into the keychain on your mac.

  - Then if your session includes partners token, you take it and override the env var process.env.SHOPIFY_CLI_PARTNERS_TOKEN with the newly retrieved token.

  - And if there is no env var for the partners token, and there is a partners token returned via authorize, then for developer experience, we call ensureUserHasPartnerAccount to make sure you have a partner account while developing an app that needs a partner account.

*/
// snippet from ensureAuthenticated
const completeSession = { ...currentSession, ...newSession };
await secureStore.store(completeSession);
const tokens = await tokensFor(applications, completeSession, fqdn);
// Overwrite partners token if using a custom CLI Token
const envToken = env[constants.environmentVariables.partnersToken];
if (envToken && applications.partnersApi) {
  tokens.partners = (await exchangeCustomPartnerToken(envToken)).accessToken;
}
if (!envToken && tokens.partners) {
  await ensureUserHasPartnerAccount(tokens.partners);
}
return tokens;

/*
- so in node_modules/@shopify/cli-kit/dist/session.js > ensureUserHasPartnerAccount
  - you use the partners token to call the same gql endpoint to check whether a partner token is revoked (see above for revoked partners.shopify api call).
    - the function used is node_modules/@shopify/cli-kit/dist/session.js > hasPartnerAccount

    - the criteria is if gql calls back by any code except 404, then the user has a partners account.

  - if the user does not have a partner account, then the function opens a browser to https://partners.shopify.com/signup where you need to use the same shopify email you used to get the partner token in the authorize process to sign up for a partner account.

    - This flow where the user many not have a partner organization is explained in the function description of ensureUserHasPartnerAccount:

      * If the user creates an account from the Identity website, the created account won't get a Partner organization created. We need to detect that and take the user to create a partner organization.

    - Therefore, the user somehow is able to get a partner token during authorize but not have a partner organization assigned to them in a specific onboarding flow.

    - After the signup is complete, hasPartnerAccount is called again using the token, and if the same email was used during signup for a partner organization, it should return true since we pass in the partnerToken with no mention of an email but this time the token should decrypt and be mapped against a userId who using a query should find their partnerAccount in the shopify db.

  - After ensureing the user has a partner account, you are kicked back out through ensureAuthenticated which then immediately returns you to ensureAuthenticatedPartners - the parent calling function of this whole auth flow on cli.

- Back in node_modules/@shopify/cli-kit/dist/session.js > ensureAuthenticatedPartners

  - it explicitly checks it there is a partner token in your session. If there isn't a MissingPartnerTokenError error is thrown which will stop the server from starting locally.


====================================================
====================================================
====================================================

You then get kicked back out to dev function which is the parent script that calls ensureAuthenticatedPartners.

- node_modules/@shopify/app/dist/cli/services/dev.js > dev

- after ensureAuthenticatedPartners, dev function calls node_modules/@shopify/app/dist/cli/services/environment.js > ensureDevEnvironment

  - the function is described as:

    - Make sure there is a valid environment to execute `dev`
    - That means we have a valid organization, app and dev store selected.
    - If there are app/store from flags, we check if they are valid. If they are not, throw an error.
    - If there is cached info (user ran `dev` previously), check if it is still valid and return it.
    - If there is no cached info (or is invalid):
      - Show prompts to select an org, app and dev store
      - The new selection will be saved as global configuration
      - The `shopify.app.toml` file will be updated with the new app apiKey

  - First the function checks the local cache. The cache is in a store called node_modules/@shopify/cli-kit/dist/store.js > CLIKitStore

    - the CLIKitStore is an extension of Conf which is a library that builds a config file on your mac under > ~Library/Preferences/shopify-cli-kit-nodejs/config.json (see my conf-tutorial on how this works)

    - So the config looks like
    config.json => {
      "__internal__": {
        "migrations": {
          "version": "3.13.1"
        }
      },
      "appInfo": [
        {
          "directory": "/Users/maxtam/Desktop/development/shopify-app-examples/qr-code/node",
          "appId": "8c38af80b7f3c12aa23e1ac0757c5f32",
          "title": "max-qr-code-sample",
          "storeFqdn": "max-test-wizard-store-for-partner-account.myshopify.com",
          "orgId": "2627630"
        },
        {
          "directory": "/Users/maxtam/Desktop/development/shopify-demo-app/demo-app-1",
          "appId": "ca037cb47122545cf3635ae475248e9c",
          "title": "demo-app-1",
          "storeFqdn": "max-test-wizard-store-for-partner-account.myshopify.com",
          "orgId": "2627630",
          "updateURLs": true
        }
      ]
    }

    - and based on the app you are developing, it will pull the cachedAppInfo which in this case is the:

      => {
          "directory": "/Users/maxtam/Desktop/development/shopify-demo-app/demo-app-1",
          "appId": "ca037cb47122545cf3635ae475248e9c",
          "title": "demo-app-1",
          "storeFqdn": "max-test-wizard-store-for-partner-account.myshopify.com",
          "orgId": "2627630",
          "updateURLs": true
        }

  - If the store has cached data, return it ^
  - If the store does not have cached data, then
    - using the partners api token of the user to fetch all organizations of a user from the partners api using GQL

        > node_modules/@shopify/app/dist/cli/services/environment.js > ensureDevEnvironment > selectOrg

        query => {
          organizations(first: 200) {
            nodes {
              id
              businessName
              website
              appsNext
            }
          }
        }
    - I guess from a single email, you can be a part of maybe many partner organizations - like as a consultant for various organizations?

    - then after fetching the orgs, select an org which will be the orgId of your dev environment of the current application and will be stored in the config.json.

  - Then if an app and store is not yet selected by params passed into dev.js (node_modules/@shopify/app/dist/cli/services/environment.js > fetchDevDataFromOptions), we make a gql call to partners API to find all the apps and store for the selected org (ode_modules/@shopify/app/dist/cli/services/environment.js > fetchOrgAndApps(orgId, partnerAccessToken))

        node_modules/@shopify/cli-kit/dist/api/graphql/all_orgs.js

        query FindOrganization($id: ID!) {
          organizations(id: $id, first: 1) {
            nodes {
              id
              businessName
              website
              appsNext
              apps(first: 100) {
                nodes {
                  id
                  title
                  apiKey
                  organizationId
                  apiSecretKeys {
                    secret
                  }
                  appType
                  grantedScopes
                }
              }
            }
          }
        }

        The response from the api is
        {
          organizations: {
            nodes: [
              {
                id: "2627630",
                businessName: "Max the Wizard Partner",
                website: "",
                appsNext: true,
                apps: {
                  nodes: [
                    {
                      id: "9955934209",
                      title: "max-qr-code-sample",
                      apiKey: "8c38af80b7f3c12aa23e1ac0757c5f32",
                      organizationId: "2627630",
                      apiSecretKeys: [
                        {
                          secret: "3c6ffad00a610decf8d6942100ebc746",
                        },
                      ],
                      appType: "public",
                      grantedScopes: [
                      ],
                    },
                    {
                      id: "10385784833",
                      title: "demo-app-1",
                      apiKey: "ca037cb47122545cf3635ae475248e9c",
                      organizationId: "2627630",
                      apiSecretKeys: [
                        {
                          secret: "dc8b812a225897674d6feafa955d37b1",
                        },
                      ],
                      appType: "undecided",
                      grantedScopes: [
                      ],
                    },
                  ],
                },
              },
            ],
          },
        }

    - Then you need to select an org
        node_modules/@shopify/app/dist/cli/services/environment.js > ensureDevEnvironment > node_modules/@shopify/app/dist/cli/services/dev/select-app.js > selectOrCreateApp

        - in selectOrCreateApp, using the apiKey (which is also named as the appId in our CLIKitStore)
          - ex => ca037cb47122545cf3635ae475248e9c

          - we fetch the app using this appId / apiKey using the method
            - node_modules/@shopify/app/dist/cli/services/dev/fetch.js > fetchAppFromApiKey

            - which fires a gql request to the partners api with the query

              node_modules/@shopify/cli-kit/dist/api/graphql/find_app.js

              query FindApp($apiKey: String!) {
                app(apiKey: $apiKey) {
                  id
                  title
                  apiKey
                  organizationId
                  apiSecretKeys {
                    secret
                  }
                  appType
                  grantedScopes
                }
              }

              - the response is {
                app: {
                  id: "10385784833",
                  title: "demo-app-1",
                  apiKey: "ca037cb47122545cf3635ae475248e9c",
                  organizationId: "2627630",
                  apiSecretKeys: [
                    {
                      secret: "dc8b812a225897674d6feafa955d37b1",
                    },
                  ],
                  appType: "undecided",
                  grantedScopes: [
                  ],
                },
              }

    - Then after this, we get kicked back out the ensureDevEnvironment where we store the app back into the config.json

      upsert these back into config.json => {
        appId: selectedApp.apiKey,
        title: selectedApp.title,
        directory: options.app.directory,
        orgId,
      }

    - Then we do the same for stores as we just did for apps which is fetch all stores for the given partner accessToken and orgId and select one and store it into config.json

      - taking data from the partners api gql response using this query

        node_modules/@shopify/cli-kit/dist/api/graphql/all_stores_by_org.js

        query FindOrganization($id: ID!) {
          organizations(id: $id, first: 1) {
            nodes {
              id
              stores(first: 500, archived: false) {
                nodes {
                  shopId
                  link
                  shopDomain
                  shopName
                  transferDisabled
                  convertableToPartnerTest
                }
              }
            }
          }
        }

        where response is {
          organizations: {
            nodes: [
              {
                id: "2627630",
                stores: {
                  nodes: [
                    {
                      shopId: "66486796512",
                      link: "https://partners.shopify.com/2627630/stores/66486796512",
                      shopDomain: "max-test-wizard-store-for-partner-account.myshopify.com",
                      shopName: "Max Test Wizard Store For Partner Account",
                      transferDisabled: true,
                      convertableToPartnerTest: false,
                    },
                  ],
                },
              },
            ],
          },
        }

      - then run a query to fetch the store details by domain using this query to the partners api

        - node_modules/@shopify/app/dist/cli/services/dev/fetch.js > fetchStoreByDomain

        query FindOrganization($id: ID!, $shopDomain: String) {
          organizations(id: $id, first: 1) {
            nodes {
              id
              businessName
              website
              appsNext
              stores(shopDomain: $shopDomain, first: 1, archived: false) {
                nodes {
                  shopId
                  link
                  shopDomain
                  shopName
                  transferDisabled
                  convertableToPartnerTest
                }
              }
            }
          }
        }



    - then we go back to ensureDevEnvironment where we upsert these back into config.json => {
        appId: selectedApp.apiKey,
        directory: options.app.directory,
        storeFqdn: selectedStore?.shopDomain,
      }

  - then we go back out from ensureDevEnvironment to dev.js

- In dev.js, there is then a prompt that says you can reset your selected store and app and org using the command

  > npm run dev -- --reset

- At the end of dev.js they create additionalProcesses which are passed to node_modules/@shopify/cli-kit/dist/output.js > concurrent which will run them in concurrent processes

  - the processes are = [
      {
        prefix: "backend",
        action: async (stdout, stderr, signal) => {
          await system.exec(cmd, args, {
              cwd: web.directory,
              stdout,
              stderr,
              signal,
              env: {
                  ...process.env,
                  ...env,
              },
          });
        },
      },
      {
        prefix: "frontend",
        action: async (stdout, stderr, signal) => {
          await devFrontend.action(stdout, stderr, signal, port);
        },
      },
    ]

    - all concurrent does is call the "action" function.

    - the backend action is created using this function:

      - node_modules/@shopify/app/dist/cli/services/dev.js >

      function devBackendTarget(web, options) {
        const { commands } = web.configuration;         <= commands = { dev: "npm run dev" }
        const [cmd, ...args] = commands.dev.split(' '); <= cmd = "npm", ...args = ["run", "dev"]
        const env = {
            SHOPIFY_API_KEY: options.apiKey,
            SHOPIFY_API_SECRET: options.apiSecret,
            HOST: options.hostname,
            // SERVER_PORT is the convention Artisan uses
            PORT: `${options.backendPort}`,
            SERVER_PORT: `${options.backendPort}`,
            BACKEND_PORT: `${options.backendPort}`,
            SCOPES: options.scopes,
            NODE_ENV: `development`,
        };
        return {
            prefix: web.configuration.type,
            action: async (stdout, stderr, signal) => {
                await system.exec(cmd, args, {      <= this executes "npm", with args ["run", "dev"]
                    cwd: web.directory,
                    stdout,
                    stderr,
                    signal,
                    env: {
                        ...process.env,
                        ...env,
                    },
                });
            },
        };
      }

    - the frontend action is created using this function:

      - node_modules/@shopify/app/dist/cli/services/dev.js >

      function devFrontendProxyTarget(options) {
        const { commands } = options.web.configuration; <= commands = { build: "npm run build", dev: "npm run dev" }
        const [cmd, ...args] = commands.dev.split(' '); <= cmd = "npm", ...args = ["run", "dev"]
        const env = {
            SHOPIFY_API_KEY: options.apiKey,
            SHOPIFY_API_SECRET: options.apiSecret,
            HOST: options.hostname,
            SCOPES: options.scopes,
            BACKEND_PORT: `${options.backendPort}`,
            NODE_ENV: `development`,
        };
        return {
            logPrefix: options.web.configuration.type,
            action: async (stdout, stderr, signal, port) => {
                await system.exec(cmd, args, {      <= this executes "npm", with args ["run", "dev"]
                    cwd: options.web.directory,
                    stdout,
                    stderr,
                    env: {
                        ...process.env,
                        ...env,
                        PORT: `${port}`,
                        FRONTEND_PORT: `${port}`,
                        APP_URL: options.hostname,
                        APP_ENV: 'development',
                        // Note: These are Laravel varaibles for backwards compatibility with 2.0 templates.
                        SERVER_PORT: `${port}`,
                    },
                    signal,
                });
            },
        };
      }

THIS IS THE END OF dev.js and now both the Frontend and Backend servers are running.
  - The Frontend server serves up the react app
  - The Backend server fields all of the react app's backend calls.
  - The Backend also serves as a proxy



=====================================================
SUMMARY OF CLI PROCESS:
=====================================================
Local flow:

> node_modules/@shopify/cli-kit/dist/session.js > ensureAuthenticatedPartners

  > node_modules/@shopify/cli-kit/dist/session.js > ensureAuthenticated

    - this method is where
      - pulling and storing of session data from / into keychain
      - checking for validity of tokens
      - refreshing of tokens
      - creation of partners org if not exists
      - fetching new valid tokens
        - all token fetching happens through:
          - session code => http://accounts.shopify.com/oauth/authorize
          - application token (partners, admin, store-renderer) => http://accounts.shopify.com/oauth/token

        - Session code is first needed
          - then the code is used to fetch valid identity accessToken
            - the identity accessToken is then used to fetch application accessTokens

  - for local development, the needed application token is a partners application token.

- Once a session has at least a valid identity and partners application accessToken, the next step is to ensure you local dev environment is setup to connect to an organization and a specific app and store for that organization.
  - So using the partners api and the partners accessToken, you
    - fetch orgs, select org
    - fetch apps for the org, then select an app
    - fetch stores for the org, then select a store
    - store these dev configs into config.json in your ~/Library/Preferences/shopify-cli-kit-nodejs/config.json

- Next, the frontend and backend apps are configured and started up concurrently (no proxy needed since the FE react app server is only communicating with your local backend node server and no CORS concerns needed for there to be a proxy for the frontend react app server)
  - the command used to run both apps is "npm run dev"
  - the ports are randomly selected (there are other configs for tunneling which I did not test)
  - env vars like the shopify api key and others are passed into these concurrent processes of the FE and BE servers.

- So finally, you have 2 servers running, 1 for the react app, 1 for the Express node server

=============
notes -
- ensureAuthenticatedAdmin and ensureAuthenticatedStorefront (the other 2 apps aside from partners app) are only triggered locally if there are themes that need to be pulled from shopify.

- backendConfig = {
  directory: "/Users/maxtam/Desktop/development/shopify-demo-app/demo-app-1/web",
  configuration: {
    type: "backend",
    commands: {
      dev: "npm run dev",
    },
  },
}

- frontendConfig = {
  directory: "/Users/maxtam/Desktop/development/shopify-demo-app/demo-app-1/web/frontend",
  configuration: {
    type: "frontend",
    commands: {
      build: "npm run build",
      dev: "npm run dev",
    },
  },
}


*/
