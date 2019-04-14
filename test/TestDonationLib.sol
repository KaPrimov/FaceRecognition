pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import {DonationLib} from '../contracts/DonationLib.sol';

contract TestDonationLib {
    DonationLib.Data private data;

    function testReceiveDonation() public {
        uint value = 5;
        DonationLib.receiveDonation(data, value);
        Assert.equal(5, data.totalDonations, "value should be 5");
    } 
    function testReceiveDonationWillSetBiggestDonation() public {
        uint value = 5;
        uint currentBiggestDonation = data.biggestDonation;
        DonationLib.receiveDonation(data, value);
        Assert.equal(currentBiggestDonation + value, data.biggestDonation, "The donation did not increment");
    } 
    function testGetterForBiggestDonation() public {
        uint value = 5;
        uint currentBiggestDonation = data.biggestDonation;
        DonationLib.receiveDonation(data, value);
        uint biggestDonation = DonationLib.getBiggestDonation(data);
        Assert.equal(currentBiggestDonation + value, biggestDonation, "The donation did not increment");
    }
    function testGetterTotalDonations() public{
        Assert.equal(data.totalDonations, DonationLib.getTotalDonations(data), "The donation did return from data");
    }

    function testReset() public {
        DonationLib.reset(data);
        Assert.equal(data.totalDonations, 0, "The value should reset");
        Assert.equal(data.biggestDonation, 0, "The value should reset");
    }
}