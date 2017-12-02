import React from 'react';

function ActiveUsers(props) {
  const activeUsers = props.activeUsers.join(', ');

  return (
    <div id="active-users">
      {activeUsers}
    </div>
  );
}

export default ActiveUsers;
