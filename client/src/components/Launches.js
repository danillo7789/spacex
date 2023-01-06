import React from "react";
import { gql, useQuery, NetworkStatus } from "@apollo/client";
import LaunchItem from './LaunchItem';
import MissonKey from "./MissonKey";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

const Launches = () => {
  const { loading, error, data, networkStatus } = useQuery(LAUNCHES_QUERY);

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <h4>Loading...</h4>;
  if (error) return console.log(JSON.stringify(error, null, 2));

  return (
    <div>
      <h1 className="display-4 my-3">Launches</h1>
      <MissonKey />

      {
        data.launches.map((launch, index) => (
            <LaunchItem key={index} launch={launch} />
        ))
      }
    </div>
  );
};

export default Launches;
