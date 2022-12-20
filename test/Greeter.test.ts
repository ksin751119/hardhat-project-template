import { Wallet, BigNumber, constants } from 'ethers';
import { expect } from 'chai';
import { deployments, network } from 'hardhat';
import { USDC_TOKEN } from './utils/constants';
import { ether } from './utils/utils';

const base = ether('1');

describe('Greeter', function () {
  let owner: Wallet;
  let user: Wallet;
  let other: Wallet;
  let greeter: any;

  const setupTest = deployments.createFixture(async ({ deployments, ethers }, options) => {
    await deployments.fixture(''); // ensure you start from a fresh deployments
    [owner, user, other] = await (ethers as any).getSigners();

    const provider = await tokenProviderQuick(USDC_TOKEN);
    const Greeter = await ethers.getContractFactory('Greeter');
    greeter = await Greeter.deploy('Hello, world!');
    await greeter.deployed();
  });

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // setupTest will use the evm_snapshot to reset environment for speed up testing
    await setupTest();
  });
  describe('normal', function () {
    // beforeEach(async function () {
    // });
    it('Should return the new greeting once its changed', async function () {
      expect(await greeter.greet()).to.equal('Hello, world!');
      const setGreetingTx = await greeter.setGreeting('Hola, mundo!');
      await setGreetingTx.wait();
      expect(await greeter.greet()).to.equal('Hola, mundo!');

      // revert cases
      // await expect().to.be.revertedWith('');
    });
  });
});
