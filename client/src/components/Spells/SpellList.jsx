import { GET_ALL_SPELL_LISTS } from "../../utils/queries";
import { CREATE_SPELL_LIST, UPDATE_SPELL_LIST } from "../../utils/mutations";
import Auth from '../../utils/auth'
import { useQuery, useMutation } from "@apollo/client";

import { useEffect } from "react";

export default function SpellList() {
  const user = Auth.getUser();

  const { loading, data } = useQuery(GET_ALL_SPELL_LISTS, {
    variables: { userId: user.data._id },
  });

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
    }
  }, [loading, data]);

  return <><button>Create Spell List</button></>;
}
