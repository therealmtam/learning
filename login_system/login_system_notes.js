/*
This is a combination of the learnings from:

- bcrypt_password_hash
- jwt
- simple_mongodb_setup

Login system use-cases:
----------
- create an account (username and password)
    - store username and password
    - generate auth token for user

        - user table with username and password, you can lookup a user by username which needs to be an email

- log user in
    - authenticate user using username and password
    - generate auth token for user

- log out user
    - remove authorization

- verify the email address (username) of an account after account creation

- rememberMe - extend authorization using time based auth tokens and refresh token
    - using the auth token as the key, store the refresh token so for an expired auth token, you can lookup and find a refresh token if any

TODO - forgot password
    - authenticate user by having email sent to user's username (their email) and having that as the authentication mechanism before allowing them to assign a new password to an account
    - prevent user from reusing old password when generating a new one

After account creation and password reset (forgot password) and verfication of an account via email, the flow requires users to go through the login page. This way, we separate these steps from the login / auth token creation steps.
*/