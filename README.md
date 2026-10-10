# My Giphy

A React Native app (built with Expo) for browsing trending GIFs from the [GIPHY API](https://developers.giphy.com/). Log in, scroll through trending GIFs, save your favorites, and manage a simple profile with a photo from your device.

This started as a small HTML/CSS/JS web project and was rebuilt in React Native as a learning project.


## Features

**Login**
- Email and password form with basic validation
- "Remember me" option: when ticked, the app skips the login screen on the next launch
- Logging in replaces the login screen in the navigation stack, so the back gesture can't return to it

**Trending GIFs**
- Fetches trending GIFs from the GIPHY API with axios
- Loading spinner on first load, and an error screen with a "Try again" button if the request fails
- Infinite scroll: reaching the end of the list loads 9 more GIFs
- Pull down to refresh

**Favorites**
- Tap the heart on any GIF to add or remove it
- Favorites screen with a live count, removal of single items, and a "Remove All" button with a confirmation prompt
- Favorites are saved on the device and restored on the next launch

**Settings**
- Shows the email you logged in with
- Pick a profile picture from your photo library, change it, or remove it
- Log out, which clears the saved login and resets navigation back to the login screen

## Tech stack

| Purpose | Library |
|---------|---------|
| Framework | [Expo](https://expo.dev/) (SDK 57) and React Native |
| Navigation | React Navigation (native stack) |
| Shared state | Redux Toolkit and react-redux |
| Persistence | `@react-native-async-storage/async-storage` |
| HTTP requests | axios |
| Profile picture | `expo-image-picker` and `expo-file-system` |
| Icons | `@expo/vector-icons` |
| Safe areas | `react-native-safe-area-context` |

## Project structure

```
giphy_native/
├── App.js                  # Navigation setup, Redux Provider, startup login check
├── store.js                # Redux store
├── slices/
│   └── favoritesSlice.js   # Favorites state and actions
├── screens/
│   ├── LoginScreen.js
│   ├── GiphyScreen.js
│   ├── FavoriteScreen.js
│   ├── SettingsScreen.js
│   └── *.styles.js         # Styles for each screen
├── assets/
│   └── giphy-logo.jpg
└── .env.example            # Template for your API key
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/)
- The **Expo Go** app on your phone, or an iOS simulator / Android emulator
- A free GIPHY API key from [developers.giphy.com](https://developers.giphy.com/)

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/MOHDASSAF/giphy_native.git
   cd giphy_native
   npm install
   ```

2. Create your `.env` file from the template:

   ```bash
   # macOS / Linux
   cp .env.example .env

   # Windows
   copy .env.example .env
   ```

3. Open `.env` and add your key, with no quotes and no spaces around the `=`:

   ```
   EXPO_PUBLIC_GIPHY_API_KEY=your_key_here
   ```

4. Start the app:

   ```bash
   npx expo start
   ```

5. Scan the QR code with your phone's camera (iOS) or the Expo Go app (Android). Your phone and computer need to be on the same Wi-Fi network.

> Expo only reads `.env` when the dev server starts. After changing it, restart with `npx expo start -c`.

## Notes and limitations

- **The login is a demo.** It only checks that the fields are filled in and that the email contains an `@`. There is no backend or real authentication, and "Remember me" stores a plain flag in AsyncStorage. A production app would verify credentials on a server and keep session data in secure storage, for example `expo-secure-store`.
- **Tested on iOS only**, through Expo Go. Card shadows use iOS-only style properties, and the `Courier New` and `Arial` fonts aren't available on Android, so styling may differ there.
- **Pagination is simple.** Each "load more" re-requests the list with a larger `limit` instead of using an `offset`, so loading stops adding new GIFs once GIPHY's per-request maximum is reached.
- **The API key is not a true secret.** Variables prefixed with `EXPO_PUBLIC_` are bundled into the app. Keeping the key in `.env` stops it from being committed to Git, but anyone with the built app could extract it.
- **Rate limits.** Free GIPHY keys are rate limited. If you see a `429` error, wait a while and try again.
- **Logout doesn't clear favorites or the profile picture**, only the saved login and email.

## What I practiced

- Sharing state across screens with Redux Toolkit and persisting it with AsyncStorage
- Stack navigation, including `replace` and `reset`
- `FlatList` with infinite scroll and pull-to-refresh
- Handling loading and error states for network requests
- Picking and storing images with `expo-image-picker` and `expo-file-system`
- Keeping secrets out of source control with environment variables

## Credits

GIFs and the API are provided by [GIPHY](https://giphy.com/). This is an independent learning project and is not affiliated with or endorsed by GIPHY.

## License

See the [LICENSE](LICENSE) file.
