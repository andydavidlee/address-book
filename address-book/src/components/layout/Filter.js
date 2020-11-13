import React, { useState} from 'react';

const Filter = (props) => {

  const [ filterDetail ] = useState('');

      return (
        <form>
          <input type="text" placeholder="Search..." value={filterDetail} />
        </form>
      );
} 

export default Filter;
