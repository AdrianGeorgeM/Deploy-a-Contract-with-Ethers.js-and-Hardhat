const ethers = require("ethers");
// Faucet address: 0x57A60737469b3Fb67d9Fa2DC7500b11850651bd0

async function main() {
	const url = process.env.ALCHEMY_TESTNET_RPC_URL || "";

	const provider = new ethers.providers.JsonRpcProvider(url);

	let artifacts = await hre.artifacts.readArtifact("Faucet");

	//imported from my .env file using process.env
	let privateKey = process.env.TESTNET_PRIVATE_KEY;

	let wallet = new ethers.Wallet(privateKey, provider);

	// Create an instance of a Faucet Factory
	let factory = new ethers.ContractFactory(
		artifacts.abi,
		artifacts.bytecode,
		wallet
	);

	let faucet = await factory.deploy();

	console.log("Faucet address:", faucet.address);

	await faucet.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
