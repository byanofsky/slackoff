import React from 'react';

function ActiveUsers(props) {
  const activeUsers = props.activeUsers.join(', ');

  return (
    <div id="active-users">
      <strong>Active Users:</strong> {activeUsers}
    </div>
  );
}

export default ActiveUsers;
