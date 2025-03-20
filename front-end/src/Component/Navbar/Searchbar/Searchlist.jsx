import React from "react";
//import { FaSearch } from "react-icons/fa";
import "./Searchlist.css";
import { BsPlayCircle } from "react-icons/bs";
const Searchlist = ({ Titlearray, setsearchquery }) => {
  return (
    <div className="Container_SearchList">
      {Titlearray.length > 0 ? (
        Titlearray.map((title) => (
          <p
            key={title}
            onClick={() => setsearchquery(title)}
            className="titleItem"
            role="button"
            aria-label={`Select ${title}`}
          >
             <BsPlayCircle /> {title}
          </p>
        ))
      ) : (
        <p className="noResults">No results found</p>
      )}
    </div>
  );
};

export default React.memo(Searchlist);
