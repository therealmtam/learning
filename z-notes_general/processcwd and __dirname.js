/*
  - __dirname is the location of the file that is executed in > node _<filename>_.js
    - ex. so if you wrote node ../notes.js, the __dirname = the directory where notes.js lives and not the directory from which the command is executed in which is ../

  - this is in contrast to process.cwd() which will return the directory from which the command is executed

    - example:
      [folderA]
        - fileToExecute.js
        - [folderB]

      - if you cd into folderB and run > node ../fileToExecute.js
        - process.cwd() = /folderA/folderB  <= which is directory where the process is triggered
        - __dirname = /folderA  <= which is where the fileToExecute.js lives

  - THEREFORE, if you need to build a filepath and the process execution location is variable (could be run from many different directories based on maybe a docker config, then use __dirname.
*/