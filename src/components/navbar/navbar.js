import React from 'react'

const Navbar = (props) => {
    const { onSearch }=props
    const handleInputChange = (e) => {
        const searchQuery = e.target.value;
        onSearch(searchQuery);
      };
    
  return (
    <nav>
      <input type="text" placeholder="Search..." onChange={handleInputChange} />
    </nav>
  )
}

export default Navbar