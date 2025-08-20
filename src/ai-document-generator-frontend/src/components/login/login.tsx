import React, { useState } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { FaUserCircle } from "react-icons/fa";

const Login: React.FC = () => {
  const [principal, setPrincipal] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider: "https://identity.ic0.app", // Internet Identity resmi ICP
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principalId = identity.getPrincipal().toText();
        setPrincipal(principalId);
        setOpen(false);
        console.log("✅ Login berhasil, Principal ID:", principalId);
      },
    });
  };

  const handleLogout = () => {
    setPrincipal(null);
    setOpen(false);
  };

  return (
    <div className="relative">
      {/* Ikon User */}
      <button onClick={() => setOpen(!open)} className="text-3xl text-gray-700">
        <FaUserCircle />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-black shadow-lg rounded-xl p-4 border">
          {!principal ? (
            <button
              onClick={handleLogin}
              className="  rounded-xl w-full bg-blue-500 px-4 py-2  text-white hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-white break-all">
                {principal}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 px-4 py-2 rounded-xl text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
