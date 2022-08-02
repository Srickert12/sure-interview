import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';
import InfoTable from '../InfoTable';
import CreatePolicyHolder from './CreatePolicyHolder';
import { formatPolicyHolderToTableRows } from './utils';

export type PolicyHolder = {
  name: string,
  age: number,
  address: {
    line1: string,
    line2: string | undefined,
    city: string,
    state: string,
    postalCode: string,
  },
  phoneNumber: string,
  isPrimary: boolean,
};

const getPolicyHolders = async (): Promise<PolicyHolder[]> => {
  const resp = await axios.get('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders');
  return resp.data.policyHolders as PolicyHolder[];
};

function PolicyHoldersView() {

  const { data } = useQuery(['policyholders'], getPolicyHolders);

  const formattedTableData = useMemo(() => formatPolicyHolderToTableRows(data), [data]);

  return (
    <Box sx={{ textAlign: 'center' }}>
      {data &&
        <>
          <InfoTable header="Policy Holders" rows={formattedTableData}/>
          <CreatePolicyHolder />
        </>

      }
    </Box>
  );
}

export default PolicyHoldersView;

/**
 * Challenge 9:
 * For what I would change about this code before shipping to production, I would change a few different things:
 * 
 *  1. Instead of inserting a second table with the new policy holder data, I would use the commented out code above using the queryClient to
 *     manually set the new data into the react-query `policyholders` query cache. This would then automatically update the original table
 *     with the new policy holder from the post response. Another route you could take would be to just invalidate the `policyholders` query cache with 
 *     `queryClient.invalidateQueries(['policyholders'])`. This would cause the PolicyHolderView component to re-fetch the policy holders endpoint to get the 
 *     most up to date data. This isn't an option with the current code though because the get API does not persist any new policy holders.
 * 
 *  2. I would definitely change the format of the table to make it more readable and useful. 
 *     Right now the table lists each row as a field on a single policy holder, which is hard to read and understand 
 *     when there is more than one policy holder in the table. 
 *     Instead, I would modify the InfoTable component so that each row is a PolicyHolder, with a column for each field
 *     (i.e. 1 row would be a single policy holder with a column for name, a column for address, a column for phone number, etc)
 * 
 *  3. I would add some error handling, notifying the user if there is an error either when fetching the original policy holder
 *     data when the PolicyHolderView first mounts, or when there is an error creating a new policy holder with the create policy
 *     holder button.
 * 
 *  4. I would add unit tests around the functionality added in challenges 6-8. Some possible things to test would be
 *    - PolicyHoldersView fetches the correct API endpoint on mount
 *    - PolicyHoldersView correctly maps some mock API data to table values in the view
 *    - PolicyHoldersView shows an error to the user when the fetch API call fails
 *    - Create policy holder button POSTs to the correct API endpoint with the correct data
 *    - Create policy holder button component correctly maps the POST response to the second table
 *    - Create policy holder button component shows an error to the user when the POST http call fails
 *    - Unit tests for the inputs / outputs of the two util functions to map policy holder data and generate fake policy holder data I added in ./utils.ts
 */