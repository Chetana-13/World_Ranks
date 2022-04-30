import Head from 'next/head';
import Layout from '../Layout/Layout';
import styles from '../styles/Home.module.css';
import SearchInput from '../SearchInput/SearchInput';
import CountriesTable from '../CountriesTable/CountriesTable';
import { useState } from 'react';


export default function Home({countries}) 
{
  console.log(countries);
  const [keyword, setKeyword]= useState("");

  const filteredCountries = countries.filter((country) =>
  country.name.toLowerCase().includes(keyword) ||
  country.region.toLowerCase().includes(keyword) ||
  country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange=(e)=>{
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  }
  
  return (
    <Layout>  
      <div className={styles.inputContainer}> 
       <div className={styles.counts}>Found {countries.length} countries</div>

    <div className={styles.input}>
    <SearchInput 
                placeholder="Filter by Name, Region or SubRegion"
                onChange={onInputChange}
             /> 
    </div>   
             
             
       </div>
            
         <CountriesTable countries ={filteredCountries }/>
     </Layout>
  );

    
  
};

export const getStaticProps = async () => {
  const res = await fetch(`https://restcountries.com/v2/all`);
  const countries = await res.json();
  

  return{
    props:{
      countries,

    },
  }
}
