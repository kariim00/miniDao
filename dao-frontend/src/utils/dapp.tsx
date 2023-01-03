import { ethers, BigNumber } from "ethers";
import { daoAbi } from "./abis/dao";
import { tokenAbi } from "./abis/token";
import { Proposal } from "../pages";

const token_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const dao_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export const enable = async (setState: (s: boolean) => void, setProposals: (w: [Proposal]) => void) => {
    if ((window as any).ethereum) {
        (window as any).ethereum.request({ method: 'eth_requestAccounts' });

        setState(true);
        const provider = new ethers.providers.Web3Provider((window as any).ethereum)
        const signer = provider.getSigner();

        const daoContract = new ethers.Contract(dao_address, daoAbi, provider);
        const filter = daoContract.filters.ProposalCreated();
        const result = await daoContract.queryFilter(filter);
        let proposals: any = [];
        result.map((proposal) => {
            const obj: Proposal = { title: proposal.args?.description as string, for: 0, against: 0, id: proposal.args?.proposalId as BigNumber };
            proposals.push(obj)
        })


        const votefilter = daoContract.filters.VoteCast();
        const votes = await daoContract.queryFilter(votefilter);
        votes.map((vote) => {
            const id = vote.args?.proposalId;
            const support = vote.args?.support;
            for (let i = 0; i < proposals.length; i++) {
                if (proposals[i].id == id) {
                    if (support == 2) {
                        proposals[i].for++;
                    } else {
                        proposals[i].against++;
                    }
                }
            }
        })
        setProposals(proposals);
    } else {
        alert("Please install metamask");
        setState(false);
    }
}

export const vote = async (id: BigNumber, opinion: number) => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)
    const signer = provider.getSigner();
    const daoContract = new ethers.Contract(dao_address, daoAbi, provider);
    const daoSign = daoContract.connect(signer);
    daoSign.castVote(id, opinion)
}
