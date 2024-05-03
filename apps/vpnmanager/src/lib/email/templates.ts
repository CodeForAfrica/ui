export function emailKeyTemplate(key: string, name: string) {
  return `
  <div>

  <p>Hi ${name},</p>
  <p>Thanks for indicating interest in using Outline VPN.</p>
  <p>Use the following instructions to set it up on your devices:</p>
  
  <ol>
    <li>Download and install the Outline app for your device:</li>
    <ul>
      <li>iOS: <a href="https://itunes.apple.com/app/outline-app/id1356177741">Download from App Store</a></li>
      <li>MacOS: <a href="https://itunes.apple.com/app/outline-app/id1356178125">Download from App Store</a></li>
      <li>Windows: <a href="https://s3.amazonaws.com/outline-releases/client/windows/stable/Outline-Client.exe">Download</a></li>
      <li>Linux: <a href="https://s3.amazonaws.com/outline-releases/client/linux/stable/Outline-Client.AppImage">Download</a></li>
      <li>Android: <a href="https://play.google.com/store/apps/details?id=org.outline.android.client">Download from Google Play</a></li>
      <li>Android alternative link: <a href="https://s3.amazonaws.com/outline-releases/client/android/stable/Outline-Client.apk">Download APK</a></li>
    </ul>
    <li>Copy your Access key ${key}</li>
    <li>Open the Outline client app. If your access key is auto-detected, tap 'Connect'. If your access key is not auto-detected, paste it in the field, then tap 'Connect'. You are good to go!</li>
  </ol>
  
  </div>`
}
