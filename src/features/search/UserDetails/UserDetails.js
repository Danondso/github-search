import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react/cjs/react.development';
import propTypes from 'prop-types';
import './UserDetails.css';

const authorizationHeader = {
  headers: {
    Authorization: `Basic ${btoa(`${process.env.REACT_APP_GITHUB_CLIENT_ID}:${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`, 'base64')}`,
  },
};

const baseUrl = 'https://api.github.com/users/';

function UserDetails({ userName }) {
  const [userDetails, setUserDetails] = useState(undefined);
  const [userDetailsError, setUserDetailsError] = useState(undefined);

  useEffect(async () => {
    // normally I'd put the other call within a function, but since we're leveraging the second call
    // immediately I've opted to keep it here since we enrich user details with it.
    try {
      const { data } = await axios.get(`${baseUrl}${userName}`, authorizationHeader);
      const userRepoResponse = await axios.get(`${baseUrl}${userName}/repos`, authorizationHeader);
      setUserDetails({
        ...data,
        // short-circuit on reduce and set to zero if we can't reduce the data
        star_count: userRepoResponse.data?.reduce((total, number) => total + number, 0) || 0,
      });
    } catch (error) {
      setUserDetailsError(error.message);
    }
  }, [userName]);

  const renderRow = (children) => (
    <div className="user-details-item user-details-row">
      {children}
    </div>
  );

  return (
    <div className="user-details-container">
      {userDetails && !userDetailsError && (
        <div className="user-details-item">
            {userDetails.bio && renderRow(`Bio: ${userDetails.bio}`)}
            {userDetails.company && renderRow(`Company: ${userDetails.company}`)}
            {userDetails.blog && renderRow(`Blog: ${userDetails.blog}`)}
            {userDetails.followers && renderRow(`Followers: ${userDetails.followers}`)}
            {userDetails.public_repos && renderRow(`Public Repos: ${userDetails.public_repos}`)}
            {userDetails.star_count && renderRow(`Star Count: ${userDetails.public_repos}`)}
        </div>
      )}

      {userDetailsError && (
      <div className="user-details-item ">
        {`Error: ${userDetailsError}`}
      </div>
      )}
    </div>

  );
}

UserDetails.propTypes = {
  userName: propTypes.string.isRequired,
};

export default UserDetails;
