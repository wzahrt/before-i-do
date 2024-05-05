# Before'IDo'

Before'IDo' is a mobile application developed using React Native that runs on both Android and iOS platforms. It serves as a compatibility testing tool for couples who are soon to be married, helping them assess their compatibility and strengthen their relationship.

## Pages

The application consists of the following pages:

1. **About Page**: Provides information about the purpose and features of the application.

2. **Login Page**: Allows users to log in to their accounts.

3. **Signup Page**: Enables new users to create an account.

4. **Home Page**: Displays the main dashboard and navigation options.

5. **Consultation Page**: Offers resources and guidance for couples seeking relationship advice.

6. **Assessment Page**: Allows couples to take compatibility assessments and quizzes.

7. **Results Page**: Displays the results of compatibility assessments and provides insights.

8. **Profile Page**: Shows user profiles and preferences.

## Getting Started

To run the Before'IDo' application on your local machine, follow these steps:

0. Set up your development environment for react native following [these instructions](https://reactnative.dev/docs/environment-setup?guide=native) for React Native CLI quickstart for iOS. Ensure you've followed the instructions for
   a. Node & Watchman
   b. Xcode
   c. React Native Command Line Interface
   
2. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/BeforeIDo.git
``` 

2. Navigate to the project directory:

```bash
cd BeforeIDo
``` 

3. Install dependencies using npm or yarn:

```bash 
npm install
# or
yarn install
```

4. Run the application on a simulator or device:
   *** NOTE: if this is your first time running/building the app, it might take longer, on out macbook airs it can take 5-10 minutes.

```bash
npm start
```
or 
```bash
npx react-native run-ios
```



## Troubleshooting
### Cannot find module(s)
You might get some errors about not having certain modules, you might need to npm install these in your machine terminal (also listed in our package.json file): 
  - @react-native-community/slider
  - @react-native-firebase/app
  - @react-native-firebase/auth
  - @react-native-firebase/firestore
  - @react-navigation/bottom-tabs
  - @react-navigation/native
  - @react-navigation/native-stack
  - react-native-chart-kit
  - react-native-progress
  - react-native-safe-area-context
  - react-native-screens
  - react-native-svg
  - react-navigation

         
### Build is hanging on generating dependency graph
You may need to clean the project if the build hangs. This can happen if you've switched branches with different dependencies and packages or randomly because react native is a little finicky. 
Here's how you do it. it can take a while too

In VSCode terminal, make sure you're in beforeido NOT before-i-do
1. Delete node_modules and package-lock.json
2. Install dependencies
```bash
npm install
```
3. Navigate to ios subdirectory
```bash
cd ios
```
4. Clean build
```
rm -rf ~/Library/Caches/CocoaPods
rm -rf Pods
rm -rf ~/Library/Developer/Xcode/DerivedData/*
pod deintegrate
pod setup
pod install
```
If this doesnt work, try the above steps again but instead of the last one, do this 
```
pod install --repo-update
```
or perhaps 
```
bundle install
bundle exec pod install
```


## License

This project is licensed under the MIT License. See the LICENSE file for details.

Feel free to customize this README file further to include more details about installation, usage, and contribution guidelines specific to your project.











