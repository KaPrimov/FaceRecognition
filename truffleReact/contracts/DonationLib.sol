pragma solidity >=0.4.25 <0.6.0;

library DonationLib {
    
    struct Data {
        mapping(address => uint) donors;
        uint totalDonations;
        uint biggestDonation;
        address[] allAdresses;
    }    
    
    event ReceivedDonation(address indexed donor, uint amount);
    
    function receiveDonation(Data storage self, uint value) public {
        require(value > 0, "Please send us money!");
        address sender = msg.sender;
        if (self.donors[sender] <= 0) {
            self.allAdresses.push(sender);
        }
        self.donors[sender] += value;
        if (self.donors[sender] > self.biggestDonation) {
            self.biggestDonation = self.donors[sender];
        }
        self.totalDonations += value;
        emit ReceivedDonation(sender, value);
    }
    
    function getDonationForAddress(Data storage self, address account) public view returns(uint) {
        return self.donors[account];
    }
    
    function hasDonated(Data storage self, address account) public view returns(bool) {
        return self.donors[account] > 0;
    }
    
    function getBiggestDonation(Data storage self) public view returns(uint) {
        return self.biggestDonation;
    }
    
    function getTotalDonations(Data storage self) public view returns(uint) {
        return self.totalDonations;
    }
    
    function reset(Data storage self) public {
        self.totalDonations = 0;
        self.biggestDonation = 0;
        for (uint i=0; i< self.allAdresses.length; i++) {
            delete(self.donors[self.allAdresses[i]]);
        }
        delete self.allAdresses;
    }
}