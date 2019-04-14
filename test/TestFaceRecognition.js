const FaceRecognition = artifacts.require("FaceRecognition");


contract('FaceRecognition', accounts => {
    it('should be enrolled', async () => {
        const instance = await FaceRecognition.deployed();
        await instance.enroll({from: accounts[0], value: 2});
        let hasDonated = await instance.hasDonated({from: accounts[0]});
        assert.equal(hasDonated, true, 'Should be enrolled');
    })

    it('should get correct count images', async () => {
        const instance = await FaceRecognition.deployed();
        await instance.enroll({from: accounts[0], value: 2});
        await instance.registerImage(2, {from: accounts[0]});
        let count = await instance.getCountImagesFor({from: accounts[0]});
        assert.equal(count, 2, 'Wrong img count');
    })

    it('should mark donations', async () => {
        const instance = await FaceRecognition.deployed();
        await instance.acceptDonation({from: accounts[0], value: 2});
        let hasDonated = await instance.hasDonated({from: accounts[0]});
        assert.equal(hasDonated, true, 'Should be enrolled');
    })

    it('mark most images holder', async () => {
        const instance = await FaceRecognition.deployed();
        await instance.enroll({from: accounts[0], value: 2});
        await instance.registerImage(2, {from: accounts[0]});
        const mostImages = await instance.getMostImages({from: accounts[0]});
        assert.equal(mostImages, accounts[0], 'Should has most images');
    })

    it('should have not been mark as donated', async () => {
        const instance = await FaceRecognition.deployed();
        let hasDonated = await instance.hasDonated({from: accounts[2]});
        assert.equal(hasDonated, false, 'Should not be marked as donor');
    })
});
