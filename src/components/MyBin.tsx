const MyBin = () => {
  return <div>MyBin</div>;
};

export default MyBin;

// {/* <DragDropContext onDragEnd={handleOnDragEnd}>
//   <Droppable droppableId="rolOverList">
//     {(provided) => (
//       <ul
//         className="characters"
//         {...provided.droppableProps}
//         ref={provided.innerRef}
//       >
//         {testData.map((item, index) => {
//           return (
//             <Draggable key={item.id} draggableId={item.id} index={index}>
//               {(provided) => (
//                 <li
//                   ref={provided.innerRef}
//                   {...provided.draggableProps}
//                   {...provided.dragHandleProps}
//                 >
//                   <p>{item.planName}</p>
//                   <p>{item.date}</p>
//                 </li>
//               )}
//             </Draggable>
//           );
//         })}
//         {provided.placeholder}
//       </ul>
//     )}
//   </Droppable>
// </DragDropContext>; */}

// const data1 = [
//   {
//     id: "1",
//     planName: "Rent",
//     date: "Jan 12, 2022",
//     savingsType: "Individual Savings",
//     status: "success",
//     amount: "20000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     id: "2",
//     planName: "School Fees",
//     date: "Feb 14, 2022",
//     savingsType: "Target Group Savings",
//     status: "failed",
//     amount: "10000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     id: "3",
//     planName: "Dream Car",
//     date: "Mar 23, 2022",
//     savingsType: "Cooperative Group Savings",
//     status: "success",
//     amount: "2500",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     id: "4",
//     planName: "Wedding",
//     date: "Jan 12, 2022",
//     savingsType: "Individual Savings",
//     status: "success",
//     amount: "130000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     id: "5",
//     planName: "Rent",
//     date: "Feb 14, 2022",
//     savingsType: "Target Group Savings",
//     status: "failed",
//     amount: "4000",
//     transactionId: "20211202163844920640075",
//   },
// ];

// {/* <div className="steps-action">
//   {current > 0 && (
//     <Button style={{ margin: "0 2rem 0 0" }} onClick={() => prev()} fontSize="16px">
//       Previous
//     </Button>
//   )}

//   {current < steps.length - 2 ? (
//     <Button fontSize="16px" onClick={() => next()}>
//       Next
//     </Button>
//   ) : current === steps.length - 1 ? (
//     <Button fontSize="16px" onClick={() => setCurrentModal(2)}>
//       Create Plan
//     </Button>
//   ) : (
//     <Button fontSize="16px" type="primary" onClick={() => setCurrentModal(1)}>
//       Next
//     </Button>
//   )}
// </div> */}

// const data1 = [
//   {
//     planName: "Rent",
//     date: "Jan 12, 2022",
//     savingsType: "Individual Savings",
//     status: "success",
//     amount: "20000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "School Fees",
//     date: "Feb 14, 2022",
//     savingsType: "Target Group Savings",
//     status: "failed",
//     amount: "10000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "Dream Car",
//     date: "Mar 23, 2022",
//     savingsType: "Cooperative Group Savings",
//     status: "success",
//     amount: "2500",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "Wedding",
//     date: "Jan 12, 2022",
//     savingsType: "Individual Savings",
//     status: "success",
//     amount: "130000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "Rent",
//     date: "Feb 14, 2022",
//     savingsType: "Target Group Savings",
//     status: "failed",
//     amount: "4000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "Land",
//     date: "Mar 23, 2022",
//     savingsType: "Cooperative Group Savings",
//     status: "success",
//     amount: "50000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "Home renovation",
//     date: "Jan 12, 2022",
//     savingsType: "Individual Savings",
//     status: "success",
//     amount: "56000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "Office contribution",
//     date: "Feb 14, 2022",
//     savingsType: "Target Group Savings",
//     status: "failed",
//     amount: "34000",
//     transactionId: "20211202163844920640075",
//   },
//   {
//     planName: "Rent",
//     date: "Mar 23, 2022",
//     savingsType: "Cooperative Group Savings",
//     status: "success",
//     amount: "5500",
//     transactionId: "20211202163844920640075",
//   },
// ];

// const IndPlans = [
//   {
//     title: "Car",
//     balance: 100000,
//     withdrawStatus:
//       "Withdraw for free anytime. Earn 5.5% p.a. on your balance.",
//   },
//   {
//     title: "House Rent",
//     balance: 100000,
//     withdrawStatus:
//       "Withdraw for free anytime. Earn 5.5% p.a. on your balance.",
//   },
//   {
//     title: "Birthday",
//     balance: 100000,
//     withdrawStatus:
//       "Withdraw for free anytime. Earn 5.5% p.a. on your balance.",
//   },
// ];

// const myCards = [
//   { name: "Wema Bank-2312", value: "Wema Bank-2312" },
//   { name: "GTBank-0217", value: "GTBank-0217" },
// ];

// Target Group
// const [planData, setPlanData] = useState({
//   status: "Active",
//   title: "Group A",
//   totalAmt: 50000,
//   cycleAmt: "300",
//   cycle: "monthly",
//   rate: 5.5,
//   achievedPercent: 70,
//   achievedAmt: 70000,
//   groupName: "Focus Group contribution",
//   members: [memberImg, memberImg, memberImg],
//   principal: 2000,
//   returns: 55.34,
//   startDate: "Jan 22, 2022",
//   maturityDate: "Jan 21, 2023",
//   planType: "Individual Savings",
//   nextSavingsDate: "Jan 24, 2022",
//   debitCardNo: 2312,
//   debitCardType: "masterCard",
//   acct: "GTBANK-0217",
// });

// {/* <div className="form-review">
// <div className="form-header">
//   <div className="title">
//     <div className="plan-name">
//       <h4 className="me-2">
//         <b>{formData.groupName}</b>
//       </h4>
//       <span>
//         <img src={grpLeader} alt="member-icon" />
//         <b className="ms-2">by {formData.groupLeader}</b>
//       </span>
//     </div>
//     <div className="vertical"></div>
//     <div className="target">
//       <p style={{ fontSize: "20px", margin: "0 8px 12px 0" }}>Target</p>
//       <h2>
//         {formData.target && (
//           <p>
//             <b>&#8358;&nbsp;{formatNumber(formData.target)}</b>
//             <span className="lower"> / member</span>
//           </p>
//         )}
//       </h2>
//     </div>
//   </div>
//   <hr className="line" />
// </div>
// <div className="card-main">
//   <div className="card-row">
//     <div className="amt">
//       <p>Members</p>
//       <p>
//         <b>{formData.memberNo}</b>
//       </p>
//     </div>
//     <div>
//       <p>Frequency</p>
//       <p>
//         <b>{formData.frequencyValue}</b>
//       </p>
//     </div>
//   </div>
//   <div className="card-row">
//     <div className="start">
//       <p>Start Date</p>
//       <p>
//         <b>{formData.startDateString}</b>
//       </p>
//     </div>
//     <div className="end">
//       <p>Maturity Date</p>
//       <p>
//         <b>{formData.endDateString}</b>
//       </p>
//     </div>
//   </div>
//   <div className="card-row mb-2">
//     <div className="status">
//       <p>Lock Status</p>
//       <p>
//         <b>{formData.lockStatus}</b>
//       </p>
//     </div>
//   </div>

//   <hr className="line" />

//   <div className="card-row mb-2">
//     <div>
//       <p>Payment</p>
//     </div>
//     <div>
//       {formData.cardId ? (
//         <p className="d-flex flex-row">
//           <p className="me-4">Card Saved!</p>
//           <b
//             style={{
//               color: "#059157",
//               marginInlineStart: "1rem",
//               cursor: "pointer",
//             }}
//             onClick={() => setCurrentModal(4)}
//           >
//             Switch Card <RightIcon className="ms-2" />
//           </b>
//         </p>
//       ) : (
//         <p className="d-flex flex-row">
//           <p className="me-4">No card selected</p>
//           <b
//             style={{ color: "#059157", cursor: "pointer" }}
//             onClick={() => setCurrentModal(4)}
//           >
//             <AddIcon className="me-2" /> Add Card
//           </b>
//         </p>
//       )}
//     </div>
//   </div>
// </div>
// </div> */}

// {/* <div className="container col-md-10 mx-auto">
// {notifications.map((item) => (
//   <div>
//     {item.header === "Invite Link" ? (
//       <div>
//         <div
//           className="notif-row"
//           style={{
//             background: "rgba(207, 232, 222, 0.2)",
//             cursor: "pointer",
//           }}
//           onClick={() => func(5)}
//         >
//           <p className="notif-header">
//             <b>{item.header}</b>
//           </p>
//           <p className="notif-text">{item.text}</p>
//         </div>
//       </div>
//     ) : (
//       <div
//         className="notif-row"
//         style={
//           {
//             // background: `${
//             //   item.header === "Invite Link"
//             //     ? "rgba(207, 232, 222, 0.2)"
//             //     : "none"
//             // }`,
//           }
//         }
//       >
//         <p className="notif-header">
//           <b>{item.header}</b>
//         </p>
//         <p className="notif-text">{item.text}</p>
//       </div>
//     )}
//     <hr className="line" />
//   </div>
// ))}
// </div> */}

// for transaction report
// background-color: ${(index: number) => (index % 2 === 0 ? "#EFFEF1" : "inherit")};

// {
//   /* <div className="steps-action">
//               {current > 0 && (
//                 <Button style={{ margin: "0 8px" }} onClick={() => prev()} fontSize="16px">
//                   Previous
//                 </Button>
//               )}

//               {current < steps.length - 1 ? (
//                 <Button fontSize="16px" onClick={() => next()}>
//                   Next
//                 </Button>
//               ) : (
//                 <Button fontSize="16px" onClick={() => createCoopGroup()}>
//                   {isLoading ? <LoadingButton /> : "Create Plan"}
//                 </Button>
//               )}
//             </div> */
// }

// {/* <AdCarousel colour="#fff" sliderColour="#fff">
// <div>
//   <p>Total Savings</p>
//   <h2 className="my-0 savings">
//     <NairaIcon className="savingsIcon" />
//     <b>100,000</b>
//   </h2>
// </div>
// <div>
//   <p>Individual Savings</p>
//   <h2 className="my-0 savings">
//     <NairaIcon className="savingsIcon" />
//     <b>20,000</b>
//   </h2>
// </div>
// <div>
//   <p>Target Group Savings</p>
//   <h2 className="my-0 savings">
//     <NairaIcon className="savingsIcon" />
//     <b>50,000</b>
//   </h2>
// </div>
// <div>
//   <p>My Stash</p>
//   <h2 className="my-0 savings">
//     <NairaIcon className="savingsIcon" />
//     <b>{stashBalance}</b>
//   </h2>
// </div>
// </AdCarousel> */}

// const savingsData = [
//   {
//     status: "Active",
//     title: "Focus Group contribution",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//     // groupName: "Focus Group contribution",
//     members: [memberImg, memberImg, memberImg],
//   },
//   {
//     status: "Paused",
//     title: "Focus Group contribution",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//     // groupName: "Focus Group contribution",
//     members: [memberImg, memberImg, memberImg],
//   },
//   {
//     status: "Active",
//     title: "Focus Group contribution",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//     // groupName: "Focus Group contribution",
//     members: [memberImg, memberImg, memberImg],
//   },
//   {
//     status: "Paused",
//     title: "Focus Group contribution",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//     members: [memberImg, memberImg, memberImg],
//   },
// ];

// const [planData, setPlanData] = useState({
//   status: "Active",
//   title: "Focus Group Plan",
//   totalAmt: 50000,
//   cycleAmt: 300,
//   cycle: "monthly",
//   rate: 5.5,
//   achievedPercent: 70,
//   achievedAmt: 70000,
//   groupName: "Focus Group contribution",
//   // members: [memberImg, memberImg, memberImg],
//   members: [
//     {
//       email: "Johnboyega@gmail.com",
//       status: "Active",
//       maturityOrder: 1,
//       maturityDate: "Feb 22,2022",
//       collectionStatus: "Collected",
//     },
//     {
//       email: "Johnboyega@gmail.com",
//       status: "Active",
//       maturityOrder: 2,
//       maturityDate: "Feb 22,2022",
//       collectionStatus: "Collected",
//     },
//     {
//       email: "Johnboyega@gmail.com",
//       status: "Active",
//       maturityOrder: 3,
//       maturityDate: "Feb 22,2022",
//       collectionStatus: "Pending",
//     },
//     {
//       email: "Johnboyega@gmail.com",
//       status: "Active",
//       maturityOrder: 4,
//       maturityDate: "Feb 22,2022",
//       collectionStatus: "Pending",
//     },
//   ],
//   principal: 2000,
//   returns: 55.34,
//   startDate: "Jan 22, 2022",
//   maturityDate: "Jan 21, 2023",
//   nextCollectingMember: "John Boyega",
//   nextContributionDate: "Feb 22, 2022",
//   planType: "Cooperative Group Savings",
//   acct: "GTBANK-0217",
// });

// const { setShowNav } = useShowNav();

// useEffect(() => {
//   setShowNav(true);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

// const handleAcctChange = (e: ChangeEvent<HTMLInputElement>) => {
//   const value = e.target.value;
//   setPlanData({
//     ...planData,
//     acct: value,
//   });
// };

// const handleTotalAmtChange = (e: ChangeEvent<HTMLInputElement>) => {
//   const val = e.target.value;
//   setPlanData({
//     ...planData,
//     totalAmt: parseInt(val) + planData.totalAmt,
//   });
// };
// const handlePlanDataChange = (e: ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   setPlanData({
//     ...planData,
//     [name]: value,
//   });
// };

//   {/* <div className="header-row">
//   <div className="principal">
//     <p>Principal</p>
//     <p>
//       <b>&#8358; {formatNumber(planData.principal)}</b>
//     </p>
//   </div>
//   <div className="returns">
//     <p>Returns</p>
//     <p>
//       <b>&#8358; {formatNumber(planData.returns)}</b>
//     </p>
//   </div>
//   <div className="interest">
//     <p>Interest p.a.</p>
//     <p>
//       <b>{planData.rate}%</b>
//     </p>
//   </div>
// </div> */}

// const savingsData = [
//   {
//     status: "Active",
//     title: "House Rent",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//   },
//   {
//     status: "Paused",
//     title: "House Rent",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//   },
//   {
//     status: "Active",
//     title: "House Rent",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//   },
//   {
//     status: "Paused",
//     title: "House Rent",
//     totalAmt: 50000,
//     rate: 5,
//     achievedPercent: 70,
//     achievedAmt: 70000,
//   },
// ];

// import React, { ChangeEvent, KeyboardEvent, useState } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { Steps, DatePicker, Popover, message } from "antd";
// import moment from "moment";
// import { useForm } from "react-hook-form";
// import { ReactComponent as BackIcon } from "../assets/icons/back.svg";
// import { ReactComponent as RightIcon } from "../assets/icons/right.svg";
// import { ReactComponent as AddIcon } from "../assets/icons/plus-circle.svg";
// import { targetGroupSavings } from "../utils/routes";
// import Input from "./bits/InputText";
// import { Heading4, Label } from "./bits/Text";
// import ModalA from "./bits/ModalA";
// import Button from "./bits/Button";
// import ConfirmFormSubmit from "./ConfirmFormSubmit";
// import { formatNumber } from "../helpers/formatNumbers";
// import grpLeader from "../assets/img/grp-leader.png";
// import FormSubmit from "./FormSubmit";
// import SetPersonalFreq from "./SetPersonalFreq";
// import MyCards from "./MyCards";
// import SwitchCard from "./SwitchCard";
// import {
//   useAddTargetGroupMutation,
//   useSetTargetGroupFreqMutation,
// } from "../redux/services/transaction-service";
// import { frontend_url } from "../helpers/authHelper";
// import LoadingButton from "./bits/LoadingButton";
// // import { ReactComponent as CloseIcon } from "../assets/icons/close-icon.svg";

// type TarGrpSavingsFormProps = {
//   groupName: string;
//   groupLeader?: string;
//   groupDescription: string;
//   groupId: string;
//   target: number;
//   memberNo: number;
//   memberEmail: string;
//   startDate: moment.Moment | null;
//   startDateString?: string;
//   endDate: moment.Moment | null;
//   endDateString?: string;
//   // members?: number;
//   // payment?: string;
//   amount: number;
//   hourOfDay: number;
//   dayOfWeek: number;
//   dayOfMonth: number;
//   frequencyName: string;
//   frequencyValue: string;
//   automated?: string;
//   lockStatus?: string;
//   // acct?: string;
//   cardId: string;
// };

// const { Step } = Steps;

// const customDot = (dot: any, { status, index }: any) => (
//   <Popover
//   // content={
//   //   <span>
//   //     step {index} status: {status}
//   //   </span>
//   // }
//   >
//     {dot}
//   </Popover>
// );

// const TarGrpSavingsForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [current, setCurrent] = useState(0);
//   const [currentModal, setCurrentModal] = useState(0);
//   // const [showDetails, setShowDetails] = useState(false);
//   const [formData, setFormData] = useState<TarGrpSavingsFormProps>({
//     groupName: "",
//     groupLeader: "Babajide Chukwuka",
//     groupDescription: "",
//     groupId: "",
//     target: 0,
//     memberNo: 0,
//     memberEmail: "",
//     automated: "",
//     startDate: null,
//     startDateString: "",
//     endDate: null,
//     endDateString: "",
//     amount: 0,
//     hourOfDay: 0,
//     dayOfWeek: 0,
//     dayOfMonth: 0,
//     frequencyName: "",
//     frequencyValue: "flexible",
//     lockStatus: "Locked",
//     cardId: "",
//   });

//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     // reset,
//   } = useForm<any>();

//   const [tags, setTags] = useState<string[]>([""]);
//   const [addTargetGroup] = useAddTargetGroupMutation();
//   const [setTargetGroupFreq] = useSetTargetGroupFreqMutation();

//   // accepts the current date and returns a boolean
//   const blockTodaysDate = (currDate: moment.Moment) => {
//     return currDate && currDate < moment().endOf("day");
//   };

//   const blockTillStartDate = (currDate: moment.Moment) => {
//     return (formData.startDate && currDate.diff(formData.startDate) < 1) as boolean;
//   };

//   const handleFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFrequencyChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       frequencyName: name,
//       frequencyValue: value,
//     });
//   };

//   const handleHourChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFormData({
//       ...formData,
//       hourOfDay: parseInt(value),
//     });
//   };

//   const handleMonthDayChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setFormData({
//       ...formData,
//       dayOfMonth: parseInt(value),
//     });
//   };

//   const handleWeekdayChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // console.log(value);
//     // console.log(typeof value);
//     setFormData({
//       ...formData,
//       dayOfWeek: parseInt(value),
//     });
//   };

//   const handleStartDateChange = (date: any, dateString: any) => {
//     setFormData({
//       ...formData,
//       startDate: date,
//       startDateString: dateString,
//     });
//     // console.log(moment(formData.startDate).format("YYYY-MM-DD"));
//   };

//   const handleEndDateChange = (date: any, dateString: any) => {
//     setFormData({
//       ...formData,
//       endDate: date,
//       endDateString: dateString,
//     });
//   };

//   const handleAcctChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const memberEmails = tags.filter((tag) => tag !== "");

//   const removeTags = (indexToRemove: any) => {
//     setTags([...tags.filter((_, index) => index !== indexToRemove)]);
//   };

//   const addTags = (event: KeyboardEvent<HTMLInputElement>, memberEmails: string[]) => {
//     let { value } = event.target as HTMLInputElement;
//     // console.log(value);
//     if (value !== "" && memberEmails.length < formData.memberNo - 1) {
//       setTags([...tags, value]);
//       value = "";
//     }
//   };

//   const next = () => {
//     setCurrent(current + 1);
//   };

//   const prev = () => {
//     setCurrent(current - 1);
//   };

//   const createTarGrp = async (): Promise<void> => {
//     if (memberEmails.length < formData.memberNo - 1) {
//       message.error("Ensure to add all members before submitting.");
//     } else {
//       try {
//         setIsLoading(true);
//         const res: any = await addTargetGroup({
//           name: formData.groupName,
//           target_amount: formData.target,
//           no_of_participants: formData.memberNo,
//           description: formData.groupDescription ? formData.groupDescription : "null",
//           start_date: moment(formData.startDate).format("YYYY-MM-DD"),
//           end_date: moment(formData.endDate).format("YYYY-MM-DD"),
//           callback_url: `${frontend_url}`,
//           data: memberEmails,
//         });
//         // console.log(res, "myRes");
//         // console.log(res.error.data.message, "myRes");
//         if (res.error) {
//           message.error(res.error.data.message);
//           setIsLoading(false);
//         } else if (res.data.status === "success") {
//           message.success(res.data?.message);
//           setIsLoading(false);
//           setFormData({
//             ...formData,
//             groupId: res.data.data.id,
//           });
//           setCurrentModal(3);
//         } else {
//           message.error(res.data?.message);
//           setIsLoading(false);
//         }
//       } catch (error: any) {
//         message.error(error?.data?.message);
//         setIsLoading(false);
//       }
//     }
//   };

//   const joinGroup = async (): Promise<void> => {
//     try {
//       setIsLoading(true);
//       const res: any = await setTargetGroupFreq({
//         status: true,
//         target_group_saving_id: formData.groupId,
//         payment_auth: formData.cardId,
//         day_of_month: formData.dayOfMonth,
//         day_of_week: formData.dayOfWeek,
//         hour_of_day: formData.hourOfDay,
//         plan: formData.frequencyValue,
//         amount: formData.amount,
//       });
//       if (res.error) {
//         message.error(res.error.data.message);
//         setIsLoading(false);
//       } else if (res.data.status === "success") {
//         message.success(res.data?.message);
//         setIsLoading(false);
//         setCurrentModal(0);
//       } else {
//         message.error(res.data?.message);
//         setIsLoading(false);
//       }
//     } catch (error: any) {
//       message.error(error?.data?.message);
//       setIsLoading(false);
//     }
//   };

//   // if (res.data.status === "success") {
//   //   message.success(res.data?.message);
//   //   setIsLoading(false);
//   //   setCurrentModal(0);
//   // } else {
//   //   message.error(res.data?.message);
//   //   setIsLoading(false);
//   // }

//   const submit = (data: any, e: any) => {
//     e.preventDefault();
//     next();
//   };

//   const steps = [
//     {
//       // title: "First",
//       id: 1,
//       content: (
//         <form className="col-md-8 col-lg-6 my-4 form" onSubmit={handleSubmit(submit)}>
//           <div className="step-div">
//             <Label color="#33277B">Set a group title</Label>
//             <Input
//               type="text"
//               properties={{
//                 ...register("groupName", {
//                   required: "This field is required.",
//                   value: formData.groupName,
//                   onChange: (e: ChangeEvent<HTMLInputElement>) => handleFormDataChange(e),
//                 }),
//               }}
//               placeholder="Enter group name"
//             />
//             {errors.groupName && <p className="text-danger">{errors.groupName.message}</p>}
//             <p>Make sure to keep it simple and descriptive</p>
//           </div>

//           <div className="step-div">
//             <Label color="#33277B">Say more about your group (optional)</Label>
//             <Input
//               type="textarea"
//               placeholder="Say something about your group"
//               properties={{
//                 ...register("groupDescription", {
//                   value: formData.groupDescription,
//                   // minLength: 50,
//                   onChange: (e: ChangeEvent<HTMLInputElement>) => handleFormDataChange(e),
//                 }),
//               }}
//               height="fit-content"
//             />
//             {/* <p>Minimum of 50 characters</p> */}
//           </div>
//           <Button type="submit" fontSize="16px">
//             Next
//           </Button>
//         </form>
//       ),
//     },
//     {
//       // title: "Second",
//       id: 2,
//       content: (
//         <form className="col-md-8 col-lg-6 my-4" onSubmit={handleSubmit(submit)}>
//           <div className="step-div">
//             <Label color="#33277B">Set a saving target</Label>
//             <Input
//               type="number"
//               properties={{
//                 ...register("target", {
//                   required: "This field is required.",
//                   min: 1000,
//                   onChange: (e: ChangeEvent<HTMLInputElement>) => handleFormDataChange(e),
//                 }),
//               }}
//               placeholder="Amount"
//             />
//             {errors.target &&
//               (errors.target.type === "min" ? (
//                 <p className="text-danger">Target should not be less than &#8358;&nbsp;1000</p>
//               ) : (
//                 <p className="text-danger">{errors.target.message}</p>
//               ))}
//             {/* <Input
//               type="number"
//               placeholder="Enter your target"
//               name="target"
//               onChange={handleFormDataChange}
//               min={1000}
//               value={formData.target && formData.target > 0 ? formData.target : ""}
//               required
//             /> */}
//             <p>
//               This is the amount you think you would need to achieve your goal. <br /> It should be
//               a minimum of &#8358;1000.
//             </p>
//           </div>
//           <div className="step-div">
//             <Label color="#33277B">How many members are in the group?</Label>
//             <Input
//               type="number"
//               properties={{
//                 ...register("memberNo", {
//                   required: "This field is required.",
//                   min: 2,
//                   value: formData.memberNo && formData.memberNo > 0 ? formData.memberNo : "",
//                   onChange: (e: ChangeEvent<HTMLInputElement>) => handleFormDataChange(e),
//                 }),
//               }}
//               placeholder="No of people in the group"
//             />
//             {errors.memberNo &&
//               (errors.memberNo.type === "min" ? (
//                 <p className="text-danger">Members should not be less than 2</p>
//               ) : (
//                 <p className="text-danger">{errors.memberNo.message}</p>
//               ))}
//           </div>
//           <div className="steps-action">
//             <Button
//               style={{ margin: "0 8px" }}
//               type="notSubmit"
//               onClick={() => prev()}
//               fontSize="16px"
//             >
//               Previous
//             </Button>
//             <Button type="submit" fontSize="16px">
//               Next
//             </Button>
//           </div>
//         </form>
//       ),
//     },
//     {
//       // title: "Third",
//       id: 3,
//       content: (
//         <div className="col-md-8 col-lg-6 my-4">
//           <div className="step-div">
//             <Label color="#33277B">Set your saving cycle</Label>
//             <DatePicker
//               onChange={handleStartDateChange}
//               className="col-md-10 col-lg-8 date-picker"
//               placeholder="Start Date"
//               format={"MMM DD, YYYY"}
//               value={formData.startDate}
//               disabledDate={blockTodaysDate}
//             />
//             <DatePicker
//               onChange={handleEndDateChange}
//               className="col-md-10 col-lg-8 date-picker mt-4"
//               placeholder="End Date"
//               format={"MMM DD, YYYY"}
//               value={formData.endDate}
//               disabledDate={blockTillStartDate}
//             />
//           </div>

//           <div className="steps-action">
//             <Button
//               style={{ marginRight: "1rem" }}
//               type="notSubmit"
//               onClick={() => prev()}
//               fontSize="16px"
//             >
//               Previous
//             </Button>
//             <Button type="submit" fontSize="16px" onClick={() => setCurrentModal(1)}>
//               Next
//             </Button>
//           </div>
//         </div>
//       ),
//     },

//     {
//       // title: "Fourth",
//       id: 4,
//       content: (
//         <div className="col-md-8 col-lg-6 my-4">
//           <Heading4>Okay, let's review</Heading4>
//           <div className="form-review">
//             <div className="form-header">
//               <div className="title">
//                 <div className="plan-name">
//                   <h4 className="me-2">
//                     <b>{formData.groupName}</b>
//                   </h4>
//                   <span>
//                     <img src={grpLeader} alt="member-icon" />
//                     <b className="ms-2">by {formData.groupLeader}</b>
//                   </span>
//                 </div>
//                 <div className="vertical"></div>
//                 <div className="target">
//                   <p style={{ fontSize: "20px", margin: "0 8px 12px 0" }}>Target</p>
//                   <h2>
//                     {formData.target && (
//                       <p>
//                         <b>&#8358;&nbsp;{formatNumber(formData.target)}</b>
//                         <span className="lower"> / member</span>
//                       </p>
//                     )}
//                   </h2>
//                 </div>
//               </div>
//               <hr className="line" />
//             </div>
//             <div className="card-main">
//               <div className="card-row">
//                 <div className="amt">
//                   <p>Members</p>
//                   <p>
//                     <b>{formData.memberNo}</b>
//                   </p>
//                 </div>
//                 <div>
//                   <p>Frequency</p>
//                   <p>
//                     <b>{formData.frequencyValue}</b>
//                   </p>
//                 </div>
//               </div>
//               <div className="card-row">
//                 <div className="start">
//                   <p>Start Date</p>
//                   <p>
//                     <b>{formData.startDateString}</b>
//                   </p>
//                 </div>
//                 <div className="end">
//                   <p>Maturity Date</p>
//                   <p>
//                     <b>{formData.endDateString}</b>
//                   </p>
//                 </div>
//               </div>
//               <div className="card-row mb-2">
//                 <div className="status">
//                   <p>Lock Status</p>
//                   <p>
//                     <b>{formData.lockStatus}</b>
//                   </p>
//                 </div>
//                 {/* <div className="rate">
//                   <p>Interest Rate p.a.</p>
//                   <p>
//                     <b>{formData.rate}%</b>
//                   </p>
//                 </div> */}
//               </div>

//               <hr className="line" />

//               <div className="card-row mb-2">
//                 <div>
//                   <p>Payment</p>
//                 </div>
//                 <div>
//                   {formData.cardId ? (
//                     <p>
//                       {/* <b>{formData.cardId}</b> */}
//                       <b
//                         style={{
//                           color: "#059157",
//                           marginInlineStart: "1rem",
//                           cursor: "pointer",
//                         }}
//                         onClick={() => setCurrentModal(4)}
//                       >
//                         Switch Card <RightIcon className="ms-2" />
//                       </b>
//                     </p>
//                   ) : (
//                     <p className="d-flex flex-row">
//                       <p className="me-4">No card selected</p>
//                       <b
//                         style={{ color: "#059157", cursor: "pointer" }}
//                         onClick={() => setCurrentModal(4)}
//                       >
//                         <AddIcon className="me-2" /> Add Card
//                       </b>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="step-div mt-4">
//             <Label color="#33277B">Enter Email Addresses</Label>
//             {/* <p className="invite">Press Enter to add Multiple emails</p> */}
//             <div className="tags-input">
//               <ul id="tags">
//                 {memberEmails.map((tag, index: number) => (
//                   <li key={index} className="tag">
//                     <span className="tag-title">{tag}</span>
//                     <span className="tag-close-icon" onClick={() => removeTags(index)}>
//                       x
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//               {tags.length < formData.memberNo && (
//                 <input
//                   type="email"
//                   onKeyUp={(event: KeyboardEvent<HTMLInputElement>) =>
//                     event.key === "Enter" ? addTags(event, memberEmails) : null
//                   }
//                   placeholder="Press enter to add multiple emails"
//                 />
//               )}
//             </div>
//           </div>

//           <div className="steps-action">
//             <Button
//               style={{ marginRight: "1rem", minWidth: "150px" }}
//               type="notSubmit"
//               onClick={() => prev()}
//               fontSize="16px"
//             >
//               Previous
//             </Button>
//             <Button fontSize="16px" style={{ minWidth: "150px" }} onClick={() => createTarGrp()}>
//               {isLoading ? <LoadingButton /> : "Create Plan"}
//             </Button>
//           </div>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <TarGrpSavingsForm.Wrapper>
//         <div className="container">
//           <h2>Target Group Savings</h2>
//           <hr className="line" />
//           <Link to={`../${targetGroupSavings}`} style={{ textDecoration: "none" }} className="back">
//             <BackIcon />
//             <p>Back</p>
//           </Link>

//           <>
//             <Steps
//               current={current}
//               progressDot={customDot}
//               direction="horizontal"
//               responsive={false}
//               className="my-steps"
//             >
//               {steps.map((item, id) => (
//                 <Step key={id} />
//               ))}
//             </Steps>
//             <div className="steps-content">{steps[current].content}</div>
//             {/* <div className="steps-action">
//               {current > 0 && (
//                 <Button style={{ margin: "0 8px" }} onClick={() => prev()} fontSize="16px">
//                   Previous
//                 </Button>
//               )}

//               {current < steps.length - 2 ? (
//                 <Button fontSize="16px" onClick={() => next()}>
//                   Next
//                 </Button>
//               ) : current === steps.length - 1 ? (
//                 <Button fontSize="16px" onClick={() => createTarGrp()}>
//                   {isLoading ? <LoadingButton /> : "Create Plan"}
//                 </Button>
//               ) : (
//                 <Button fontSize="16px" type="primary" onClick={() => setCurrentModal(1)}>
//                   Next
//                 </Button>
//               )}
//             </div> */}
//           </>
//         </div>
//       </TarGrpSavingsForm.Wrapper>
//       <div>
//         {currentModal === 1 && (
//           <ModalA isShown={true} hide={() => {}}>
//             <ConfirmFormSubmit
//               endDateString={formData.endDateString || ""}
//               closeModal={() => setCurrentModal(0)}
//               confirm={() => next()}
//             />
//           </ModalA>
//         )}
//         {currentModal === 2 && (
//           <ModalA isShown={true} hide={() => {}}>
//             <FormSubmit pageUp={targetGroupSavings} />
//             {/* pass the submit function into this modal */}
//           </ModalA>
//         )}
//         {currentModal === 3 && (
//           <ModalA isShown={true} hide={() => {}}>
//             <SetPersonalFreq
//               closeModal={() => setCurrentModal(0)}
//               updFreq={handleFrequencyChange}
//               updAmt={handleFormDataChange}
//               updHour={handleHourChange}
//               updWeekday={handleWeekdayChange}
//               updMonthday={handleMonthDayChange}
//               freqValue={formData.frequencyValue || ""}
//               amt={formData.amount || 0}
//               func={setCurrentModal}
//               joinGroup={() => joinGroup()}
//               isLoading={isLoading}
//             />
//             {/* pass the submit function into this modal */}
//           </ModalA>
//         )}
//         {currentModal === 4 && (
//           <ModalA isShown={true} hide={() => {}}>
//             <SwitchCard
//               closeModal={() => setCurrentModal(0)}
//               addCardModal={() => setCurrentModal(5)}
//               updCard={handleAcctChange}
//             />
//           </ModalA>
//         )}
//         {currentModal === 5 && (
//           <ModalA isShown={true} hide={() => {}}>
//             <MyCards func={setCurrentModal} />
//           </ModalA>
//         )}
//       </div>
//     </>
//   );
// };

// TarGrpSavingsForm.Wrapper = styled.div`
//   .container {
//     padding: 2rem;
//     color: #33277b !important;
//     // font-size: 16px;
//     h2 {
//       font-weight: 600;
//       color: #33277b;
//     }

//     .line {
//       border: 1px solid rgba(0, 0, 0, 0.4);
//     }

//     .back {
//       display: flex;
//       color: #33277b;
//       align-items: center;
//       p {
//         margin: 0 0 0 1rem;
//       }
//       margin: 1rem 0;
//     }

//     .step-div {
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       margin-bottom: 2rem;
//     }

//     .date-picker {
//       // font-size: 16px;
//       //   line-height: 17px;
//       color: #7b7b7b;
//       padding: 1rem;
//       padding-left: 2rem;
//       border-radius: 1rem;
//       border: 1px solid #bec6df;
//     }

//     .row {
//       justify-content: space-between;
//     }

//     .form-review {
//       border: 1px solid rgba(0, 0, 0, 0.4);
//       box-sizing: border-box;
//       border-radius: 20px;
//       padding: 1rem 2rem;
//       cursor: pointer;
//       // font-size: 16px;
//       text-transform: capitalize;

//       p {
//         margin-bottom: 0.5rem;
//       }

//       .form-header {
//         h2,
//         h4,
//         h5 {
//           color: #33277b;
//         }

//         .title {
//           display: flex;
//           flex-direction: row;
//           justify-content: space-between;
//           .plan-name {
//             display: flex;
//             flex-direction: column;
//             justify-content: end;
//           }
//           .vertical {
//             border-right: 2px solid #33277b;
//           }

//           .target {
//             display: flex;
//             flex-direction: column;
//             justify-content: end;
//             margin-left: 1rem;
//             h2,
//             p {
//               margin-bottom: 0;
//             }
//             .lower {
//               text-transform: lowercase;
//               // font-size: 16px;
//             }
//           }
//         }
//         margin-bottom: 1rem;
//       }

//       .card-main {
//         display: flex;
//         flex-direction: column;
//         h2,
//         h5 {
//           color: #33277b;
//         }
//       }

//       .card-row {
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//         margin-bottom: 1rem;

//         div:nth-of-type(2) {
//           display: flex;
//           flex-direction: column;
//           align-items: end;
//         }
//       }
//     }

//     .tags-input {
//       display: flex;
//       align-items: flex-start;
//       flex-wrap: wrap;
//       min-height: 4.8rem;
//       width: 480px;
//       padding: 0 8px;
//       border: 1px solid rgb(214, 216, 218);
//       border-radius: 6px;
//       &:focus-within {
//         border: 1px solid #0052cc;
//       }
//       input {
//         flex: 1;
//         border: none;
//         height: 46px;
//         font-size: 14px;
//         padding: 4px 0 0 0;
//         width: 100%;
//         &:focus {
//           outline: transparent;
//         }
//       }

//       #tags {
//         display: flex;
//         flex-wrap: wrap;
//         padding: 0;
//         margin: 8px 0 0 0;

//         .tag {
//           width: auto;
//           height: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: #47486b;
//           padding: 0 3px;
//           font-size: 12px;
//           list-style: none;
//           border-radius: 6px;
//           margin: 0 5px 5px 0;
//           background: #e6ffea;
//           .tag-title {
//             margin-top: 3px;
//           }
//           .tag-close-icon {
//             display: block;
//             width: 16px;
//             height: 16px;
//             line-height: 16px;
//             text-align: center;
//             font-size: 14px;
//             margin-left: 8px;
//             color: green;
//             border-radius: 50%;
//             cursor: pointer;
//           }
//         }
//       }
//     }

//     .my-steps {
//       margin-left: 0;
//       margin: 2rem 0;
//     }

//     .ant-steps-icon-dot {
//       background-color: #059157 !important;
//     }

//     .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
//       background-color: #059157 !important;
//     }

//     @media screen and (max-width: 500px) {
//       padding: 1rem;
//     }
//   }
// `;

// export default TarGrpSavingsForm;
