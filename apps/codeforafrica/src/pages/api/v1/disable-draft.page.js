// By default, the Draft Mode session ends when the browser is closed.
// This method clears it manually / on demand.
export default function handler(req, res) {
  res.setDraftMode({ enable: false });
}
