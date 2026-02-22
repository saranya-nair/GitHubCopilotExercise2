import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setTeams(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <Card className="mb-4">
      <Card.Header as="h2" className="bg-info text-white">Teams</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{team.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Teams;
