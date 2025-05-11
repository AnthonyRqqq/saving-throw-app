import { GET_ALL_SPELL_LISTS } from "../../utils/queries";
import {
  CREATE_SPELL_LIST,
  UPDATE_SPELL_LIST,
  DELETE_SPELL_LIST,
} from "../../utils/mutations";
import Auth from "../../utils/auth";
import DeleteModal from "../Modals/DeleteModal";
import Spells from "./Spells";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import "./SpellList.css";

import { useEffect, useState } from "react";

export default function SpellList() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [spellListId, setSpellListId] = useState(null);
  const [spellListName, setSpellListName] = useState(null);
  const [listDisplay, setListDisplay] = useState(false);
  const user = Auth.getLoggedInUser();

  const { loading, data, refetch } = useQuery(GET_ALL_SPELL_LISTS, {
    variables: { userId: user?.data._id },
  });

  const [deleteList] = useMutation(DELETE_SPELL_LIST);

  const navigate = useNavigate();

  const handleDeleteClick = async (e) => {
    await setSpellListId(e.target.dataset.listid);
    setSpellListName(e.target.dataset.listname);
    await setShowDeleteConfirm(true);
  };

  const handleDeleteSpellList = async () => {
    await deleteList({ variables: { id: spellListId } });
    refetch();
  };

  if (loading) return <>Loading...</>;

  if (!loading && !data) return <>Error getting data</>;

  return (
    <>
      <DeleteModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onHide={() => setShowDeleteConfirm(false)}
        onClick={() => handleDeleteSpellList()}
        item={spellListName}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="rounded"
          onClick={() => {
            navigate("/spells/createNewList");
          }}
        >
          Create New Spell List
        </button>
      </div>

      <div className="row">
        {data.spellLists.map((list, index) => {
          return (
            <>
              <div
                className="col-lg-4 col-6"
                style={{ position: "relative" }}
                key={index}
              >
                <div className="col spellListCard">
                  <span
                    className="spellListItem"
                    onClick={() => navigate(`${list._id}`)}
                  >
                    {list.name}
                  </span>
                </div>

                <div
                  data-listid={list._id}
                  data-listname={list.name}
                  className="bi bi-trash"
                  onClick={handleDeleteClick}
                  style={{
                    position: "absolute",
                    top: "45%",
                    right: "12%",
                    color: "red",
                    cursor: "pointer",
                  }}
                ></div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
