import { Signer } from "@ethersproject/abstract-signer";
import { ethers, waffle, network } from "hardhat";

import UniMockArtifact from "../artifacts/contracts/mocks/UniMock.sol/UniMock.json";
import gDEFIMockArtifact from "../artifacts/contracts/mocks/gDEFIMock.sol/gDEFIMock.json";
import UnipoolArtifact from "../artifacts/contracts/Unipool.sol/Unipool.json";

import { Accounts, Signers } from "../types";
import { Unipool } from "../typechain/Unipool";
import { UniMock } from "../typechain/UniMock";
import { GDefiMock } from "../typechain/GDefiMock";

const { deployContract } = waffle;

import { expect } from 'chai'

async function latestTime() {
  return (await ethers.provider.getBlock('latest')).timestamp
}

async function timeIncreaseTo(seconds: number) {
  const delay = 10 - new Date().getMilliseconds();
  await new Promise(resolve => setTimeout(resolve, delay));
  await network.provider.request({
    method: "evm_increaseTime",
    params: [seconds]
  });
}

describe("Unit tests", function () {
  before(async function () {
    this.accounts = {} as Accounts;
    this.signers = {} as Signers;

    const signers: Signer[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.user1 = signers[1];
    this.signers.user2 = signers[2];
    this.signers.user3 = signers[3];
    this.signers.user4 = signers[4];
    this.accounts.admin = await signers[0].getAddress();
    this.accounts.user1 = await signers[1].getAddress();
    this.accounts.user2 = await signers[2].getAddress();
    this.accounts.user3 = await signers[3].getAddress();
    this.accounts.user4 = await signers[4].getAddress();
  });

  describe("Unipool", function () {
    beforeEach(async function () {
      this.gDEFI = (await deployContract(this.signers.admin, gDEFIMockArtifact, [])) as GDefiMock;
      this.uni = (await deployContract(this.signers.admin, UniMockArtifact, [])) as UniMock;
      this.pool = (await deployContract(this.signers.admin, UnipoolArtifact, [
        this.gDEFI.address,
        this.uni.address,
      ])) as Unipool;

      await this.pool.setRewardDistribution(this.accounts.admin);

      await this.gDEFI.mint(this.pool.address, ethers.utils.parseEther('1000000'));
      await this.uni.mint(this.accounts.user1, ethers.utils.parseEther('1000'));
      await this.uni.mint(this.accounts.user2, ethers.utils.parseEther('1000'));
      await this.uni.mint(this.accounts.user3, ethers.utils.parseEther('1000'));
      await this.uni.mint(this.accounts.user4, ethers.utils.parseEther('1000'));

      await this.uni.connect(this.accounts.user1);
      await this.uni.approve(this.pool.address, ethers.constants.MaxUint256);
      await this.uni.connect(this.accounts.user2);
      await this.uni.approve(this.pool.address, ethers.constants.MaxUint256);
      await this.uni.connect(this.accounts.user3);
      await this.uni.approve(this.pool.address, ethers.constants.MaxUint256);
      await this.uni.connect(this.accounts.user4);
      await this.uni.approve(this.pool.address, ethers.constants.MaxUint256);

      this.started = (await latestTime());
      await timeIncreaseTo(this.started + 10);
    });

    it('Two stakers with the same stakes wait 1 w', async function () {
      await this.pool.notifyRewardAmount(ethers.utils.parseEther('72000'))

      expect(await this.pool.earned(this.accounts.user1)).to.be.equal('0');
      expect(await this.pool.earned(this.accounts.user2)).to.be.equal('0');
    })

    it('Two stakers with the different (1:3) stakes wait 1 w')

    it('Two stakers with the different (1:3) stakes wait 2 weeks')

    it('Three stakers with the different (1:3:5) stakes wait 3 weeks')

    it('One staker on 2 durations with gap')

    it('Notify Reward Amount from mocked distribution to 10,000')
  });
});
