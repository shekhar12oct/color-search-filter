import React from 'react';
import { useState, useEffect } from 'react';

const url = `https://color-names.herokuapp.com/v1/`;


function App() {
  const [color, setColor] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const fetchColor = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setColor(data.colors);
  }

  useEffect(() => {
    fetchColor();
  }, [])


  const searchColor = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput) {
      const filteredSearch = color.filter((color) =>
        Object.values(color)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFiltered(filteredSearch);
    } else {
      setFiltered(color);
    }
  }

  return (<>
    <div className="my-10">
      <h1 className="text-white uppercase font-bold text-2xl
     md:text-4xl lg:text-6xl text-center mb-10">Search Input Filter</h1>
      <input
        type="text"
        name="text"
        placeholder="Search...."
        onChange={(e) => searchColor(e.target.value)}
        autoComplete="off"
        className="w-1/2 block mx-auto py-2 px-5 rounded shadow mb-10"
      />
      {searchInput.length > 1 ? <section className="px-5 grid grid-cols-1 gap-5
    md:grid-cols-2 lg:grid-cols-3 xl:max-w-5xl xl:mx-auto">
        {filtered.map((value) => (
          <div style={{
            backgroundColor:`${value.hex}`
          }}>
            <article
             className="p-5 rounded">
              <h3 className="font-bold text-xl mt-1">{value.name}</h3>
              <p>{value.hex}</p>
            </article>
          </div>
        ))}
      </section> :
      <section className="px-5 grid grid-cols-1 gap-5
    md:grid-cols-2 lg:grid-cols-3 xl:max-w-5xl xl:mx-auto">
        {color.map((value) => (
           <div style={{
            backgroundColor:`${value.hex}`
          }}>
          <article
            key={value.hex}
            className="p-5 rounded"
          >
            <h2 className="font-bold text-xl mt-1">{value.name}</h2>
            <h3 className="font-bold text-xl mt-1">{value.hex}</h3>
          </article>
          </div>
        ))}
      </section>
      }
    </div>
  </>
  )
}

export default App;
