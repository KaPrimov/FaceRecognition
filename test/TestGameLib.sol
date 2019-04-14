pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import {GameLib} from '../contracts/GameLib.sol';

contract TestGameLib {
    GameLib.Data private data;

    function testRegisterCount() public {
        uint value = 5;
        GameLib.registerCount(data, value);
        Assert.equal(5, data.mostImagesCount, "Value should be 5");
    } 
    function testRegisterCountWillAddAddress() public{
        uint value = 5;
        GameLib.registerCount(data, value);
        Assert.notEqual(data.mostImages, address(0x0), "The address should not be empty");
    }
    function testRegisterCountWillSetBiggestCount() public {
        uint value = 5;
        uint currentBiggestCount = data.mostImagesCount;
        GameLib.registerCount(data, value);
        Assert.equal(currentBiggestCount + value, data.mostImagesCount, "The count did not increment");
    } 
    function testGetterMostImages() public {
        uint value = 5;
        uint currentBiggestCount = data.mostImagesCount;
        GameLib.registerCount(data, value);
        Assert.equal(currentBiggestCount + value, data.mostImagesCount, "The count did not increment");
    }

    function testReset() public {
        GameLib.reset(data);
        Assert.equal(data.mostImagesCount, 0, "The value should reset");
        Assert.equal(data.mostImages, address(0x0), "The value should reset");
    }
}