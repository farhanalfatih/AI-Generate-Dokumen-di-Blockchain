import { useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../icp/icp";
import "remixicon/fonts/remixicon.css";

export default function Login() {
  const [principal, setPrincipal] = useState<string | null>(null);
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);

  useEffect(() => {
    AuthClient.create().then((client) => setAuthClient(client));
  }, []);

  const handleLogin = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principalText = identity.getPrincipal().toText();

        window.backendActor = createActor(identity);
        window.principal = principalText;

        setPrincipal(principalText);
        alert("✅ Login berhasil!");
      },
    });
  };

  const handleLogout = async () => {
    if (!authClient) return;

    await authClient.logout();
    window.backendActor = undefined;
    window.principal = undefined;

    setPrincipal(null);
    alert("👋 Berhasil logout!");
  };

  return principal ? (
    <div className="flex items-center gap-2 text-white">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
      >
        Logout <i className="ri-logout-box-line"></i>
      </button>
    </div>
  ) : (
    <button
      onClick={handleLogin}
      className="hover:bg-blue-700 text-white px-4 py-2 rounded border-white"
    >
      Login <i className="ri-login-box-line"></i>
    </button>
  );
}
