/*
create react app scaffold:
----------
to create the scaffold of this react app, use

> npx create-react-app ./

then run npm install


react query:
----------
https://www.youtube.com/watch?v=x1rQ61otgtU
- npm install react query in this scaffold react app

https://www.youtube.com/watch?v=yccbCol546c
- tutorial for react-query lib

^ note that the above videos for react-query are outdated and I had to read the official react-query docs to fix issues.


Summary:

React-query is a data fetching and mutating library that is a wrapper around your data fetching libs (fetch, axios, request, etc.). It takes the data returned by these API calls and caches them and has a mechanism that auto-manages the cache in order to keep your data possibly more in-sync with your backend data in order to deliver the best user experience.

The interesting thing is that since this cache mgmt code does things like auto-poll for updates using a refetchInterval and that this lib lives in the client side code, it will keep on running even if your BE services go down. So there is a need to make sure the auto-polling by react query will not render a bad user experience if say it cannot fetch data any longer. In this case, it should keep the cached data as the data to show the user and ignore any server-side errors to shield users from issues.
*/