import * as React from "react";
import {Proposal} from "../pages/index";

interface data {
    p: Proposal;
    click: (p: Proposal) => void;
  }

function TableRow(props: data){
    return (

        <tr className="text-center text-xl hover:bg-gray-700 rounded-2xl mx-auto" onClick={() => {props.click(props.p)}}>
              <td className="py-4 rounded-l-xl">
                <p>{props.p.title}</p>
              </td>
              <td className="py-4">
                <p>{props.p.for}</p>
              </td>
              <td className="py-4">
                <p>{props.p.against}</p>
              </td>
              <td className="py-4 rounded-r-xl">
                <p>{props.p.for + props.p.against}</p>
              </td>
        </tr>
    )
}

export default TableRow;