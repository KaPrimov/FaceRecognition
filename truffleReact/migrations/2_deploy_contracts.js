const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const Ownable = artifacts.require("Ownable");
const Destructible = artifacts.require("Destructible");
const GameLib = artifacts.require("GameLib");
const SafeMathLib = artifacts.require("SafeMathLib");
const DonationLib = artifacts.require("DonationLib");
const FaceRecognition = artifacts.require("FaceRecognition");

module.exports = function(deployer) {
  deployer.deploy(GameLib);
  deployer.deploy(SafeMathLib);
  deployer.deploy(DonationLib);
  deployer.deploy(Ownable);
  deployer.deploy(Destructible);
  deployer.link(SafeMathLib, FaceRecognition);
  deployer.link(GameLib, FaceRecognition);
  deployer.link(DonationLib, FaceRecognition);
  deployer.deploy(FaceRecognition);
  // deployer.link(Ownable, Destructible);
};
