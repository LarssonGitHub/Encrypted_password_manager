# The_padlock_vault

Create an app in node.js that can store chipered passwords, usernames for websites and services, **which must** be able
to run as a stand-alone application without the need for a browser.

## How to install and run

Download or clone the repo, install node_modules, and run the build script for your desired OS.

- npm run buildWindowsApp | for Windows
 <br>
- npm run buildLinuxApp | for Linux
 <br>
- npm run buildMacApp | for iOS

**Note**: See the section "Known bugs and needed fixes" for potential problems related to your OS.

### Known bugs and needed fixes

#### Windows:
* Once the app has been built as an executable on Windows, and the user tries to start the app, their anti-virus might
flag it as dangerous.

Temporary solutions:

1. Run the executable in the unpacked folder, which doesn't seem to trigger any warnings.
2. Manually whitelist the application in the anti-virus program.
3. Run the app in a code editor environment with the start script.

#### Linux: 

* Favicon doesn't seem to appear in the Linux OS builds.

####  Mac: 

* Build needs further testing on its native OS.

#

### Requirement list and development info

##### Must have: (A paragraph with a strikethrough means the requirement has been fulfilled.)

* ~~The application must be written in TS.~~
* ~~App, once compiled, must be able to run on Linux, Mac, and Windows as an executable file without the need for a web
browser.~~
* ~~All information submitted by each user must be cipred, hashed, and/or encrypted and shall only be decryptable with a password set by the user.~~
* ~~The app itself must be hosted 100% locally, a user should be able to download it and use it right away.~~
* ~~Furthermore, all data, code, packages, modules, or databases must be in the app itself and shall not be hosted
online in any manner.~~
* ~~User should be able to edit, delete, and add new data as he sees fit.~~
* ~~Apply CSS, tables, or other styling to make the app more presentable.~~
* ~~Create custom icon for app.~~

##### Tools, packages, and frameworks used as of now in the project. *(These will be added or removed as the project grows.)*

* TypeScript, Electron, Crypto-js with AES encryption and Node.js