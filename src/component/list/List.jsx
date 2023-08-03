import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";

import timeStamps from "../../assets/timeStamps.json"

const List = ({ rows, Currency,setSelectedOrderDetails,setSelectedOrderTimeStamps}) => {
  
  // Updating the values of {rows}, I mean adding the "orderSubmitted" Coz there is no key like that in data.json
  
  const updatedRows = rows.map((row) => {
    const matchingItem = timeStamps.results.find(item => item['&id'] === row['&id']);
    const orderSubmittedValue = matchingItem ? matchingItem.timestamps.orderSubmitted : '';

    return {
      ...row,
      orderSubmitted: orderSubmittedValue,
    };
  });

  // TRYING TO USE THE USESTATE FUNCTIONS FROM ANOTHER COMPONENT
  const handleRowClick = (row) => {
    const matchingItem = timeStamps.results.find(item => item['&id'] === row['&id']);
    const orderSubmittedValue = matchingItem ? matchingItem.timestamps : '';
    setSelectedOrderDetails({
                                  "buySellIndicator":row.executionDetails.buySellIndicator,
                                  "orderStatus":row.executionDetails.orderStatus,
                                  "orderType":row.executionDetails.orderType

                            });
      
      setSelectedOrderTimeStamps({
                                  "orderRecieved": orderSubmittedValue.orderReceived,
                                  "orderStatusUpdated":orderSubmittedValue.orderStatusUpdated,
                                  "orderSubmited":orderSubmittedValue.orderSubmitted
      })
  };


  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / USD</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {updatedRows.map((row, index) => (
          <ListRow key={index} onClick={() => handleRowClick(row)} >
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{row.orderSubmitted}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[Currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
