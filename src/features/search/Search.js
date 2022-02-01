import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  debounce, isEmpty,
} from 'lodash';
import { BallTriangle } from 'react-loader-spinner';
import Input from '../../components/Input/Input';
import {
  Card,
  CardHeader,
  CardContent,
} from '../../components/Card/Card';
import './Search.css';
import Avatar from '../../components/Avatar/Avatar';
import Pagination from '../../components/Pagination/Pagination';

import UserDetails from './UserDetails/UserDetails';

const authorizationHeader = {
  headers: {
    Authorization: `Basic ${btoa(`${process.env.REACT_APP_GITHUB_CLIENT_ID}:${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`, 'base64')}`,
  },
};

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1); // github's API defaults to 1
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      setTotalResults(0);
      setTotalPages(0);
      setPageNumber(1);
      setSearchResults({});
      setErrorMessage('');
      return;
    }

    setIsLoading(true);

    axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(searchTerm)}&page=${pageNumber}`, authorizationHeader).then((results) => {
      const { data } = results;
      const { total_count, items } = data;

      if (isEmpty(items)) {
        setErrorMessage('No Results Returned');
        setIsLoading(false);
        return;
      }

      setTotalResults(total_count);
      setTotalPages(Math.ceil(total_count / 30));
      setErrorMessage('');
      setSearchResults(items);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setSearchResults({});
      setErrorMessage(error.message || 'An error occurred.');
    });
  }, [searchTerm, pageNumber]);

  const handleOnSearch = (event) => setSearchTerm(event.target.value);
  const handlePaginate = (event) => {
    if (event.selected === 0) {
      setPageNumber(1);
    } else {
      setPageNumber(event.selected);
    }
  };

  const renderTotalResults = () => (totalResults > 0 && (
  <div id="total-results-container">
    {`Total Results: ${totalResults}`}
    <div id="page-number-container">
      {`Page ${pageNumber} of ${totalPages}`}
    </div>
  </div>
  ));

  const renderErrorMessage = () => (errorMessage && (
    <div id="error-message-container">
      {errorMessage}
    </div>
  ));

  const renderLoader = () => (
    <div className="gentle-flex loader-layout-container">
      <BallTriangle
        height="40"
        width="40"
        color="powderblue"
        ariaLabel="loading-indicator"
      />
    </div>
  );

  const renderSearchResults = () => (
    <div id="result-layout-container">
      <div className="gentle-flex result-layout-container">
        {searchResults.length > 0 && (searchResults.map((result) => (
          <Card key={result.login}>
            <a target="_blank" rel="noreferrer" href={result.html_url}>
              <CardHeader headerText={result.login} />
            </a>
            <CardContent>
              <Avatar imageSrc={result.avatar_url} altText={`Avatar of ${result.login}`} />
              <div className="user-details-wrapper">
                <UserDetails userName={result.login} />
              </div>
            </CardContent>
          </Card>
        )))}
      </div>
    </div>
  );

  const renderPaging = () => (
    <div id="paging-container">
      <div id="paging-button-wrapper">
        <Pagination handlePaginate={handlePaginate} totalPages={totalPages} />
      </div>
    </div>
  );

  return (
    <div id="search-container">
      <h2>Search Github Users</h2>
      <div id="input-container">
        <Input
          placeholder="Search For Users"
          onChange={debounce(handleOnSearch, 700)}
          autoFocus
        />
      </div>

      {renderPaging()}
      {renderTotalResults()}
      {renderErrorMessage()}
      {isLoading && renderLoader()}
      {renderSearchResults()}

      {/* As a user,
    ● I see notable information for each search result, such as the description, star/follower
    count */}

    </div>
  );
}
export default Search;
