export function emailKeyTemplate(key: string) {
  return `<div>
    <p>
    Follow the instructions on your <a href="https://s3.amazonaws.com/outline-vpn/invite.html#${encodeURIComponent(
      key,
    )}">Invitation Link</a> to download the Outline app and get connected.
    </p>
    <p>Having trouble accessing the invitation link?</p>
    <ol>
        <li>Copy your access key: ${key}</li>
        <li>Follow our invitation instructions on GitHub: https://github.com/Jigsaw-Code/outline-client/blob/master/docs/invitation_instructions.md</li>
    </ol>
</div>`;
}
