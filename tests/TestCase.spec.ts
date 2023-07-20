import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { TestCase } from '../wrappers/TestCase';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('TestCase', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('TestCase');
    });

    let blockchain: Blockchain;
    let testCase: SandboxContract<TestCase>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        testCase = blockchain.openContract(TestCase.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await testCase.sendDeploy(deployer.getSender(), toNano('1'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: testCase.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and testCase are ready to use
    });
});