import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        setActivities(data.results ? data.results : data);
      });
  }, [endpoint]);

  return (
    <Card className="mb-4">
      <Card.Header as="h2" className="bg-success text-white">Activities</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{activity.type}</td>
                <td>{activity.duration}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Activities;
