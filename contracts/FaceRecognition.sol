pragma solidity >=0.4.25 <0.6.0;

import "./Ownable.sol";
import "./Destructible.sol";
import "./GameLib.sol";
import "./SafeMathLib.sol";
import "./DonationLib.sol";

contract FaceRecognition is Ownable, Destructible {
    using GameLib for GameLib.Data;
    using DonationLib for DonationLib.Data;
    using SafeMathLib for uint;
    
    GameLib.Data gamelibData;
    DonationLib.Data donationLibData;

    event Enrolled(address indexed enroller);
    event Donated(address indexed donor, uint amount);
    event AwardWithdrawn(address indexed winner);
    uint constant stopPeriod = 28;
    
    uint winningPeriod;
    bool public stopped;
    bool public willBeStoppedInFourWeeks;
    uint startTime;
    
    constructor() public {
        startTime = now;
        stopped = false;
        willBeStoppedInFourWeeks = true;
    }
    
    modifier onlyAfterPeriod() {
        require(startTime + stopPeriod > now, "The action is available only when stop period has passed");
        _;
    }

    modifier stopInEmergency { 
        require(!stopped);
        _;
    }
    
    modifier onlyInEmergency { 
        require(stopped);
        _;
    }
    
    modifier onlyEnrolled(address isEnrolled) {
        require(donationLibData.hasDonated(isEnrolled), "You have to first enroll");
        _;
    }
    
    function toggleContractActive() onlyOwner public {
        if (stopped) {
            willBeStoppedInFourWeeks = true;
            require(startTime + stopPeriod >= now);
        } else {
            willBeStoppedInFourWeeks = false;
        }
        stopped = !stopped;
    }
    
    function registerImage(uint count) public onlyEnrolled(msg.sender) {
        require(count > 0, 'Count should be more than zero');
        gamelibData.registerCount(count);
    }
    
    function enroll() public payable {
        require(msg.value >= 1, "Send at least one ether to participate");
        donationLibData.receiveDonation(msg.value);
        emit Enrolled(msg.sender);
    }
    
    function acceptDonation() public payable {
        require(msg.value > 0, "Please send us money!");
        donationLibData.receiveDonation(msg.value);
        emit Donated(msg.sender, msg.value);
    }
    
    function getBiggestDonation() public view onlyEnrolled(msg.sender) returns(uint) {
        return donationLibData.getBiggestDonation();
    }
    
    function getTotalDonations() public view  onlyEnrolled(msg.sender) returns(uint) {
        return donationLibData.getTotalDonations();
    }

    function hasDonated() public view returns(bool) {
        return donationLibData.hasDonated(msg.sender);
    }
    
    function receiveAward() public payable onlyEnrolled(msg.sender) onlyAfterPeriod {
        address payable currentUser = msg.sender;
        require(gamelibData.getMostImages() == currentUser, "Only the winner can get it");        
        gamelibData.reset();
        donationLibData.reset();
        if (address(this).balance > 1) {
            owner.transfer(1);
        }
        currentUser.transfer(address(this).balance);
        emit AwardWithdrawn(currentUser);
    }

    function getCountImagesFor() public view returns(uint) {
        return gamelibData.getCountImagesFor(msg.sender);
    }

    function getMostImages() public view returns(address) {
        return gamelibData.getMostImages();
    }
    
    function() external payable {
        revert();
    }
}