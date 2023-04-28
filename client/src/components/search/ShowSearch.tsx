import React from "react";
import { useSearchContext } from "../../store/searchContext";
import { Modal } from "../Modal/Modal";
import SearchModal from "./SearchModal";

const ShowSearch = () => {
  const { search, active, setActive, setSearch } = useSearchContext();

  return (
    <React.Fragment>
      {search.length > 0 || active ? (
        <Modal
          onClose={() => {
            setSearch("");
            setActive(false);
          }}
          isOpen="isOpen"
          classStyle="search-model"
        >
          <SearchModal />
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

export default ShowSearch;
