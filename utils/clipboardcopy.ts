import { notification } from "./tost";

export default function copyToClipBoard(id: string) {
  // Get the text field
  let copyText: any = document.getElementById(id);
  // Select the text field
  copyText.select();
  //   copyText.setSelectionRange(0, 99999); // For mobile devices
  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
  notification.success("information copied");
}
