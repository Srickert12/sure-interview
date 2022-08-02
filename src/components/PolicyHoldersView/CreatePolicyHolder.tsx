import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { PolicyHolder } from './PolicyHoldersView';
import { formatPolicyHolderToTableRows, generateFakePolicyHolder } from './utils';
import { useMemo, useState} from 'react';
import InfoTable from '../InfoTable';

const createHolder = async (newPolicyHolder: PolicyHolder): Promise<PolicyHolder[]> => {
  const resp = await axios.post('https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders', newPolicyHolder);
  return resp.data.policyHolders as PolicyHolder[];
};

function CreatePolicyHolder() {
  const [newPolicyHolders, setNewPolicyHolders] = useState<PolicyHolder[]>([])
  const formattedPolicyHolders = useMemo(() => formatPolicyHolderToTableRows(newPolicyHolders), [newPolicyHolders])

  // const queryClient = useQueryClient();

  const addPolicyHolder = useMutation(createHolder, {
    onSuccess: (policyHolders: PolicyHolder[]) => {
      // queryClient.setQueryData(['policyholders'], policyHolders);

      // using policyHolders[1] here because policyHolders[0] is just the
      // original policy holder returned by the GET api which is already displayed above
      setNewPolicyHolders(prevState => [...prevState, policyHolders[1]]);
    },
  });

  return (
    <>
      <Button
        onClick={() => addPolicyHolder.mutate(generateFakePolicyHolder())}
        variant="contained"
        color="primary"
        size="large"
        sx={{margin: '16px 0 16px 0'}}
      >
        Add a policyholder
      </Button>
      {newPolicyHolders.length > 0 &&
        <InfoTable header="New Policy Holders" rows={formattedPolicyHolders}/>
      }
    </>
  )
};

export default CreatePolicyHolder;