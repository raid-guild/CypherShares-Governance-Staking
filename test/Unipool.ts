import { Signer } from "@ethersproject/abstract-signer";
import { ethers, waffle } from "hardhat";

import UnipoolArtifact from "../artifacts/contracts/Unipool.sol/Unipool.json";

import { Accounts, Signers } from "../types";
import { Unipool } from "../typechain/Unipool";

const { deployContract } = waffle;

describe("Unit tests", function () {
  before(async function () {
    this.accounts = {} as Accounts;
    this.signers = {} as Signers;

    const signers: Signer[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.accounts.admin = await signers[0].getAddress();
  });

  describe("Unipool", function () {
    beforeEach(async function () {
      // TODO
    });

    it('Two stakers with the same stakes wait 1 w')

    it('Two stakers with the different (1:3) stakes wait 1 w')

    it('Two stakers with the different (1:3) stakes wait 2 weeks')

    it('Three stakers with the different (1:3:5) stakes wait 3 weeks')

    it('One staker on 2 durations with gap')

    it('Notify Reward Amount from mocked distribution to 10,000')
  });
});
