import React, { useEffect, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import getAuthorizationHeaders from '../../../utils/authorizationUtil/authorizationUtil';
import './UserDetails.css';

const authHeaders = getAuthorizationHeaders();

function UserDetails({ userUrl, reposUrl }) {
  const [userDetails, setUserDetails] = useState(undefined);
  const [userDetailsError, setUserDetailsError] = useState(undefined);

  useEffect(async () => {
    // normally I'd put the other call within a function, but since we're leveraging the second call
    // immediately I've opted to keep it here since we enrich user details with it.
    try {
      const { data } = await axios.get(userUrl, authHeaders);
      const userRepoResponse = await axios.get(reposUrl, authHeaders);
      setUserDetails({
        ...data,
        // short-circuit on reduce and set to zero if we can't reduce the data
        star_count: userRepoResponse.data?.reduce((total, number) => total + number, 0) || 0,
      });
    } catch (error) {
      setUserDetailsError(error.message);
    }
  }, [userUrl, reposUrl]);

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
  userUrl: propTypes.string.isRequired,
  reposUrl: propTypes.string.isRequired,
};

export default UserDetails;
