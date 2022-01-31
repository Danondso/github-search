import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  debounce, each, isEmpty,
} from 'lodash';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import {
  Card,
  CardHeader,
  CardContent,
} from '../../components/Card/Card';
import './Search.css';
import Avatar from '../../components/Avatar/Avatar';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1); // github's API defaults to 1
  const [searchResults, setSearchResults] = useState({});
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!searchTerm) {
      setTotalResults(0);
      setTotalPages(0);
      setPageNumber(1);
      setSearchResults({});
      return;
    }

    axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(searchTerm)}&page=${pageNumber}`).then((results) => {
      const { data } = results;
      setTotalResults(data.total_count);
      setTotalPages(Math.ceil(data.total_count / 30));

      const keyedResults = {};
      each(data.items, (item) => { keyedResults[item.login] = item; });
      setSearchResults(keyedResults);
    }).catch((error) => {
      console.log(error);
    });
  }, [searchTerm, pageNumber]);

  // make this happen on a button click
  // useEffect(() => {
  //   each(searchResults, (searchResultItem) => {
  //     axios.get(`https://api.github.com/users/${searchResultItem.login}`).then((result) => {
  //       console.log(result.data);
  //     });
  //   });
  // }, [searchResults]);

  const handleOnSearch = (event) => setSearchTerm(event.target.value);
  const handlePageForward = () => setPageNumber(pageNumber + 1);
  const handlePageBackward = () => setPageNumber(pageNumber - 1);

  const renderTotalResults = () => (totalResults > 0 && (
  <div id="total-results-container">
    {`Total Results: ${totalResults}`}
    <div id="page-number-container">
      {`Page ${pageNumber} of ${totalPages}`}
    </div>
  </div>
  ));

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

      <div id="paging-container">
        <div id="paging-button-wrapper">
          <Button
            onClick={handlePageBackward}
            disabled={pageNumber === 1 || isEmpty(searchResults)}
          >
            <BsArrowLeft size={18} />
          </Button>
          <Button
            onClick={handlePageForward}
            disabled={pageNumber === totalPages || isEmpty(searchResults)}
          >
            <BsArrowRight size={18} />
          </Button>
        </div>
      </div>

      {renderTotalResults()}
      <div id="result-layout-container">
        <div className="gentle-flex">
          {searchResults && (Object.values(searchResults).map((result) => (
            <Card>
              <CardHeader headerText={result.login} />
              <CardContent>
                <a target="_blank" rel="noreferrer" href={result.avatar_url}>
                  <Avatar imageSrc={result.avatar_url} altText={`Avatar of ${result.login}`} />
                </a>
              </CardContent>
            </Card>
          )))}
        </div>
      </div>

      {/* As a user,
    ● I can navigate through the next and previous pages of the paginated results
    ● I see notable information for each search result, such as the description, star/follower
    count, profile pictures, etc. */}

    </div>
  );
}
export default Search;
