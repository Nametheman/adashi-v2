import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import Moment from "react-moment";

import logo from "../assets/img/logo2 1.png";
import { format4dpNumber } from "../helpers/formatNumbers";

// interface HeaderProps {
//   index?: number;
// }

interface TransactionReportProps {
  userName?: string;
  transactions?: any;
}

const TransactionReport = (props: TransactionReportProps) => {
  const { userName, transactions } = props;
  const currDate = new Date();

  const altHeader = [styles.header, { backgroundColor: "#EFFEF1" }];

  return (
    <Document>
      <Page
        size="A4"
        style={{
          backgroundColor: "#FAFEFC",
          padding: "10px 20px",
        }}
      >
        <View style={styles.logo}>
          <Image src={logo}></Image>
        </View>

        <Text fixed style={styles.main}>
          Financial Report on Adashi
        </Text>
        <Text style={styles.today}>{currDate.toLocaleString()}</Text>
        <View style={styles.username}>
          <Text style={styles.span}>Name</Text>
          {userName && <Text style={styles.value}>{userName}</Text>}
        </View>
        <View></View>
        <Text></Text>

        <View style={styles.header}>
          <Text style={styles.tableBodySmall}>S/N</Text>
          <Text style={styles.tableBodyMedium}>Date</Text>
          <Text style={styles.tableBodyBig}>Description</Text>
          <Text style={styles.tableBodySmall}>Type</Text>
          <Text style={styles.tableBodySmall}>Status</Text>
          <Text style={styles.tableBodySmall}>Amount</Text>
        </View>

        {transactions?.map((item: any, id: number) => {
          return (
            <View
              style={(id + 2) % 2 !== 0 ? altHeader : styles.header}
              key={id}
            >
              <Text style={styles.tableBodySmall}>{id + 1}</Text>
              <Text style={styles.tableBodyMedium}>
                <Moment format="MMM DD, YYYY">{item.created_at}</Moment>
              </Text>
              <Text style={styles.tableBodyBig}>{item.description}</Text>
              <Text style={styles.tableBodySmall}>{item.type}</Text>
              <Text style={styles.tableBodySmall}>{item.status}</Text>
              <Text style={styles.tableBodySmall}>
                {format4dpNumber(item.amount)}
              </Text>
            </View>
          );
        })}
      </Page>
    </Document>
  );
};

export default TransactionReport;

const styles = StyleSheet.create({
  logo: {
    margin: "6px 0",
    width: "80px",
  },
  main: {
    textAlign: "center",
    margin: "6px 0",
    color: "#292d61",
    fontWeight: "bold",
    fontSize: "20px",
  },
  today: {
    textAlign: "center",
    color: "#47486b",
    margin: "3px 0",
    fontSize: "10px",
  },
  span: {
    color: "#3c4899",
    fontSize: "12px",
  },
  value: {
    color: "#059157",
    fontSize: "12px",
  },
  username: {
    margin: "15px auto",
    backgroundColor: "#ffffff",
    padding: "12px",
    width: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    color: "#33277b",
    backgroundColor: "#FFF",
    // backgroundColor: index % 2 !== 0 ? "#FFF" : "#EFFEF1"
  },
  tableBodySmall: {
    fontWeight: "bold",
    fontSize: "10px",
    width: "12%",
  },
  tableBodyMedium: {
    fontWeight: "bold",
    fontSize: "10px",
    width: "15%",
  },
  tableBodyBig: {
    fontWeight: "bold",
    fontSize: "10px",
    width: "35%",
  },
});
