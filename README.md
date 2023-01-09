# Decentralized Democracy

This is a decentralized autonomous organization (DAO) built on the Ethereum blockchain. It includes a smart contract written in Solidity, a frontend built with TypeScript, React, and Gatsby, using ethers.js.

## Getting Started

To get started with this project, you'll need to have the following software installed on your system:

- Node.js (version 18 or higher)
- npm
- Gatsby
- foundry toolkit

You'll also need to have an injected web3 wallet (metamask).

Once you have all of the required software installed, follow these steps to set up the project:

Clone the repository to your local machine using `git clone https://github.com/kariim00/miniDao`.

### Frontend
1. Navigate to the frontend directory using `cd dao-frontend`.
2. Install the project dependencies using `npm install`.
3. Then start the frontend server using `npx develop`

### Smart Contracts
1. Navigate to the contracts using `cd contracts`.
2. Start the anvil blockchain using `anvil`.
3. Then in a new terminal compile and deploy the smart contracts using `forge create`.

The frontend should now be running at `http://localhost:3000`, and you should be able to interact with the DAO through the web interface.

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your changes. Be sure to include a detailed description of your changes, and make sure all code follows the project's style guide.
