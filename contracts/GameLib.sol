 pragma solidity >=0.4.25 <0.6.0;
 
library GameLib {
    struct Data {
        mapping(address => uint) countImages;
        address mostImages;
        uint mostImagesCount;
        address[] allAdresses;
    }
    
    event RegisterCount(address indexed player, uint count);
    
    function registerCount(Data storage self, uint countImages) public {
        require(countImages > 0, "Send Images");
        address currentAddress = msg.sender;
        if (self.countImages[currentAddress] <= 0) {
            self.allAdresses.push(currentAddress);
        }
        self.countImages[currentAddress] += countImages;
        if (self.countImages[currentAddress] > self.mostImagesCount) {
            self.mostImages = currentAddress;
            self.mostImagesCount = self.countImages[currentAddress];
        }
        
    }
    
    function getMostImages(Data storage self) public view returns(address) {
        return self.mostImages;
    }

    function getCountImagesFor(Data storage self, address user) public view returns(uint) {
        return self.countImages[user];
    }
    
    function reset(Data storage self) public {
        self.mostImages = address(0x0);
        self.mostImagesCount = 0;
        for (uint i=0; i< self.allAdresses.length; i++) {
            delete(self.countImages[self.allAdresses[i]]);
        }
        delete self.allAdresses;
    }
}