import React from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import "./Navigation.css";

export const CustomPrevButton = (props) => {
  const {page, handlePrevClick} = props;
  if (page === 1) return <div />;

  return (
    <li className="page-item">
      <Button className="page-link" onClick={handlePrevClick}>
        {"<"}
      </Button>
    </li>
  );
};
CustomPrevButton.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
};

export const CustomNextButton = (props) => {
  const {page, pages, handleNextClick} = props;
  if (page === pages) return <div />;

  return (
    <li className="page-item">
      <Button
        className="page-link btn-outline-primary"
        onClick={handleNextClick}
      >
        {">"}
      </Button>
    </li>
  );
};
CustomNextButton.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handleNextClick: PropTypes.func.isRequired,
};

export const CustomPages = (props) => {
  const {page, pages} = props;
  return (
    <li className="page-item">
      <h4>
        {" "}
        <span className="badge badge-info">
          {page}/ {pages}
        </span>
      </h4>
    </li>
  );
};
CustomPages.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
};



const CustomNavigation = (props) => {
  const {page, pages} = props;

  const {handlePrevClick, handleNextClick} = props;

  return (
    <div className="row">
      <div className="col-sm-4 col-md-4"></div>
      <div className="col-sm-4 col-md-4">
        <nav aria-label="Page navigation">
          <ul className="pagination pagination-md justify-content-center">
            <CustomPrevButton
              page={page}
              pages={pages}
              handlePrevClick={handlePrevClick}
            />
            <CustomPages page={page} pages={pages} />
            <CustomNextButton
              page={page}
              pages={pages}
              handleNextClick={handleNextClick}
            />
          </ul>
        </nav>
      </div>
      <div className="col-sm-4 col-md-4">
        <nav aria-label="Page navigation">
          <ul className="pagination pagination d-flex flex-row-reverse">
           
          </ul>
        </nav>
      </div>
    </div>
  );
};
CustomNavigation.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired, 
};

export default CustomNavigation;
