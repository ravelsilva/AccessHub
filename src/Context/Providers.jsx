import { LoginProvider } from "./LoginContext";
import { RegisterProvider } from "./RegisterContext";

export function AppProviders({ children }) {
  return (
    <RegisterProvider>
      <LoginProvider>{children}</LoginProvider>
    </RegisterProvider>
  );
}
