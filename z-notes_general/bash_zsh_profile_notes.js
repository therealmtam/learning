/*
--------------------------------------
Understanding your PATH (https://friendly-101.readthedocs.io/en/latest/bashprofile.html)


The first edit to your Bash profile is to correct your PATH. PATH is an environment variable, which simply means that it represents some small bit of data while you use Terminal. Specifically, PATH contains a list of file system paths where the operating system can find programs to run.

When a developer runs a program in Bash, the operating system will sequentially look for the program in each of the paths that PATH contains, starting with the first path listed. If the operating system can’t find the program in the first path, it looks for the same program in the second path, and so on, until either eventually finding and running the program or returning an error if the program couldn’t be found.

PATH contains paths that are delimited by a colon (:). Therefore, the value of PATH might look something like:

/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin

You can see that /usr/local/bin is the first path, and /usr/bin is the second path.

/usr/local/bin is where all programs local to your use of the operating system are located.

Storing programs for your personal use in /usr/local/bin is a best practice and highly encouraged. Therefore, the PATH above is correct.

Likewise, storing programs in /usr/bin allows programs to be globally accessible by other users. Storing programs globally can sometimes be desirable, but in general it’s discouraged and likely to cause confusion.

-------
To output the PATH, run > echo $PATH which after this ^ addition, you should see something like:

> /Users/maxtam/.nvm/versions/node/v16.17.0/bin:/Users/maxtam/.pyenv/shims:/Users/maxtam/.pyenv/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Apple/usr/bin:/usr/local/mysql-8.0.30-macos12-arm64/bin

which is just these directories to check in sequential order

/Users/maxtam/.nvm/versions/node/v16.17.0/bin:
/Users/maxtam/.pyenv/shims:
/Users/maxtam/.pyenv/bin:
/opt/homebrew/bin:
/opt/homebrew/sbin:
/usr/local/bin:
/usr/bin:
/bin:
/usr/sbin:/sbin:
/Library/Apple/usr/bin:
/usr/local/mysql-8.0.30-macos12-arm64/bin
--------------------------------------
*/