import React, { useState, useEffect, useRef } from 'react'
import {
    View, Text,
    StyleSheet, SafeAreaView,
    ScrollView, Dimensions,
    Image, RefreshControl,
    Platform, StatusBar, Alert
} from 'react-native'
import {
    InfoCard, DialoguePopup,
    FloatingAddButton, CalanderView,
    InputField, InputFieldButton,
    Button_Fill, DashboardButton,
    DashboardButtonHolder, ErrorMessage,
    HeadingText, CustomHeader,
    LeaveDisplayBar, DateAddressRemarkStrip,
    DropDownList, VerticalSpacer,
    NameDesignationStrip, BirthdayNotification,
    LeaveOnToday, RequestResponceNOtification,
    TextButton, NameAndValueStrip,
    NameAndNumberLargeStrip, aspectRatio,
    Button_Outline, TimeListEditor,
    WorkLogStrip, Button_Text,
    PINInputField,

} from '../Components/ComponentLibrary.js'
import { POSTAPIRequest, GETAPIRequest, DELETEAPIRequest, POSTAPIRequest_Combiner } from '../BackendAPI.js'
import { ScreenStack } from 'react-native-screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { render } from 'react-dom';
import storeLib from '../Files/jsonFiles/storeLib.json';
import menuLookupLib from '../Files/jsonFiles/menuLookupLib.json';
import colorPallet from '../Files/jsonFiles/ColorPallet.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    SetUserName, GetUserID,
    GetUserName, UserDetails,
    SetUserPassword, GetAuthenticationDetails,
    ClearAunthetication, GetUserPassword
} from '../Authentication.js';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FlatList } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesome } from '@expo/vector-icons';
import { interpolate, Value } from 'react-native-reanimated'
import { useContext } from 'react/cjs/react.production.min'

const Tab = createBottomTabNavigator();

const screen = Dimensions.get("screen");
const widthFactor = screen.width * 0.0015;
const heightFactor = screen.height * 0.0015;


const GetDateWithSpacer = (date = new Date(), spacing, isDayNumber) => {
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let monthName = NumberToMonthName(monthIndex);
    let year = date.getFullYear();
    return `${isDayNumber ? day : NumberToDay(date.getDay(), true)}${spacing}${monthName}${spacing}${year}`;
}

const NumberToMonthName = (monthID) => {
    let monthNames = ["Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"];
    return monthNames[monthID];
}

const NumberToDay = (dayOfWeek, isPart) => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return isPart ? days[dayOfWeek].substr(0, 3) : days[dayOfWeek];
}

const GetValueOfKey = (obj, key) => {
    let keyList = Object.keys(obj);
    for (let index = 0; index < keyList.length; index++) {
        if (keyList[index] == key) {
            return Object.values(obj)[index];
        }
    }
}

const GetTimeStamp = () => {
    let nowData = new Date();
    let newConDatString = GetDateWithSpacer(nowData, " ", true);
    let newTimeCom = nowData.toLocaleTimeString();
    let conminedData = `${newConDatString} ${newTimeCom}`;
    return conminedData;
}

function MakeID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const ScreenContainer = ({ children, headervisible, headerContent }) => (
    <View style={{ width: '100%', height: '100%', backgroundColor: colorPallet.theme.default.accentColor2 }}>
        {
            <View style={{ width: '100%', height: 0 }}>
                <StatusBar style="light" />
            </View>
        }
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>

                <CustomHeader visible={headervisible == undefined || headervisible ? true : false}
                    leftElement={headerContent ? headerContent.leftElement : null}
                    centreElement={headerContent ? headerContent.centreElement : null}
                    rightElement={headerContent ? headerContent.rightElement : null}
                />
                {children}
            </View>
        </SafeAreaView>
    </View>

);

const ShortenText = (textString) => {
    if (textString) {
        textString = textString.replace(/(\r\n|\n|\r)/gm, "");
        return textString != null && textString.length > 0 ? textString.substring(0, 10) + (textString.length > 8 ? '...' : '') : 'NA';
    }
    else return "NA"
}

const BackButtonText = (navigation) => {
    return (
        <TextButton
            buttonText={"Back"}
            onPress={() => {
                navigation.pop();
            }}
        />
    );
}

const dashboardScaleIOS = (Platform.OS === 'ios' ? 2 : 1);

export const Dashboard_Screen = ({ navigation }) => {
    return (
        <Tab.Navigator
            tabBarOptions={
                {
                    style: {
                        backgroundColor: colorPallet.theme.default.secondaryDarkColor,
                        padding: 10,
                        height: aspectRatio * 100 * dashboardScaleIOS,
                    },
                    inactiveTintColor: colorPallet.theme.default.accentColor,
                    activeTintColor: 'white',
                    paddingBottom: 10,
                    labelStyle: {
                        fontSize: 18 * widthFactor,
                        marginBottom: aspectRatio * 10 * dashboardScaleIOS
                    },
                }
            }>
            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="information-outline" color={color} size={size * heightFactor * 0.8} />
                ),
            }}
                name="Info" component={Info_Screen} />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="menu" color={color} size={size * heightFactor * 0.8} />
                    ),
                }}
                name="Request" component={Request_Screen} />

            {
                storeLib.shiftSection === "true" ?
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="calendar-blank-outline" color={color} size={size * heightFactor * 0.8} />
                            ),
                        }}
                        name="Calendar" component={Calander_Screen} />
                    : <></>
            }
            {
                storeLib.payslipSection === "true" ?
                    <Tab.Screen
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="sticky-note-o" color={color} size={size * heightFactor * 0.8} />
                            ),
                        }}
                        name="Payslip" component={PayslipSheet_Screen} />
                    : <></>
            }
        </Tab.Navigator>


    );
}

export const PayslipSheet_Screen = ({ navigation }) => {

    const [InfoData, setInfoData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [monthSlipArray, setSetSlipArray] = useState(null);
    const [slipData, setSlipDataObject] = useState({});

    var Deductions = [1, 1, 1, 1, 1]

    const LoadSlip = (id) => {
        GETAPIRequest(`${storeLib.baseUrl}essapi/PaySlipApi/GetPayslipDetails`, ['PayrollID', id, 'EmployeeID', 'MVC01']).then(res => {
            setSlipDataObject(res);
            // console.log(res);
        }).catch(err => console.log(err));
    }

    const LoadPayslipData = () => {
        GETAPIRequest(`${storeLib.baseUrl}/essapi/PaySlipApi/GetMonthDetails`, ['EmployeeID', 'MVC01']).then(res => {
            setSetSlipArray(res);
            LoadSlip(res[res.length - 1].ID);
        }).catch(err => console.log(err));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        LoadPayslipData();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        /// console.log(storeLib.companyCode);
        if (InfoData == null) LoadPayslipData();
    }, [])


    return (
        <ScreenContainer>{
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={styles.scrollContainer}>
                <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '85%' }}>
                        <DropDownList
                            //  key={`${componentName.fieldName}${componentName.captionText}`}

                            selectedValue={monthSlipArray != undefined && monthSlipArray != null && monthSlipArray.length !== 0 ? monthSlipArray.length : 0}
                            // labelText={"componentName.captionText"}
                            dropItems={monthSlipArray}
                            setValueFunction={(itemValue, itemIndex) => {
                                console.log(itemValue + "-" + itemIndex);
                                LoadSlip(itemIndex);
                                //    newDynamicObject.recordState(itemValue);
                                //   console.log(itemValue + JSON.stringify(newDynamicObject));
                            }}
                        />

                    </View>
                </View>

                <InfoCard heading={`Earnings`}>
                    <View key={MakeID(8)}>
                        <View>{
                            //   console.log("tahe length : " + slipData.Earnings !== undefined ? slipData.Earnings.length : "wdad"),

                            slipData.Earnings != null ? slipData.Earnings.map((item, index) => {
                                return (
                                    <View style={{ backgroundColor: (index + 1) % 2 === 0 ? '#rgba(0,0,0, 0.05)' : '#rgba(0,0,0,0)' }} key={MakeID(8)}>
                                        <NameAndValueStrip valueName={item.name} value={"AED " + item.amount} />
                                    </View>);
                            }) : <NameAndValueStrip valueName="No Earnings" value={0} />

                        }
                        </View>
                    </View>
                </InfoCard>
                <InfoCard heading={`Deductions`}>
                    <View key={MakeID(8)}>
                        <View>{
                            //  console.log("tahe length : " + slipData.Deductions !== undefined ? slipData.Deductions.length : "wdad"),

                            slipData.Deductions != null && slipData.Deductions.length > 0 ? slipData.Deductions.map((item, index) => {
                                return (
                                    <View style={{ backgroundColor: (index + 1) % 2 === 0 ? '#rgba(0,0,0, 0.05)' : '#rgba(0,0,0,0)' }} key={MakeID(8)}>
                                        <NameAndValueStrip valueName={item.name} value={"AED " + item.amount} />
                                    </View>);
                            }) : <NameAndValueStrip valueName="No Deductions" value={0} />

                        }
                        </View>
                    </View>
                </InfoCard>
                <NameAndNumberLargeStrip color='white' title="Net Amount" value={slipData.Total + " Dhs"} valueString={slipData.AmountInWords} />

            </ScrollView>
        }
        </ScreenContainer>

    );
}

export const Info_Screen = ({ navigation }) => {

    const [InfoData, setInfoData] = useState(null)
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        /// console.log(storeLib.companyCode);
        if (InfoData == null) LoadInfoDisplayDetails();
    }, [])

    const LoadInfoDisplayDetails = () => {
        //http://essmodernvet.truebays.com/essapi/DashboardItemsApi/GetDashboardItems?LoginID=MVC01
        GETAPIRequest(`${storeLib.baseUrl}//essapi/DashboardItemsApi/GetDashboardItems/`,
            ["LoginID",
                GetUserID()
            ]).then(req => {
                //  setbuttonOptionArray(req);
                setInfoData(req);
                console.log(req);
            }).catch(err => {
                console.log(err);
            });
    }

    const SendData = () => {
        return (
            <TextButton
                buttonText={"Settings"}
                onPress={() => {
                    navigation.push("Settings")
                }}
            />
        );
    }

    const SendData_Old = () => {
        return (
            <TextButton
                buttonText={"Logout"}
                onPress={() => {
                    ClearAunthetication();
                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
                }}
            />
        );
    }

    const wait = timeout => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        LoadInfoDisplayDetails();
        wait(2000).then(() => setRefreshing(false));
    }, []);

    return (
        <ScreenContainer
            headerContent={
                {
                    leftElement: SendData()
                }
            }
        >{
                InfoData ?
                    <ScrollView
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        style={styles.scrollContainer}>
                        <VerticalSpacer height={20} />
                        <InfoCard heading={`Welcome`}>
                            <Text style={{ color: colorPallet.theme.default.accentColor2, fontSize: 23 * aspectRatio, fontWeight: "700" }}>{
                                "Welcome " + GetUserName()
                            }
                            </Text>
                        </InfoCard>

                        <InfoCard heading={`Birthday Notification`}>
                            {
                                <BirthdayNotification data={InfoData.BirthdayNotification} />
                            }
                        </InfoCard>

                        <InfoCard heading={`Request Response Notification`}>
                            {
                                <RequestResponceNOtification data={InfoData.RequestResponseNotification} />
                            }
                        </InfoCard>
                        <InfoCard heading={`Leave on Today`}>
                            {
                                <LeaveOnToday data={InfoData.LeaveOnToday} />
                            }
                        </InfoCard>

                        <InfoCard heading={`Leave Eligibility`}>
                            {
                                InfoData.LeaveEligibility.map((item, index) => {
                                    return (<LeaveDisplayBar
                                        key={MakeID(8)}
                                        leaveBalanceDays={parseInt(item.BalanceDays)}
                                        leaveTakenDays={parseInt(item.LeaveTaken)}
                                        leaveTypeName={item.Leave_Type}
                                        totalLeaveDays={parseInt(item.EligibleDays)} />);
                                })
                            }
                        </InfoCard>
                    </ScrollView>
                    : null
            }
        </ScreenContainer>
    );
}

export const Request_Screen = ({ navigation }) => {

    const [firstPageDisplay, setfirstPageDisplay] = useState(false);
    const [buttonOptionArray, setbuttonOptionArray] = useState([])

    useEffect(() => {

        if (!firstPageDisplay) {
            GETAPIRequest(`${storeLib.baseUrl}/essapi/CommonApi/ButtonList/`,
                ["LoginID",
                    GetUserID()
                ]).then(req => {
                    setbuttonOptionArray(req);
                    console.log(req);
                }).catch(err => {
                    console.log(err);
                });

            //   setfirstPageDisplay(true);
        }
    }, []);


    // this function gets called on button press


    const GetToSubSection = (typeID) => {
        // use type id 
        GETAPIRequest(`${storeLib.baseUrl}/essapi/CommonApi/`, ['companyCode', storeLib.companyCode, 'loginId', GetUserID()]).then(req => {
            navigation.push(
                GetValueOfKey(req, 'screenName'),
                {
                    targetTypeID: typeID,
                    sectionFormat: GetValueOfKey(req, pageFormat)
                }
            )


        }).catch(err => {
            console.log(err);
        });

    }

    const GetMenu = (array) => {
        return (
            array.map((item, index) =>
                index % 2 == 0 ? (
                    console.log(item),
                    <DashboardButtonHolder key={item.ID + index}>
                        <DashboardButton
                            itemRecord={array[index]}
                            iconName={array[index].IconName}
                            iconType={array[index].IconType}
                            bottonColor={'#999'}
                            title={array[index].Description}
                            onPress={() => {
                                navigation.push(
                                    "DynamicList",
                                    {
                                        targetTypeID: array[index].ID,
                                        sectionFormat: array[index].pageFormat
                                    }
                                )
                            }} />
                        {
                            array[index + 1] ?
                                <DashboardButton
                                    itemRecord={array[index + 1]}
                                    iconName={array[index + 1].IconName}
                                    iconType={array[index + 1].IconType}
                                    bottonColor={'#999'}
                                    title={array[index + 1].Description}
                                    onPress={() => {
                                        navigation.push("DynamicList",
                                            {
                                                targetTypeID: array[index + 1].ID,
                                                sectionFormat: array[index + 1].pageFormat
                                            }
                                        )
                                    }} /> : null
                        }
                    </DashboardButtonHolder>) : null
            )
        );
    }



    return (
        <ScreenContainer>
            <ScrollView style={styles.scrollContainer}>
                <VerticalSpacer height={20} />
                {
                    GetMenu(buttonOptionArray)
                }
            </ScrollView>
        </ScreenContainer>
    );
}

export const Calander_Screen = ({ navigation }) => {

    const [isAuthentication, setisAuthentication] = useState(false)
    const [Teams, setTeams] = useState({})
    const [timingsArray, settimingsArray] = useState([])

    const getDateINFormat = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:00:00`
    }

    useEffect(() => {
        console.log(storeLib.companyCode);
        let dateString = getDateINFormat(new Date());
        console.log("Date Selected : " + dateString);
        GetCalanderContent(dateString);
        GetEmployeeContent();
    }, [])

    const GetCalanderContent = (dateString) => {
        setisAuthentication(true)
        GETAPIRequest(`${storeLib.baseUrl}essapi/CalendarApi/GetCalendarDateDetails`, [
            'companyCode', storeLib.companyCode,
            'LoginID', "test",
            'Date', dateString
        ]).then(res => {
            //   console.log(res);
            settimingsArray(res.teamsTimings);
            setisAuthentication(false)
        }).catch(err => {
            console.log(err);
            setisAuthentication(false)
        });
    }

    const GetEmployeeContent = (dateString) => {
        setisAuthentication(true)
        GETAPIRequest(`${storeLib.baseUrl}essapi/CalendarApi/GetCalendarDetails`, [
            'companyCode', storeLib.companyCode,
            'LoginID', "test",
        ]).then(res => {
            //   console.log(res);
            setTeams(res.teams);
            setisAuthentication(false)
        }).catch(err => {
            console.log(err);
            setisAuthentication(false)
        });
    }

    return (
        <ScreenContainer headervisible={false}>{

            timingsArray ?
                <View style={{ width: '100%', height: '100%' }}>
                    {
                        <CalanderView
                            getListForThisDay={
                                (date) => GetCalanderContent(
                                    getDateINFormat(date)
                                )
                            }
                            timingData={timingsArray}
                            onRefresh={() => {
                                console.log("Refreshing...");
                            }}
                            onPressEvent={(teamName, teamID) => {
                                navigation.push("CalenderDetailView",
                                    {
                                        employees: GetValueOfKey(Teams, teamID).employees
                                    }
                                );

                            }}
                        />
                    }
                </View> :
                null
        }
            <Spinner
                visible={isAuthentication}
                textContent={'Loading...'}
            />
        </ScreenContainer>
    );
}

export const ClanderDetailsView_Screen = ({ navigation, route }) => {

    const displayArray = () => {
        console.log(JSON.stringify(route.params.employees));
    }

    return (
        displayArray(),
        <ScreenContainer
            headerContent={
                {
                    leftElement: Platform.OS == "ios" ? BackButtonText(navigation) : null
                }
            }
        >
            <View style={styles.miniContainer}>
                <View style={styles.horizontalPaddedContainer}>
                    <View style={styles.dataDisplayViewSection}>
                        {
                            <FlatList
                                style={{ height: '95%' }}
                                data={route.params.employees}
                                renderItem={({ item }, index) => {
                                    return (<NameDesignationStrip
                                        name={item.name}
                                        title={item.designation}
                                        location={item.location}
                                    />)
                                }}
                                keyExtractor={() => { return MakeID(4) }}
                            />
                        }
                    </View>
                </View>
            </View>
        </ScreenContainer >);
};

export const Register_Screen = ({ navigation }) => {

    const [isAuthentication, setisAuthentication] = useState(false)
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("")
    const [errorFound, seterrorFound] = useState(false)
    const [errorMessage, seterrorMessage] = useState("")
    const [messageColor, setmessageColor] = useState(1)
    const [companyID, setCompanyID] = useState(-1)
    const [companyNameList, setCompanyNameList] = useState([
        {
            Description: "Modern Veterinary Clinic",
            ID: 1
        },
        {
            Description: "MVC",
            ID: 2
        }
    ])

    useEffect(() => {
        GetCompanyNameList();
        return () => { }
    }, [])

    const ConvertFormat = (companyDataAttay) => {
        dataList = [];

        for (let index = 0; index < companyDataAttay.length; index++) {

            dataList.push({
                Description: companyDataAttay[index].CompanyName,
                ID: companyDataAttay[index].CompanyCode
            })
        }
        return dataList;
    }

    const GetCompanyNameList = () => {

        GETAPIRequest(`${storeLib.baseUrl}essapi/UserRegistrationApi/companyDetails/`,
            []).then(res => {
                setCompanyNameList(ConvertFormat(res));
                console.log(ConvertFormat(res));
            }).catch(err => console.log(err));

    }

    const GoToDashboard = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
    }

    return (
        <ScreenContainer headervisible={false}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ width: "100%", alignItems: 'center' }}>

                </View>

                <View style={styles.loginContainer}>
                    <View style={styles.horizontalPaddedContainer}>

                        <VerticalSpacer height={200 * aspectRatio} />
                        <InputField labelText={"Username"} onChangeText={(value) => setUserName(value)} />
                        <InputField labelText={"E-mail"} onChangeText={(value) => setUserEmail(value)} />
                        <InputField labelText={"Contact Number"} onChangeText={(value) => setUserEmail(value)} />
                        <DropDownList
                            //key={`${componentName.fieldName}${componentName.captionText}`}
                            selectedValue={null}
                            labelText={"Project ID"}
                            dropItems={companyNameList}
                            setValueFunction={(itemValue, itemIndex) => {
                                setCompanyID(itemIndex);
                                //    newDynamicObject.recordState(itemValue);
                                //   console.log(itemValue + JSON.stringify(newDynamicObject));
                            }}
                        />
                        <ErrorMessage visible={errorFound} msgType={messageColor} messageText={errorMessage} />
                        <Button_Fill label="Submit" onPress={
                            () => {
                                //navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
                                //    CheckAuthentication(userName, password);
                                //   setisAuthentication(true);
                            }
                        } />
                        <Button_Outline marginTop={10} label="Back to Login" onPress={
                            () => {
                                navigation.pop();
                            }
                        } />
                        <VerticalSpacer height={30 * heightFactor} />
                    </View>



                </View>

                <Spinner
                    visible={isAuthentication}
                    textContent={'Loading...'}
                />
            </ScrollView>
        </ScreenContainer>
    );

}

export const Settings_Screen = ({ navigation }) => {

    const [isAuthentication, setisAuthentication] = useState(false)

    return (
        <ScreenContainer headervisible={false}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ width: "100%", alignItems: 'center' }}>

                </View>
                {
                    <View style={styles.loginContainer}>
                        <View style={styles.horizontalPaddedContainer}>

                            <VerticalSpacer height={200 * aspectRatio} />
                            {

                            }

                            <Button_Fill label="Log-Out" onPress={
                                () => {
                                    ClearAunthetication();
                                    navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
                                }
                            } />
                            <Button_Fill marginTop={10} label="Change Password" onPress={
                                () => {
                                    navigation.push("ChangePassword");
                                }
                            } />

                            <Button_Outline marginTop={100} label="Back" onPress={
                                () => {
                                    navigation.pop();
                                }
                            } />
                            <VerticalSpacer height={30 * heightFactor} />
                        </View>
                    </View>
                }

                <Spinner
                    visible={isAuthentication}
                    textContent={'Loading...'}
                />
            </ScrollView>
        </ScreenContainer>
    );

}


export const ChangePassword_Screen = ({ navigation }) => {

    const [isAuthentication, setisAuthentication] = useState(false)
    const [errorFound, seterrorFound] = useState(false)
    const [errorMessage, seterrorMessage] = useState("")
    const [messageColor, setmessageColor] = useState(1)
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const ChangePasswordAPI = () => {
        POSTAPIRequest("POST", `${storeLib.baseUrl}essapi/ChangePasswordApi/ChangePassword/`,
            {
                LoginID: GetUserID(),
                OldPassword: currentPassword,
                NewPassword: newPassword,
                ConfirmPassword: confirmPassword
            })
            .then(res => {
                console.log(res)
                setisAuthentication(false)
                if (res == "Success") {
                    navigation.pop();
                    alert("Password Succesfully Changed")
                }
            })
            .catch(err => {
                console.log(err)
                setisAuthentication(false)
                seterrorFound(true);
                setmessageColor(0)
            });
    }



    const SetNewPassword = () => {

        if (currentPassword != GetUserPassword()) {
            seterrorFound(true);
            seterrorMessage("Please Enter Valid Current Password");
            setmessageColor(0)
            console.log(GetUserPassword());
        }
        else if (newPassword.length < 8) {
            seterrorFound(true);
            seterrorMessage("Password must have 8 characters");
            setmessageColor(1)
        }
        else if (newPassword != confirmPassword) {
            seterrorFound(true);
            seterrorMessage("Password and Confirm doesn't match");
            setmessageColor(1)
        }
        else {
            setisAuthentication(true);
            ChangePasswordAPI();
            seterrorMessage("Please Wait.");
            setmessageColor(2)
        }
    }

    return (
        <ScreenContainer headervisible={false}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ width: "100%", alignItems: 'center' }}>

                </View>
                {
                    <View style={styles.loginContainer}>
                        <View style={styles.horizontalPaddedContainer}>

                            <VerticalSpacer height={200 * aspectRatio} />
                            {

                            }

                            <View>
                                <InputField labelText={"Current Password"} onChangeText={(value) => setCurrentPassword(value)} />
                                <InputField labelText={"New Password"} onChangeText={(value) => setNewPassword(value)} />
                                <InputField labelText={"Confirm Password"} onChangeText={(value) => setConfirmPassword(value)} />
                                <ErrorMessage visible={errorFound} msgType={messageColor} messageText={errorMessage} />
                                <Button_Fill label="Confirm" onPress={
                                    () => {
                                        SetNewPassword();
                                    }
                                } />
                            </View>


                            <Button_Outline marginTop={10} label="Back" onPress={
                                () => {
                                    navigation.pop();
                                }
                            } />
                            <VerticalSpacer height={30 * heightFactor} />
                        </View>
                    </View>
                }

                <Spinner
                    visible={isAuthentication}
                    textContent={'Loading...'}
                />
            </ScrollView>
        </ScreenContainer>
    );

}


export const ForgotPassword_Screen = ({ navigation }) => {

    const [isAuthentication, setisAuthentication] = useState(false)
    const [errorFound, seterrorFound] = useState(false)
    const [errorMessage, seterrorMessage] = useState("")
    const [messageColor, setmessageColor] = useState(1)
    const [screenState, setScreenState] = useState("enterDetails")
    const [UserEmail, setUserEmail] = useState()

    /*
    useEffect(() => {
        GetCompanyNameList();
        return () => { }
    }, [])

    const ConvertFormat = (companyDataAttay) => {
        dataList = [];

        for (let index = 0; index < companyDataAttay.length; index++) {
            
            dataList.push({
                Description:companyDataAttay[index].CompanyName,
                ID: companyDataAttay[index].CompanyCode
            })
        }
        return dataList;
    }

    const GetCompanyNameList = () => {

        GETAPIRequest(`${storeLib.baseUrl}essapi/UserRegistrationApi/companyDetails/`, 
        []).then( res => {
            setCompanyNameList(ConvertFormat(res));
            console.log(ConvertFormat(res));
        }).catch(err => console.log(err));

    }

    const GoToDashboard = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
    }

    */

    const SendPasswordResetEmail = () => {
        POSTAPIRequest("POST", `${storeLib.baseUrl}essapi/ForgotPasswordApi/ForgotPassword`,
            {
                data: {
                    email: UserEmail
                }
            })
            .then(res => {
                console.log(res)
                switch (res) {
                    case "Not registered user.":
                        setisAuthentication(false);
                        setmessageColor(1);
                        seterrorFound(true);
                        seterrorMessage("Not registered email id");
                        break;

                    case "Successfully sent email.":
                        setisAuthentication(false);
                        navigation.pop();
                        break;

                    default:
                        setisAuthentication(false);
                        break;
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <ScreenContainer headervisible={false}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ width: "100%", alignItems: 'center' }}>

                </View>
                {
                    <View style={styles.loginContainer}>
                        <View style={styles.horizontalPaddedContainer}>

                            <VerticalSpacer height={200 * aspectRatio} />
                            {
                                screenState == "enterDetails" ?
                                    <View>
                                        <InputField labelText={"E-mail"} onChangeText={(value) => setUserEmail(value)} />
                                        <ErrorMessage visible={errorFound} msgType={messageColor} messageText={errorMessage} />
                                        <Button_Fill label="Submit" onPress={
                                            () => {
                                                setisAuthentication(true);
                                                SendPasswordResetEmail();
                                                // setScreenState("enterPin");
                                                //navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
                                                //    CheckAuthentication(userName, password);
                                                //   setisAuthentication(true);
                                            }
                                        } />
                                    </View> :
                                    screenState == "enterPin" ?
                                        <View>
                                            <PINInputField numSize={5} labelText={"PIN"} onChangeText={(value) => setUserEmail(value)} />
                                            <Button_Text marginTop={1} label="Re-send PIN?" onPress={
                                                () => {
                                                    alert("new PIN send to your email")
                                                    //navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
                                                    //    CheckAuthentication(userName, password);
                                                    //   setisAuthentication(true);
                                                }
                                            } />
                                            <Button_Fill label="Submit" onPress={
                                                () => {
                                                    setScreenState("enterNewPassword");
                                                    //navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
                                                    //    CheckAuthentication(userName, password);
                                                    //   setisAuthentication(true);
                                                }
                                            } />
                                        </View> :
                                        screenState == "enterNewPassword" ?
                                            <View>
                                                <InputField labelText={"New Password"} onChangeText={(value) => setUserEmail(value)} />
                                                <InputField labelText={"Confirm Password"} onChangeText={(value) => setUserEmail(value)} />
                                                <ErrorMessage visible={errorFound} msgType={messageColor} messageText={errorMessage} />
                                                <Button_Fill label="Submit" onPress={
                                                    () => {
                                                        //navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
                                                        //    CheckAuthentication(userName, password);
                                                        //   setisAuthentication(true);
                                                    }
                                                } />
                                            </View> : <></>

                            }

                            <Button_Outline marginTop={10} label="Back to Login" onPress={
                                () => {
                                    navigation.pop();
                                }
                            } />
                            <VerticalSpacer height={30 * heightFactor} />
                        </View>
                    </View>
                }

                <Spinner
                    visible={isAuthentication}
                    textContent={'Loading...'}
                />
            </ScrollView>
        </ScreenContainer>
    );

}

export const Login_Screen = ({ navigation }) => {

    const [isAuthentication, setisAuthentication] = useState(false)
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("")
    const [errorFound, seterrorFound] = useState(false)
    const [errorMessage, seterrorMessage] = useState("")
    const [messageColor, setmessageColor] = useState(1)

    useEffect(() => {
        GetAuthenticationDetails().then((res) => {
            //   console.log(res);
            if (res) {
                GoToDashboard();
            }
        })

        return () => { }
    }, [])

    const CheckAuthentication = (userID, password) => {
        POSTAPIRequest("POST", `${storeLib.baseUrl}essapi/LoginAuthenticationApi/`, { userID: userID, Password: password })
            .then(
                res => {
                    console.log(res);
                    res.UserFullName ?
                        (
                            UserDetails(res),
                            SetUserName(res.UserFullName, userID),
                            SetUserPassword(password),
                            GoToDashboard(),
                            setmessageColor(2),
                            seterrorMessage("Access Granted.")
                        )
                        : (
                            setisAuthentication(false),
                            new Exception("No such user found.")
                        )
                }
            ).catch(
                err => {
                    console.log(err)
                    seterrorFound(true);
                    setmessageColor(0);
                    seterrorMessage("please enter correct credentials.");
                    setisAuthentication(false);
                }
            )
    }

    const GoToDashboard = () => {
        navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
    }

    return (
        <ScreenContainer headervisible={false}>
            <ScrollView style={styles.scrollContainer}>
                <View style={{ width: "100%", alignItems: 'center' }}>

                </View>

                <View style={styles.loginContainer}>
                    <View style={styles.horizontalPaddedContainer}>

                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '40%' }}>
                            {

                                circleSize = widthFactor * 400,
                                <View>
                                    <View style={
                                        {
                                            width: circleSize,
                                            height: circleSize * 0.35,
                                            backgroundColor: colorPallet.theme.default.secondaryColor,
                                            borderRadius: circleSize * 0.05,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                        <Image
                                            style={{ width: 300 * widthFactor, height: widthFactor * 76 }}
                                            source={require('../assets/customAssets/TrueBays.png')}
                                        />
                                    </View>
                                    <View>
                                        <HeadingText title={"Employee Self Service App"} />
                                    </View>
                                </View>

                            }
                        </View>
                        <VerticalSpacer height={20 * heightFactor} />
                        <InputField labelText={"Username"} onChangeText={(value) => setUserName(value)} />
                        <InputField labelText={"Password"} onChangeText={(value) => setPassword(value)} secureText={true} />
                        <ErrorMessage visible={errorFound} msgType={messageColor} messageText={errorMessage} />
                        <Button_Text marginTop={1} label="Forgot Password?" onPress={
                            () => {
                                navigation.push(
                                    "ForgotPassword");
                                //navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
                                //    CheckAuthentication(userName, password);
                                //   setisAuthentication(true);
                            }
                        } />
                        <Button_Fill label="Sign in" onPress={
                            () => {
                                CheckAuthentication(userName, password);
                                setisAuthentication(true);
                            }
                        } />
                        {
                            storeLib.registration === "true" ?
                                <Button_Outline marginTop={10} label="Register" onPress={
                                    () => {
                                        navigation.push(
                                            "RegisterScreen");
                                        //   navigation.reset({ index: 0, routes: [{ name: 'RegisterScreen' }] })
                                    }
                                } /> : null
                        }
                        <VerticalSpacer height={30 * aspectRatio} />
                        <Text style={{ fontSize: 10, color: colorPallet.theme.default.subTextColor, textAlign: 'center' }}>
                            © 2021 TrueBays IT Software Trading LLC All Rights Reserved.</Text>
                        <VerticalSpacer height={30 * aspectRatio} />
                    </View>



                </View>

                <Spinner
                    visible={isAuthentication}
                    textContent={'Loading...'}
                />
            </ScrollView>
        </ScreenContainer>
    );
}

export const TimeSheetAddEdit_Screen = ({ navigation, route }) => {

    const [timeSelect, setTimeSelect] = useState(false)
    const [timeSlotName, setTimeSlotName] = useState("")
    const [startTimeState, setStartTime] = useState("")
    const [endTimeState, setEndTime] = useState("")
    const [descriptionState, setDescription] = useState(null)
    const [projIDState, setProjID] = useState(null)
    const [taskCategoryIDState, setTaskCategoryID] = useState(null)

    const [dropListState, setDropListState] = useState(null)
    const [screenDisplayState, setScreenDisplayState] = useState(false)

    useEffect(() => {
        if (route.params.edit) {
            setStartTime(route.params.arrayObject[route.params.objectIndex].startTime)
            setEndTime(route.params.arrayObject[route.params.objectIndex].endTime)
            setDescription(route.params.arrayObject[route.params.objectIndex].description)
            setProjID(route.params.arrayObject[route.params.objectIndex].projID)
            setTaskCategoryID(route.params.arrayObject[route.params.objectIndex].taskCategoryID)
        } else {
            setStartTime("00:00:00")
            setEndTime("00:00:00")
            setDescription("")
            setProjID("Select")
            setTaskCategoryID("Select")
        }
        GetDropDownData();

    }, [])

    //essfloridahc.truebays.com/?companyCode=001

    const FindObjectWithID = (id, arrayList) => {
        for (let index = 0; index < arrayList.length; index++) {
            if (arrayList[index].ID == id) {
                return arrayList[index];
            }
        }
        return { ID: -1, Description: "Select Item" }
    }

    const GetDropDownData = () => {
        GETAPIRequest(`${storeLib.baseUrl}essapi/ListDataApi/DropdownList`, [
            'companyCode', storeLib.companyCode
        ]).then(res => {
            setDropListState(res);
            setScreenDisplayState(true);
            console.log(res);
        }).catch(err => {
            console.log(err);

        });
    }

    const getTimeDiff = (startTime, endTime) => {

        let [sh, sm] = startTime.split(":");
        let [eh, em] = endTime.split(":");

        let startDate = new Date();
        startDate.setHours(sh);
        startDate.setMinutes(sm);

        let endDate = new Date();
        endDate.setHours(eh);
        endDate.setMinutes(em);
        let diffSec = (endDate.getTime() - startDate.getTime()) / 1000;
        let diffMin = diffSec / 60;
        let diffHrs = diffMin / 60;
        let hrs = parseInt(diffHrs);
        let mins = (diffHrs - hrs) * 60;
        console.log(`${hrs}:${parseInt(mins)}:00`);
        return "00:00:00"
    }

    return (

        <ScreenContainer headervisible={false}>
            {
                screenDisplayState ?
                    <ScrollView style={styles.scrollContainer}>

                        <View style={styles.loginContainer}>
                            <View style={styles.horizontalPaddedContainer}>
                                <VerticalSpacer height={20 * heightFactor} />
                                <InputFieldButton
                                    labelText={"Start Time"}
                                    value={startTimeState}
                                    onPress={() => {
                                        setTimeSelect(true);
                                        setTimeSlotName("start");
                                        //    setSelectedTime(newDynamicObject);

                                    }}
                                />
                                <InputFieldButton
                                    labelText={"End Time"}
                                    value={endTimeState}
                                    onPress={() => {
                                        setTimeSelect(true);
                                        setTimeSlotName("end");
                                        // setSelectedTime(newDynamicObject);
                                    }}
                                />
                                {
                                    descriptionState !== null ?
                                        <InputField
                                            defaultValue={descriptionState}
                                            updateValue={(value) => {
                                                setDescription(value);
                                                if (route.params.edit) route.params.arrayObject[route.params.objectIndex].description = value;
                                            }}
                                            data={"newDynamicObject"}
                                            value={null}
                                            multiline={true} numberOfLines={4}
                                            labelText={"Description"} /> : null
                                }

                                <DropDownList
                                    //key={`${componentName.fieldName}${componentName.captionText}`}
                                    selectedValue={FindObjectWithID(projIDState, dropListState.projectList).Description}
                                    labelText={"Project ID"}
                                    dropItems={dropListState.projectList}
                                    setValueFunction={(itemValue, itemIndex) => {
                                        setProjID(itemIndex);
                                        //    newDynamicObject.recordState(itemValue);
                                        //   console.log(itemValue + JSON.stringify(newDynamicObject));
                                    }}
                                />

                                <DropDownList
                                    //key={`${componentName.fieldName}${componentName.captionText}`}
                                    selectedValue={FindObjectWithID(taskCategoryIDState, dropListState.taskCategoryList).Description}
                                    labelText={"Task Type"}
                                    dropItems={dropListState.taskCategoryList}
                                    setValueFunction={(itemValue, itemIndex) => {
                                        setTaskCategoryID(itemIndex);
                                        //    newDynamicObject.recordState(itemValue);
                                        //   console.log(itemValue + JSON.stringify(newDynamicObject));
                                    }}
                                />

                                <Button_Fill label="Done" onPress={
                                    () => {
                                        if (!route.params.edit) {
                                            route.params.arrayObject != null ?
                                                route.params.arrayObject.push(
                                                    {
                                                        startTime: startTimeState,
                                                        endTime: endTimeState,
                                                        description: descriptionState,
                                                        id: -1,
                                                        slno: route.params.arrayObject.length + 1,
                                                        taskHours: getTimeDiff(startTimeState, endTimeState),
                                                        projID: projIDState,
                                                        taskCategoryID: taskCategoryIDState
                                                    }
                                                ) : route.params.arrayObject = [
                                                    {
                                                        startTime: startTimeState,
                                                        endTime: endTimeState,
                                                        description: descriptionState,
                                                        id: -1,
                                                        slno: 1,
                                                        taskHours: getTimeDiff(startTimeState, endTimeState),
                                                        projID: projIDState,
                                                        taskCategoryID: taskCategoryIDState
                                                    }
                                                ];
                                            console.log(route.params.arrayObject);
                                        }
                                        else {
                                            route.params.arrayObject[route.params.objectIndex].taskHours = getTimeDiff(startTimeState, endTimeState)
                                            route.params.arrayObject[route.params.objectIndex].projID = projIDState;
                                            route.params.arrayObject[route.params.objectIndex].taskCategoryID = taskCategoryIDState;
                                            route.params.arrayObject[route.params.objectIndex].startTime = startTimeState;
                                            route.params.arrayObject[route.params.objectIndex].endTime = endTimeState;
                                        }

                                        navigation.pop()

                                        //    CheckAuthentication(userName, password);
                                        //    setisAuthentication(true);

                                    }
                                } />
                            </View>
                        </View>

                        <View>{
                            timeSelect ?
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date()}
                                    mode={"time"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={(evet, time = null) => {
                                        setTimeSelect(false);
                                        if (evet.type === 'set') {
                                            let hourText = time.getHours();
                                            let minuteText = time.getMinutes();
                                            let combinedTime = `${hourText}:${minuteText}:00`;

                                            //setselectedTime(timeOut => timeOut.paramValue = combinedTime);

                                            switch (timeSlotName) {
                                                case "start":
                                                    if (route.params.edit) route.params.arrayObject[route.params.objectIndex].startTime = combinedTime;
                                                    setStartTime(combinedTime);
                                                    break;

                                                case "end":
                                                    if (route.params.edit) route.params.arrayObject[route.params.objectIndex].endTime = combinedTime;
                                                    setEndTime(combinedTime);
                                                    break;

                                                default:
                                                    break;
                                            }
                                            //settimeSheetValue(route.params.arrayObject[route.params.objectIndex]);
                                            console.log(route.params.arrayObject);
                                            // this.forc
                                        }
                                    }}
                                /> : null


                        }</View>

                    </ScrollView> : null
            }
        </ScreenContainer>
    )

}

export const DataListDisplay_Screen = ({ navigation, route }) => {

    const [displaySpinner, setDisplaySpinner] = useState(false)
    const [rerender, setrerender] = useState(true)
    const [deletePopup, setdeletePopup] = useState(false)
    const [recordArray, setRecordArray] = useState([])
    const [statusArray, setApplicationStatus] = useState([])
    const [currentDeleteItem, setcurrentDeleteItem] = useState(null)


    useEffect(() => {

        //  console.log(`${storeLib.baseUrl}${JSON.stringify(route.params)}`);

        const unsubscribe = navigation.addListener('focus', () => {
            FetchAllRecords();
            setDisplaySpinner(true);
        });

        return () => {
            unsubscribe;
            setrerender(true);
        }
    }, [])

    const FetchAllRecords = () => {
        setRecordArray([]);

        GETAPIRequest(`${storeLib.baseUrl}${route.params.sectionFormat.listDisplayUrl}`, [
            'companyCode', storeLib.companyCode,
            'loginId', GetUserID(),
            'type', route.params.targetTypeID
        ])
            .then(res => {
                //    console.log(res);
                setRecordArray(res.Data);
                setApplicationStatus(res.StatusList);
                setrerender(false);
                setDisplaySpinner(false);
            })
            .catch(err => {
                console.log(err);
                setDisplaySpinner(false);
            })
    }

    const DeleteItemFromList = () => {
        setDisplaySpinner(true);
        setdeletePopup(!deletePopup);
        //     console.log(currentDeleteItem);

        DELETEAPIRequest(`${storeLib.baseUrl}${route.params.sectionFormat.deleteUrl}`, [
            'companyCode', storeLib.companyCode,
            'LoginID', GetUserID(),
            'id', currentDeleteItem.id,
            'type', route.params.targetTypeID
        ])
            .then(res => {
                //    console.log(res);
                setRecordArray(res);
                FetchAllRecords();
            })
            .catch(err => console.log(err))


    }

    const RequestListItems = ({ item }, pageData) => {
        //   console.log(pageData.listFieldType);

        switch (pageData.listFieldType) {
            case "DateAddressRemarkStrip":
                return (

                    <DateAddressRemarkStrip
                        label={
                            ShortenText(GetValueOfKey(item, GetValueOfKey(menuLookupLib.NotSoDynamic, route.params.targetTypeID).recordDataKeys.titleKey))
                        }
                        subNote={
                            GetValueOfKey(item, GetValueOfKey(menuLookupLib.NotSoDynamic, route.params.targetTypeID).recordDataKeys.subNoteKey)
                        }
                        date={
                            GetDateWithSpacer(new Date(GetValueOfKey(item, GetValueOfKey(menuLookupLib.NotSoDynamic, route.params.targetTypeID).recordDataKeys.dateKey)), " ", true)
                        }
                        onDeletePress={() => {
                            setdeletePopup(!deletePopup);
                            setcurrentDeleteItem(item);
                        }}

                        fileStatus={
                            statusArray
                        }

                        rplyStatus={
                            item?.ReplyData?.rplyStatus
                        }
                        onEditPress={() => {
                            navigation.push('DynamicAddEdit',
                                {
                                    targetTypeID: route.params.targetTypeID,
                                    pageFormat: route.params.sectionFormat,
                                    edit: true,
                                    data:
                                    {
                                        item: item
                                    }
                                })
                        }}
                    />
                )

            case "WorkLogStrip":
                return (
                    <WorkLogStrip
                        label={
                            ShortenText(GetValueOfKey(item, GetValueOfKey(menuLookupLib.NotSoDynamic, route.params.targetTypeID).recordDataKeys.titleKey))
                        }
                        subNote={
                            GetValueOfKey(item, GetValueOfKey(menuLookupLib.NotSoDynamic, route.params.targetTypeID).recordDataKeys.subNoteKey)
                        }
                        date={
                            GetDateWithSpacer(new Date(GetValueOfKey(item, GetValueOfKey(menuLookupLib.NotSoDynamic, route.params.targetTypeID).recordDataKeys.dateKey)), " ", true)
                        }
                        onDeletePress={() => {
                            setdeletePopup(!deletePopup);
                            setcurrentDeleteItem(item);
                        }}

                        fileStatus={
                            statusArray
                        }
                        rplyStatus={
                            item
                        }
                        onEditPress={() => {
                            navigation.push('DynamicAddEdit',
                                {
                                    targetTypeID: route.params.targetTypeID,
                                    pageFormat: route.params.sectionFormat,
                                    edit: true,
                                    data:
                                    {
                                        item: item
                                    }
                                })
                        }}
                    />
                )

            default:
                break;
        }
    }

    return (
        <ScreenContainer
            headerContent={
                {
                    leftElement: Platform.OS == "ios" ? BackButtonText(navigation) : null
                }
            }
        >
            <View style={styles.miniContainer}>
                <View style={styles.horizontalPaddedContainer}>
                    <View style={styles.dataDisplayViewSection}>
                        {
                            <FlatList
                                style={{ height: '95%' }}
                                data={recordArray}
                                renderItem={(item, index) => {
                                    return (RequestListItems(item, route.params.sectionFormat))
                                }}
                                keyExtractor={() => { return MakeID(4) }}
                            />
                        }
                    </View>
                </View>
            </View>
            <FloatingAddButton onPress={() => {
                navigation.push('DynamicAddEdit',
                    {
                        screenName: 'DynamicAddEdit',
                        subject: 'Remarks',
                        targetTypeID: route.params.targetTypeID,
                        pageFormat: route.params.sectionFormat,
                        edit: false
                    })
            }} />
            <DialoguePopup
                onPressCancel={() =>
                    setdeletePopup(!deletePopup)
                }
                onPressOk={() =>
                    DeleteItemFromList()}
                getOut={() =>
                    setdeletePopup(!deletePopup)}
                visible={deletePopup} />
            <Spinner
                visible={displaySpinner}
                textContent={'Loading...'}
            />
        </ScreenContainer>
    );
}

export const DynamicAddEdit_Screen = ({ navigation, route }) => {

    const [ShowDateStart, setShowDateStart] = useState(new Date())
    const [submitFormat, setsubmitFormat] = useState("POST")
    const [dateEdit, setdateEdit] = useState(false)
    const [timeEdit, settimeEdit] = useState(false)

    const [requestID, setrequestID] = useState(-1)

    const [dynamicDataHolder, setdynamicDataHolder] = useState([])

    const [selectedDate, setselectedDate] = useState(null)
    const [selectedTime, setselectedTime] = useState(null)

    const [deletePopup, setdeletePopup] = useState(false)
    const [selectedTimeSlotData, setSelectedTimeSlotData] = useState(null)

    const [test, setTest] = useState()

    const holderArray = [];

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setTest(Math.random())

        });


        let indexRecord = 0;
        route.params?.pageFormat.subPage[0].dynamicElements.map((item, index) => {
            //   console.log(route.params?.pageFormat.subPage[0]);
            GetComponent(item, index);
            indexRecord = index;
        }
        );
        GetComponent({
            fieldName: "submitButton",
            captionText: "Submit"
        }, indexRecord + 1)

        setdynamicDataHolder(holderArray);

        if (route.params.edit) {
            setrequestID(100);
            //  console.log(route.params.data.item.id);
        }


        return (() => {
            unsubscribe;
            setTest(Math.random());
            setdynamicDataHolder([]);
            console.log("Clean - up");
            setTest();
        });
    }, []);


    const onButtonClick = () => {
        SendDataToServer();
    };

    const DeleteItemFromList = (data) => {
        console.log(data);
        if (data.index == 0) data.arrayData.shift();
        else data.arrayData.splice(data.index);

    }

    const SendDataToServer = () => {

        let neoSendDataFormat = {
            "data": {
                "companyCode": storeLib.companyCode.toString(),
                "type": route.params.targetTypeID,
                "id": route.params.edit ? route.params.data.item.id : -1,
                "LoginID": GetUserID().toString(),
                "createdBy": GetUserID().toString(),
                "timeStamp": GetTimeStamp().toString(),
            }
        };

        for (let i = 0; i < holderArray.length - 1; i++) {
            neoSendDataFormat.data[`${holderArray[i].parameterKeyName}`] = holderArray[i].paramValue;
        }
        neoSendDataFormat.data[`mode`] = route.params.edit != null && route.params.edit ? "Edit" : "New";

        POSTAPIRequest(submitFormat, `${storeLib.baseUrl}${route.params.pageFormat.saveUrl}`, neoSendDataFormat)
            .then(res => console.log(res))
            .catch(err => console.log(err));

        console.log(`${storeLib.baseUrl}${route.params.pageFormat.saveUrl}`);

        navigation.pop();
    }

    //------------------------------------------

    class OutPutArrayObject {

        isEditable = false;
        parameterKeyName = null;
        paramValue = null;
        paramType = '';
        index = -1;
        recordState = (value) => { this.paramValue = value };
        renderObject = () => { };

    }
    //------------------------------------------------------------------

    const GetComponent = (componentName, index) => {

        //  console.log(componentName);

        let newDynamicObject = new OutPutArrayObject();
        newDynamicObject.index = index;
        newDynamicObject.parameterKeyName = componentName.objectParameterKey;
        let defaultValue = null;


        if (route.params.edit) {

            defaultValue = GetValueOfKey(route.params.data.item, newDynamicObject.parameterKeyName);
            defaultValue = componentName.fieldName == "DateBox" ? GetDateWithSpacer(new Date(defaultValue), " ", true) : defaultValue
            console.log(defaultValue);
            newDynamicObject.recordState(defaultValue);

        }
        else {
            /*
            console.log("On ADD...");
            componentName.fieldName !== "TimeSheet" ?

                defaultValue = [
                    {
                        startTime: '00:00:00',
                        endDate: '00:00:00',
                        description: 'test'
                    }]

                : null;
                    */
        }

        switch (componentName.fieldName) {
            case "DateBox":
                newDynamicObject.renderObject = () => {
                    return (
                        <InputFieldButton
                            key={`${componentName.fieldName}${componentName.captionText}`}
                            value={newDynamicObject.paramValue}
                            labelText={componentName.captionText}
                            onPress={() => {
                                setdateEdit(true);
                                setselectedDate(newDynamicObject);
                            }
                            } />
                    )
                }
                break;

            case "Time":
                newDynamicObject.renderObject = () => {
                    return (
                        <InputFieldButton
                            key={`${componentName.fieldName}${componentName.captionText}`}
                            value={newDynamicObject.paramValue}
                            labelText={componentName.captionText}
                            onPress={() => {
                                settimeEdit(true);
                                setselectedTime(newDynamicObject);
                            }
                            } />
                    )
                }
                break;

            case "TimeSheet":
                newDynamicObject.renderObject = () => {

                    console.log("On Edit...");
                    if (!route.params.edit && newDynamicObject.paramValue == null) {
                        newDynamicObject.recordState([])
                    };

                    return (

                        <TimeListEditor
                            key={`${componentName.fieldName}${componentName.captionText}`}
                            value={newDynamicObject.paramValue}
                            labelText={componentName.captionText}
                            onPress={() => {
                                settimeEdit(true);
                                setselectedTime(newDynamicObject);
                            }}
                            onAddPress={(arrayObject) => {
                                navigation.push('TimeSheetScreen',
                                    {
                                        edit: false,
                                        arrayObject: arrayObject,
                                        objectIndex: 0
                                    })
                            }}
                            onEditPress={(objectIndex, arrayObject) => {
                                navigation.push('TimeSheetScreen',
                                    {
                                        edit: true,
                                        arrayObject: arrayObject,
                                        objectIndex: objectIndex
                                    })
                            }

                            }
                            onDeletePress={(objectIndex, arrayObject) => {
                                setdeletePopup(!deletePopup);
                                setSelectedTimeSlotData({ index: objectIndex, arrayData: arrayObject })
                            }
                            }
                        />
                    )
                }
                break;

            case "DropDown":
                newDynamicObject.renderObject = () => {
                    return (
                        <DropDownList
                            key={`${componentName.fieldName}${componentName.captionText}`}
                            selectedValue={newDynamicObject.paramValue}
                            labelText={componentName.captionText}
                            dropItems={componentName.options}
                            setValueFunction={(itemValue, itemIndex) => {
                                newDynamicObject.recordState(itemValue);
                                console.log(itemValue + JSON.stringify(newDynamicObject));
                            }}
                        />
                    )
                }
                break;

            case "textField":
                newDynamicObject.renderObject = () => {
                    return (
                        <InputField
                            key={`${componentName.fieldName}${componentName.captionText}`}
                            defaultValue={defaultValue}
                            updateValue={(value) => newDynamicObject.recordState(value)}
                            data={newDynamicObject}
                            value={null}
                            multiline={false} numberOfLines={4}
                            labelText={componentName.captionText} />
                    )
                }
                break;

            case "TextArea":
                newDynamicObject.renderObject = () => {
                    return (
                        <InputField
                            key={`${componentName.fieldName}${componentName.captionText}`}
                            defaultValue={defaultValue}
                            updateValue={(value) => newDynamicObject.recordState(value)}
                            data={newDynamicObject}
                            value={null}
                            multiline={true} numberOfLines={4}
                            labelText={componentName.captionText} />
                    )
                }
                break;

            case "submitButton":
                newDynamicObject.renderObject = () => {
                    return (
                        <Button_Fill
                            key={`${componentName.fieldName}${componentName.captionText}${test}`}
                            label={componentName.captionText}
                            onPress={
                                () => {
                                    onButtonClick();
                                }}
                        />
                    )
                }
                break;

            default:
                break;
        }
        holderArray.push(newDynamicObject);
    }

    return (
        <ScreenContainer
            headerContent={
                {
                    leftElement: Platform.OS == "ios" ? BackButtonText(navigation) : null
                }
            }
        >
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.miniContainer}>
                    <HeadingText title={route.params.edit ? route.params?.pageFormat.subPage[0].editPageName : route.params?.pageFormat.subPage[0].addPageName} />
                    {
                        <View style={styles.horizontalPaddedContainer}>
                            {
                                dynamicDataHolder?.map(item => {
                                    return item ? item?.renderObject() : null;
                                })
                            }
                        </View>
                    }
                </View>

                <View>{
                    dateEdit ?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={ShowDateStart}
                            mode={"date"}
                            is24Hour={true}
                            display="default"
                            onChange={(evet, date = null) => {
                                setdateEdit(false);
                                if (evet.type === 'set') {
                                    let thisDate = date || ShowDateStart;
                                    let dayString = thisDate.getDate();
                                    let monthString = thisDate.getMonth();
                                    let yearString = thisDate.getFullYear();
                                    setselectedDate(dataOut => dataOut.paramValue = `${dayString} ${NumberToMonthName(monthString)} ${yearString}`);
                                    console.log(selectedDate);
                                }
                            }}
                        /> : null
                }</View>

                <View>{
                    timeEdit ?
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={ShowDateStart}
                            mode={"time"}
                            is24Hour={true}
                            display="default"
                            onChange={(evet, time = null) => {
                                settimeEdit(false);
                                if (evet.type === 'set') {

                                    let hourText = time.getHours();
                                    let minuteText = time.getMinutes();
                                    let combinedTime = `${hourText} : ${minuteText}`;

                                    setselectedTime(timeOut => timeOut.paramValue = combinedTime);

                                }
                            }}
                        /> : null


                }</View>
            </ScrollView>
            <DialoguePopup
                onPressCancel={() =>
                    setdeletePopup(!deletePopup)
                }
                onPressOk={() => {
                    DeleteItemFromList(selectedTimeSlotData)
                    setdeletePopup(!deletePopup)
                }}

                getOut={() =>
                    setdeletePopup(!deletePopup)}
                visible={deletePopup} />
        </ScreenContainer>
    );
}

export const RequestForLeave_Screen = ({ navigation }) => (
    <ScreenContainer>
        <Text>RequestForLeave</Text>
    </ScreenContainer>
);
//#endregion
const styles = StyleSheet.create({

    container: {
        flex: 1,

        //  justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorPallet.theme.default.primaryColor
    },
    safeContainer: {
        flex: 1,
    },
    scrollContainer: {
        width: '100%',
    },
    loginContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
    },
    header: {
        width: '100%',
        height: '100%'
    },
    headingText: {
        fontSize: 20,
    },
    miniContainer: {
        alignItems: "center",
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalPaddedContainer: {
        width: '80%',
    },
    buttonWrapper: {
        marginVertical: 5,
    },
    button_neutral: {
        width: 200,
        marginVertical: 2
    },
    dataListContainer: {
        backgroundColor: 'red',
        width: '95%',
        height: '50%'
    },
    dataListTitleContainer: {
        height: '10%',
        backgroundColor: 'black',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    dataListTitle: {
        backgroundColor: 'white',
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    dataDisplayViewSection: {
        width: '100%',
    },
    dataDisplayStrip: {
        width: '100%',
        height: 80,
        backgroundColor: 'white',
        marginVertical: 5
    },
    textInputField: {
        width: '80%', height: 40, borderColor: 'gray', borderWidth: 1
    }
});