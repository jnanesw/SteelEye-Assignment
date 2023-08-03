import { useEffect, useState } from "react";

// Data
import mockData from "../assets/data.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [LenghtofItems, SetLenghtofItems] = useState(0);
  const [MatchedData, SetMatchedData] = useState(mockData.results)
  
  const UpdateLength = (MatchedData)=>{
    if(mockData.results.length>0){
      SetLenghtofItems(MatchedData.length);
    }
  }
  const UpdateMockData = (searchText) => {
    if(searchText.length<1){
      SetMatchedData(mockData.results);
    }
    if (searchText.length > 0) {
      const matchingItems = mockData.results.filter(row => row["&id"].toLocaleLowerCase() === searchText.toLocaleLowerCase());
      const matchedData = matchingItems.map(matching => ({
        "&id": matching["&id"],
        "executionDetails": matching.executionDetails,
        "bestExecutionData": matching.bestExecutionData,
      }));
      
      SetMatchedData(matchedData);
    }
  };
  useEffect(()=>{
    UpdateMockData(searchText);
  },[searchText])
  useEffect(()=>{
    UpdateLength(MatchedData);
  },[MatchedData])
  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={LenghtofItems+" orders"} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={MatchedData} Currency={currency} 
              setSelectedOrderDetails={setSelectedOrderDetails} 
              setSelectedOrderTimeStamps={setSelectedOrderTimeStamps}
            />
      </div>
    </div>
  );
};

export default Dashboard;
