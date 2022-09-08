/*
How to have multiple git accounts on the same comp and toggle:

High level instructions:
- https://blog.bitsrc.io/how-to-use-multiple-git-accounts-378ead121235

Supplemental Video tutorial
- https://www.youtube.com/watch?v=J63meQ83yyI

Steps:
- generate ssh keys for each git account
- setup a local ssh config that will allow you to specify which ssh key to use for which account
- when running git clone, you will pick which account you are setting to that cloned repo for use so when you run git operations within the folder, you are using the account it came from

--------------------------------------
Instructions:

Create a ~/.ssh directory if you don't have one in your "cd ~"" directory.
> mkdir .ssh

Create a config file in the directory
> touch .ssh/config

Create a pub/private key pair
Tutorial => https://docs.oracle.com/cd/E19683-01/817-0365/x-501d7/index.html
> ssh-keygen
    Generating public/private rsa key pair.

    action => Enter file in which to save the key (/Users/<USER>/.ssh/id_rsa): <YOU CAN ENTER A DIFFERENT PATH IF DESIRED> such as "/Users/<USER>/.ssh/personal_git_key"
    action => Enter passphrase (empty for no passphrase): <YOU CAN ENTER A PASSPHRASE> such as "my personal email"
    action => Enter same passphrase again: <RE-ENTER THE PASSPHRASE>

    Your identification has been saved in /Users/<USER>/.ssh/id_rsa
    Your public key has been saved in /Users/<USER>/.ssh/id_rsa.pub

    The key fingerprint is:
    SHA256:C59vd9VUXIR0W16xRs34xb/h6mU/
    The key's randomart image is:
    +---[RSA 3072]----+
    |             ..E&|
    |              =+^|
    |               OO|
    |              o.=|
    |      . S     .+=|
    |       o o     +B|
    |        +    .o=o|
    |         .. oo*.o|
    |         ...o=ooo|
    +----[SHA256]-----+

For the passphrase, you can use something like the github username as the passphrase to differentiate them.

You will end up with 2 files per each key generated, the public (.pub file) and private key

Add the private keys to your SSH agent by running
> ssh-add -K ~/.ssh/personal_git_key
> ssh-add -K ~/.ssh/work_git_key

When you run each "ssh-add" command, you will be prompted for the passphrase used to generate the key.

Next, we need to copy our public keys and add them to Github. (these commands are just like cmd A cmd C results but just a command line version)
> pbcopy < ~/.ssh/personal_git_key.pub
> pbcopy < ~/.ssh/work_git_key.pub

When in Github's webapp Settings page adding the key, add a name for the key (ex. my-mac)

Then go to your .ssh/config file and add:

  #personal account
  Host personal
    HostName github.com
    User git
    IdentityFile ~/.ssh/personal_git_key

  #work account
  Host work
    HostName github.com
    User git
    IdentityFile ~/.ssh/work_git_key

To check a repository's git username, just enter
> git config --list

    credential.helper=osxkeychain
    core.excludesfile=/Users/<USER>/.gitignore_global
    difftool.sourcetree.cmd=opendiff "$LOCAL" "$REMOTE"
    difftool.sourcetree.path=
    mergetool.sourcetree.cmd=/Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh "$LOCAL" "$REMOTE" -ancestor "$BASE" -merge "$MERGED"
    mergetool.sourcetree.trustexitcode=true
    user.name=
    user.email=
    commit.template=/Users/<USER>/.stCommitMsg
    core.repositoryformatversion=0
    core.filemode=true
    core.bare=false
    core.logallrefupdates=true
    core.ignorecase=true
    core.precomposeunicode=true
    remote.origin.url=https://github.com/<my git username>/learning.git
    remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
    branch.master.remote=origin
    branch.master.merge=refs/heads/master
    user.email=<my email redacted>
    user.name=<my email redacted>

If there is a git config --global user.name that was already set and you did not set a local, then it would show up.

You can remove any local user.name and user.email by running these 2:
> git config --unset user.name
> git config --unset user.eamil

Now when you go to clone a repo, use the SSH url
ex. git clone git@github.com:<my git username>/learning.git

And edit it to use the host you set in the config file:
ex. git clone git@personal:<my git username>/learning.git
ex. git clone git@work:<my git username>/learning.git

The first time you clone using the SSH key, you will be asked

    ➜  l2 git clone git@personal:<my git username>/learning.git
    Cloning into 'learning'...
    The authenticity of host 'github.com (<IP address>)' can't be established.
    ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/asdadsadad.
    This key is not known by any other names
    Are you sure you want to continue connecting (yes/no/[fingerprint])?

type in "yes".

The last thing to do is to update the local repository's user.name and user.email.

- for personal repos:
> git config user.name "<my username>"
> git config user.email "<my personal email>"

- for work repos:
> git config user.name "<my work git username>"
> git config user.email "<my work git email>"
*/