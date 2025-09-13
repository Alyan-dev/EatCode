import { useEffect, useState } from "react";
import Styled, { styled } from "styled-components";
import SearchResults from "./components/searchResults/SearchResults";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  
  const [data,setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading]= useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all"); 

  useEffect (()=>{
    const fetchFoodData = async()=>{
    setLoading(true);
   try {
    const response = await fetch (BASE_URL);
    const json = await response.json();
    setLoading(false);
    setFilteredData(json);
    setData(json);
   } catch (error) {
     setError("Unable to fetch data");
   }
  };
  fetchFoodData();
  }, []);

  const searchFood = (e)=>{
     const searchValue = e.target.value;
     
     if (searchValue == ""){
      setFilteredData(null);
     }

     const filter = data?.filter((food)=>
      food.name.toLowerCase().includes(searchValue.toLowerCase()));

     setFilteredData(filter);
  }

  const filterFood = (type)=>{
    if (type == "all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
      const filter = data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase()));

      setFilteredData(filter);
      setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }
  ];
 

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

   
  return <>
    <Container>
    <TopContainer>
      <div className="logo">
        <img src="/images/logo.png" alt="logo" />
      </div>
      <div className="search">
        <input onChange={searchFood} type="text" placeholder="Search Food" />
      </div>
    </TopContainer>
    <FilterContainer>
      {
      filterBtns.map((value)=> <Button isSelected ={selectedBtn==value.type} key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>
)
      }
     



    </FilterContainer>

  </Container>
     <SearchResults data = {filteredData}/>
  </>


};

export default App;

export const Container = Styled.div`
 max-width: 1200px; 
 margin: -10 auto;
`;
const TopContainer = styled.section`
height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.logo{
  img{
    width: 100px;
  }
}

.search{
  input{
    background-color: transparent;
    border: 1px solid red;
    border-radius: 5px;
    color: white;
    height: 40px;
    font: 16px;
    padding: 0 10px;
    &::placeholder{
      color: white;
    }
  }
}

@media (0 < width <600px){
  flex-direction: column;
  height: 180px;
}
`;



const FilterContainer = styled.section`
 display: flex;
 gap: 14px;
 justify-content: center;
 padding-bottom: 40px;
`;

export const Button = styled.button`
background-color: ${({isSelected})=> isSelected?"#c41f1f": "#ff4343"} ;
outline: ${({isSelected})=> isSelected?"0.5px solid white": "#ff4343"};
border-radius: 5px;
padding: 6px 12px;
border: none;
cursor: pointer;
color: white;
&:hover{
  background-color: #c41f1f;
}
`;

