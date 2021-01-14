import { Signer } from "@ethersproject/abstract-signer";

export interface Accounts {
  admin: string;
  user1: string;
  user2: string;
  user3: string;
  user4: string;
}

export interface Signers {
  admin: Signer;
  user1: Signer;
  user2: Signer;
  user3: Signer;
  user4: Signer;
}