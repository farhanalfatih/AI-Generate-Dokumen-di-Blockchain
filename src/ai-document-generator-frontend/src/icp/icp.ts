import { HttpAgent, Actor } from "@dfinity/agent";
import type { Identity } from "@dfinity/agent";

// Canister ID & Host ambil dari .env
const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID as string;
const icHost = import.meta.env.VITE_IC_HOST || "http://localhost:4943";

// IDL backend
export const idlFactory = ({ IDL }: { IDL: any }) => {
  return IDL.Service({
    set_display_name: IDL.Func([IDL.Text], [], []),
    upload_file: IDL.Func([IDL.Text, IDL.Vec(IDL.Nat8)], [IDL.Nat], []),
    list_files: IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Record({
            id: IDL.Nat,
            name: IDL.Text,
            size: IDL.Nat,
            uploaded_at: IDL.Int,
            uploader: IDL.Principal,
            uploader_name: IDL.Opt(IDL.Text),
          })
        ),
      ],
      ["query"]
    ),
    get_file: IDL.Func(
      [IDL.Nat],
      [IDL.Opt(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Nat8)))],
      ["query"]
    ),
  });
};

// Factory bikin Actor
export function createActor(identity: Identity) {
  const agent = new HttpAgent({ identity, host: icHost });

  // Kalau lokal perlu fetch root key biar trust SSL dev server
  if (icHost.includes("localhost")) {
    agent.fetchRootKey().catch((err) => {
      console.warn("⚠️ fetchRootKey gagal (abaikan kalau di mainnet)", err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
}