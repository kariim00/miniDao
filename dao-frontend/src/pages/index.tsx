import React, { useState } from "react";
import TableRow from "../components/tableRow";
import type { HeadFC, PageProps } from "gatsby";
import {enable, vote} from "../utils/dapp";
import { BigNumber } from "ethers";

export interface Proposal {
  id: BigNumber;
  title: string;
  for: number;
  against: number;
}

const IndexPage: React.FC<PageProps> = () => {

  const clickk = (id: Proposal) => {
    Select(id)
    setLayout("voting");
  }

  const [layout, setLayout] = useState("home");
  const [selected, Select] = useState({ id: BigNumber.from("0"), title: "", for: 0, against: 0 });
  const [proposals, setProposals] = useState([{ id: BigNumber.from("0"), title: "", for: 0, against: 0 }]);
  const [Voting, setVoting] = useState(false);
  const [connected, setConnected] = useState(false);

  const res = () => {
    if (layout == "home") {
      const items: any = proposals.map((proposal: Proposal, idx) => {
        return <TableRow key={idx} p={proposal} click={clickk} />
      });
      const table = <div className="flex flex-col gap-5 ml-10 mr-10 mt-9">
        < h1 className="text-2xl">Proposals</h1>
        <table className="table-auto">
          <thead>
            <tr className="text-2xl">
              <th>
                <p>proposal</p>
              </th>
              <th>
                <p>Votes for</p>
              </th>
              <th>
                <p>Votes against</p>
              </th>
              <th>
                <p>Total votes</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {items}

          </tbody>
        </table>
      </div>;

      return (
        <main className="bg-gray-900 h-screen mx-auto text-pink-100 ">
          <h1 className="text-3xl font-bold pt-10 text-center">
            Decentralized Democracy
          </h1>
          {
            !connected
              ? <button className="absolute right-5 top-10 text-xl bg-indigo-600 hover:bg-violet-900 px-4 py-2 rounded-2xl" onClick={() => { enable(setConnected, setProposals); }}>Connect</button>
              : <button className="absolute right-5 top-10 text-xl bg-violet-900 px-4 py-2 rounded-2xl" disabled>Connected</button>
          }
          {
            connected
              ? table
              : <h1 className="text-2xl text-center pt-10">Please connect the wallet to use the app</h1>
          }
        </main >
      )
    } else if (layout == "voting") {
      const modal = <div className="fixed top-0 mx-auto z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-modal grid place-items-center">
        <div className="relative w-full h-full max-w-2xl">
          <div className="relative bg-slate-800 rounded-lg shadow">
            <div className="flex items-start justify-between p-4 rounded-t">
              <h3 className="text-xl font-semibold self-center text-gray-200">
                What's your opinion ?
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-row justify-center items-center p-6 space-x-2 rounded-b ">
              <button data-modal-toggle="defaultModal" type="button" className="text-white bg-indigo-800 hover:bg-indigo-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"onClick={() => {vote(selected.id, 2)}}>Agree</button>
              <button data-modal-toggle="defaultModal" type="button" className="text-white bg-indigo-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => {vote(selected.id, 0)}}>Abstain</button>
              <button data-modal-toggle="defaultModal" type="button" className="text-gray-500 bg-indigo-100 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10" onClick={() => {vote(selected.id, 1)}}>Disagree</button>
            </div>
          </div>
        </div>
      </div>;
      return (
        <main className="bg-gray-900 h-screen mx-auto text-pink-100 ">
          <h1 className="text-3xl font-bold pt-10 text-center">
            Decentralized Democracy
          </h1>
          <div className="text-center">
            <h2 className="text-2xl mt-10">{selected.title}</h2>
            <div className="absolute right-10 text-xl flex flex-col gap-8">
              <p>Votes for: {selected.for}</p>
              <p>Votes against: {selected.against}</p>
              <p>Total Votes: {selected.for + selected.against}</p>
            </div>
            <button className="bg-blue-800 hover:bg-blue-900 w-40 h-10 mt-5 rounded-xl" onClick={() => {setVoting(true)}}>Vote</button>
          </div>
          {Voting
            ? modal
            : ""
          }
        </main>

      )
    }

    return (
      <main className="bg-gray-900 h-screen mx-auto text-pink-100 ">
        <h1 className="text-3xl font-bold pt-10 text-center">
          Decentralized Democracy
        </h1>
      </main>
    )
  }

  return res();
}

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;