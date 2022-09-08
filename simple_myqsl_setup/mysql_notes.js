/*
Installation of Mysql and it's tools to get started on MacOS:
https://dev.mysql.com/downloads/mysql/

Video Tutorial:
https://www.youtube.com/watch?v=2cvH0HRjZF8
=> additional tutorials that are good https://www.youtube.com/c/DatabaseStar

Install Sequel Ace - Gui for local mysql development
https://sequel-ace.com/

Or Install DBeaver - Gui for local mysql development
https://dbeaver.io/download/

--------------------------------------
Install Notes:

Download the dmg file and double click to install it.

--------------------------------------
Running Mysql Notes:

When you install, it may auto run mysql for you.

To see if it is running, go to the System Preferences > and you should see a MySQL icon on the bottom which show you the active instances and configuration to start upon startup etc. https://dev.mysql.com/doc/refman/8.0/en/macos-installation-prefpane.html

You can verify that it is running via
> ps aux | grep -v grep | grep mysql

If nothing is running, you should not see any results. If something is running, you will see:
> _mysql           93767   0.1  2.6 410159088 436560   ??  Ss   11:29PM   0:00.45 /usr/local/mysql/bin/mysqld --user=_mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --plugin-dir=/usr/local/mysql/lib/plugin --log-error=/usr/local/mysql/data/mysqld.local.err --pid-file=/usr/local/mysql/data/mysqld.local.pid --keyring-file-data=/usr/local/mysql/keyring/keyring --early-plugin-load=keyring_file=keyring_file.so

--------------------------------------
Selecting the data directory where the db data is stored:

By default, during the installation process, the data directory is => /usr/local/mysql/data
This is verified via the System Preferences > MySQL > Configuration tab.

- I tried to change it to a different file path, applied the change, then clicked on "Start MySQL Server" and it wouldn't start.

The reason I tried this was to understand what the "Intialize Database" button did. Which according to the docs, it just recreates the data directory over again in the same location it seems like.
https://dev.mysql.com/doc/refman/8.0/en/macos-installation-prefpane.html

--------------------------------------
To uninstall MySQL: (https://macpaw.com/how-to/uninstall-mysql-on-mac)

- First, go to System Preferences and click MySQL. Press Uninstall to delete the service.

- Now that you trashed the app, it’s time to remove all the related files, including databases. To get rid of these files, use Terminal. Follow the steps below:

1) Open Terminal from the Application folder.
2) Back up your data with this command: mysqldump
3) Check for any MySQL processes using this command ps -ax | grep mysql. If any are found, stop and terminate them.
4) Type the following command: sudo rm /usr/local/mysql. Enter your password if required.
5) Execute the following commands consistently:
    sudo rm -rf /usr/local/mysql
    sudo rm -rf /usr/local/var/mysql
    sudo rm -rf /Library/StartupItems/MySQLCOM
    sudo rm -rf /Library/PreferencePanes/My*
    sudo rm -rf /Library/Receipts/mysql*
    sudo rm -rf /private/var/db/receipts/*mysql*
6) Remove the line MYSQLCOM=-YES- from /etc/hostconfig.

- Now, if you check System Preferences, you won’t find MySQL there.

--------------------------------------
Connecting to the database:

As a part of the installation, MySQL Shell was installed which will give access to the command "mysql" in the command line.

But if you type in
> mysql
in the terminal after installation, you may, and probably will get
> zsh: command not found: mysql
(See the video tutorial ^ on how to resolve this which is where I learned it)

To resolve this, you need to add a PATH variable to your .zshrc file as another directory that during the PATH lookup, it will check this directory as one of the locations in order to find the "mysql" bin folder which contains all of the shell executable programs including "mysql". (See my notes on bash_zsh_profile_notes.js on the reason for the path syntax here)

export PATH=${PATH}:/usr/local/mysql-8.0.30-macos12-arm64/bin
  <= the PATH syntax states, export a new version of the PATH variable after appending everything after the : as a path to check

After you correct this issue, you can login to the database
> mysql -u root -p

Then you will be prompted for the root user password you setup during installation (ex. 12345678)
> Enter Password: 12345678

Then hit enter, and if successful, you'll see the below prompt be able to use the MySQL shell to query the DB.

    ➜  ~ mysql -u root -p
    Enter password:
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 12
    Server version: 8.0.30 MySQL Community Server - GPL

    Copyright (c) 2000, 2022, Oracle and/or its affiliates.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql>

--------------------------------------
MySQL shell commands:

To show all databases:
mysql> show databases;

By default, mysql comes with:
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+

To select (use) a db:
mysql> use _database name_

To show all tables:
mysql> show tables;
mysql> show tables from __database_name__;

To exit the shell:
mysql> exit
*/