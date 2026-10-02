# Vklub Reward Application

React Native app built with Expo, published on Google Play as `com.reward.com`.

This file covers how to log in to Expo, build the app with EAS (Expo's cloud build service), and publish it to the Google Play Console.

---

## 1. Project facts

| Item | Value |
| --- | --- |
| Expo SDK | 54 (React Native 0.81, React 19) |
| Android package | `com.reward.com` |
| App version | `3.1.0` (`expo.version` in `app.json`) |
| Android runtime version | `3.1.0` (`expo.android.runtimeVersion` in `app.json`) |
| Target Android API | 35 |
| React Native architecture | Old architecture (`newArchEnabled: false`) |
| Expo account / owner | `friensys` |
| EAS project | `vklubreward` (ID `5d7df5c8-d467-479b-9ea6-eacea9f39903`) |
| Build dashboard | https://expo.dev/accounts/friensys/projects/vklubreward/builds |
| Package manager | **yarn** (do not use `npm install`; there is no `package-lock.json`) |

The Android signing keystore is stored on Expo's servers ("Build Credentials by8fYw4Ovp"). Every EAS build uses it automatically, so it always matches the existing Play Store listing. **Never delete it** from the Expo dashboard: Google Play will reject builds signed with a different key.

---

## 2. One-time setup on a new computer

1. Install **Node.js** (LTS) from https://nodejs.org.
2. Install yarn globally:
   ```powershell
   npm install -g yarn@1
   ```
3. Install project dependencies from the project folder:
   ```powershell
   cd E:\FTS\VK-MobileAPP
   yarn install
   ```

You do not need Android Studio or Java. All builds run in the cloud on EAS.

---

## 3. Expo login

EAS CLI is used through `npx`, so nothing extra needs installing.

```powershell
npx eas-cli login          # opens the browser to sign in to expo.dev
npx eas-cli whoami         # check who is logged in
npx eas-cli logout         # sign out
```

- Sign in with the Expo account that owns the `friensys` organization.
- `login` opens a browser window. If it doesn't, copy the link it prints into a browser.
- For CI or scripts, create an access token at https://expo.dev/settings/access-tokens and set it as the `EXPO_TOKEN` environment variable instead of logging in.
- Never commit passwords or tokens to this repository.

---

## 4. This folder is not a git repository

EAS expects a git repository. Until one is set up, prefix every EAS **build** command with `EAS_NO_VCS=1`:

PowerShell:
```powershell
$env:EAS_NO_VCS = "1"
npx eas-cli build ...
```

Git Bash:
```bash
EAS_NO_VCS=1 npx eas-cli build ...
```

Without it, the build stops with *"EAS requires you to use a git repository"*. (Setting up git is better long term: `git init`, commit, then this variable is no longer needed.)

---

## 5. Before every build: quick local checks

Run these from the project folder. They catch most problems in seconds, instead of after a 30–60 minute cloud build.

```powershell
npx expo-doctor                          # dependency/config health check
npx expo export --platform android       # proves the JavaScript bundle compiles
```

`expo-doctor` should pass. `react-native-reanimated` is intentionally excluded from its version check (see section 10). Delete the generated `dist` folder afterwards.

---

## 6. Build profiles (`eas.json`)

| Profile | Output | Use it for |
| --- | --- | --- |
| `development` | APK with dev client | Local development with a Metro server (see section 9) |
| `preview` | Installable **APK** | Installing directly on a phone to review features |
| `production` | **AAB** (app bundle) | Uploading to Google Play |

`production` uses the `main` update channel and automatically increases `versionCode`.

---

## 7. Building

### Test APK to install on a phone

```powershell
$env:EAS_NO_VCS = "1"
npx eas-cli build --profile preview --platform android
```

When it finishes, open the build page on expo.dev. It shows an **Install** button and a QR code. Scan it with the phone, download the `.apk` and install it (allow "Install unknown apps" if Android asks). If a Play Store copy of the app is already installed and the install fails, uninstall it first.

### Production bundle for Google Play

```powershell
$env:EAS_NO_VCS = "1"
npx eas-cli build --profile production --platform android
```

The result is an `.aab` file. Download it from the build page.

### Useful build commands

```powershell
# start a build without waiting for it to finish in the terminal
npx eas-cli build --profile production --platform android --no-wait

npx eas-cli build:list --platform android --limit 5     # recent builds and their status
npx eas-cli build:view <BUILD_ID>                        # details and download link of one build
```

**Timing:** the account is on Expo's free plan. Builds often wait **10–60 minutes in the queue**, then take about 10–15 minutes to build. A paid Expo plan gets priority in the queue.

If a build fails, open its page on expo.dev and read the **"Run gradlew"** step. Look for lines starting with `e:` or `* What went wrong`.

---

## 8. Version numbers

| Field | Where | When to change |
| --- | --- | --- |
| `versionCode` | Stored **remotely on EAS** (`appVersionSource: remote`) | Never by hand. Production builds increase it automatically. The `versionCode` in `app.json` is ignored. |
| `version` (version name shown in Play) | `expo.version` in `app.json` | For every release you want to label differently, e.g. `3.1.0` → `3.1.1`. |
| `runtimeVersion` | `expo.android.runtimeVersion` in `app.json` | **Whenever native code changes**: Expo SDK upgrade, adding/removing/upgrading a native library, changing native config in `app.json`. |

If Play Console says a version code is already used, set a higher number on EAS:
```powershell
npx eas-cli build:version:set --platform android
```

### Over-the-air (OTA) updates

On launch, the app checks for JavaScript updates (`expo-updates`, channel `main`) and downloads ones that match its `runtimeVersion`.

- JavaScript-only changes can be shipped without the Play Store:
  ```powershell
  npx eas-cli update --channel main --message "describe the change"
  ```
- **Danger:** an update made from code with different native dependencies will crash the app. Always bump `runtimeVersion` when native code changes, and build a new store release. After the SDK 54 upgrade, the runtime was bumped from `3.0.0` to `3.1.0` for exactly this reason.

---

## 9. Local development (optional)

1. Build and install the `development` profile APK on a phone (section 7, with `--profile development`).
2. Start Metro on this computer:
   ```powershell
   npx expo start --dev-client --lan
   ```
3. Connect the phone to the same Wi-Fi and open the app. It finds the server, or you can enter `http://<this-PC's-IP>:8081`. Allow Node.js through Windows Firewall if asked.

The browser (`expo start --web`) does **not** work for this app: `@react-native-firebase` only runs on a real Android or iOS build.

---

## 10. Google Play requirements already handled (don't undo these)

| Play requirement | How it's handled |
| --- | --- |
| **Photo and video permissions policy:** no `READ_MEDIA_IMAGES` / `READ_MEDIA_VIDEO` | Profile photo uses the Android system photo picker (`ImagePicker.launchImageLibraryAsync`, no permission needed). `expo-media-library` was removed. `app.json` → `android.blockedPermissions` strips all `READ_MEDIA_*`, `ACCESS_MEDIA_LOCATION`, `READ/WRITE_EXTERNAL_STORAGE`. Don't add `expo-media-library` back or request these permissions. |
| **Target API level 35+** | `expo-build-properties` → `android.targetSdkVersion: 35`. |
| **16 KB memory page size** | Needs React Native 0.77 or newer, which is why the project moved to Expo SDK 54. Don't downgrade the SDK. |
| **Edge-to-edge (Android 15)** | `android.edgeToEdgeEnabled: false` keeps the old layout while targeting 35. When Google requires **API 36**, edge-to-edge can no longer be disabled: screens must then handle the status and navigation bar insets (`react-native-safe-area-context`). |

Other deliberate choices:
- `newArchEnabled: false` and `react-native-reanimated` pinned to **3.19.x** (listed in `expo.install.exclude` in `package.json`). Reanimated 4 needs the new architecture and would break `@react-navigation/drawer` v6. Moving to the new architecture means upgrading React Navigation to v7 first.
- `BackHandler.removeEventListener` no longer exists (React Native 0.77+). Use `const sub = BackHandler.addEventListener(...)` and `sub.remove()`.

### Upgrading the Expo SDK in future
```powershell
yarn add expo@~<NEW_SDK>.0.0
npx expo install --fix
npx expo-doctor
npx expo export --platform android
```
Then bump `runtimeVersion`, build a `preview` APK, and test on a phone before making a production build.

---

## 11. Publishing to Google Play Console

Play Console: https://play.google.com/console (app **Vklub Reward Application**, `com.reward.com`).

### Recommended release flow

1. **Build** a production `.aab` (section 7) and download it.
2. **Internal testing first:** Play Console → *Test and release* → *Testing* → **Internal testing** → *Create new release* → upload the `.aab` → add release notes → *Save* → *Review release* → *Start rollout*.
3. **Pre-launch report:** within about an hour Google tests the build on real devices. Check *Testing* → **Pre-launch report** for crashes. If there is a crash, open it and copy the **stack trace**; that's what's needed to fix it.
4. **Test on your own phone:** testers on the internal list install it from the Play Store link. Check at least: login, Back button on the login screen, drawer menu, notifications, charts, profile photo (camera and gallery), redeem flows.
5. **Promote to production:** on the internal release, choose *Promote release* → *Production* (or create a production release and add the same bundle from the library) → *Review release* → *Start rollout to production*.
6. **Policy issues:** if Play listed problems (*Policy and programs* → *App content*, or the **Publishing overview** page), confirm they are resolved. Then send the changes for review from **Publishing overview**.

Notes:
- Play checks issues across **all active tracks**. An old build still live on a testing track with banned permissions or a 4 KB native library keeps the warning alive, so replace or retire it.
- A higher `versionCode` must be uploaded every time; the same number can never be reused.

### Optional: upload from the command line (`eas submit`)

1. In Google Cloud, create a service account with access to the Play Console app and download its **JSON key**. Expo's guide: https://expo.fyi/creating-google-service-account
2. Upload the key to EAS when asked (it's stored with the project credentials). **Don't commit the JSON file.**
3. The **first** release of an app must be uploaded manually in Play Console. After that:
   ```powershell
   npx eas-cli submit --platform android --latest
   ```

---

## 12. Troubleshooting

| Problem | Fix |
| --- | --- |
| `EAS requires you to use a git repository` | Set `EAS_NO_VCS=1` (section 4). |
| `Not logged in` | `npx eas-cli login` (section 3). |
| Play: "version code already used" | `npx eas-cli build:version:set --platform android`, then rebuild. |
| Play: "does not support 16 KB page sizes" | Make sure the build is from Expo SDK 54+. If the report shows a crash, read the stack trace; often it's a normal JavaScript error found by Google's test robot, not an alignment problem. |
| Build stuck "in queue" | Normal on the free plan (up to about an hour). Watch the build page. |
| `Cannot find module ...` when starting Expo | `node_modules` is incomplete. Delete `node_modules` and run `yarn install` again. |
| Gradle build failed | Open the build page → "Run gradlew" step → look for `e:` / `What went wrong`. |
