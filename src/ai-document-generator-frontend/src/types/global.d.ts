declare module "../../icp/icp.js";

declare global {
  interface Window {
    backendActor: any;
    principal?: string | null;
  }
}

export {};

