import { gql, useQuery, NetworkStatus } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = () => {
  let { flight_number } = useParams();
  flight_number = parseInt(flight_number);

  const { loading, error, data, networkStatus } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
    // skip: Number.isNaN(flight_number)
  });

  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <h4>Loading...</h4>;
  if (error) return console.log(JSON.stringify(error, null, 2));
  // console.log(data);

  const {
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type },
  } = data.launch;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span> {mission_name}
      </h1>

      <h4 className="mb-3">Launch Details</h4>

      <ul className="list-group">
        <li className="list-group-item">Flight Number: {flight_number}</li>
        <li className="list-group-item">Launch Year: {launch_year}</li>
        <li className="list-group-item">
          Launch Successful:{" "}
          <span
            className={classNames({
              "text-success": launch_success,
              "text-danger": !launch_success,
            })}
          >
            {launch_success ? "Yes" : "No"}
          </span>
        </li>
      </ul>

      <h4 className="my-3">Rocket Details</h4>

      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocket_id}</li>
        <li className="list-group-item">Rocket Name: {rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket_type}</li>
      </ul>

      <Link className="btn btn-secondary mt-3" to="/">Back</Link>
    </div>
  );
};

export default Launch;
