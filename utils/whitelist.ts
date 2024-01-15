export const getWhiteListedAddress = async () => {
    return Promise.resolve([
        // hardhat local addresses
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        // fake addresses
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
        "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
        "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
        "0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678",
        // paco addresses
        "0x935967faD7ebE3E686cf3d835dEfEBA6B5a70CdC",

        // karim addresses
        "0x59a426DFE6884e9487a2fF5B29ab5B55Db2BB679",

        // hardhat local addresses
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
        "0x90F79bf6EB2c4f870365E785982E1f101E93b906",

        // fake addresses
        "0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB",
        "0x617F2E2fD72FD9D5503197092aC168c91465E7f2",
        "0x17F6AD8Ef982297579C203069C1DbfFE4348c372",

        // hardhat local addresses
        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
    ])
}

export const getOGWhiteListedAddress = async () => {
    return Promise.resolve([
        ...await getWhiteListedAddress(),

        // todo: add some test addresses
    ]);
}
