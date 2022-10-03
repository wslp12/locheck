import React from 'react';

function Private() {
  const url =
    process.env.locheck.R_RUN_MODE === 'local'
      ? `http://localhost:3000`
      : `http://www.lochek.site:3000`;
  const handleDayCal = () => {
    fetch(`${url}/private/day`, {
      method: 'POST',
    });
  };

  const handleWeekCall = () => {
    fetch(`${url}/private/week`, {
      method: 'POST',
    });
  };

  return (
    <>
      <button type="button" onClick={handleDayCal}>
        day 초기화
      </button>
      <button type="button" onClick={handleWeekCall}>
        week 초기화
      </button>
    </>
  );
}

export default Private;
