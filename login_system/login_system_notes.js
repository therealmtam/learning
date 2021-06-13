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

- log user in
    - authenticate user using username and password
    - generate auth token for user

- log out user
    - remove authorization

- forgot password
    - authenticate user by having email sent to user's username (their email) and having that as the authentication mechanism before allowing them to assign a new password to an account
    - prevent user from reusing old password when generating a new one
    - generate auth token for user after new password has been assigned

- rememberMe - extend authorization using time based auth tokens and refresh token
*/