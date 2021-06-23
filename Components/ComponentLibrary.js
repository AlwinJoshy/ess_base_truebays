import React from 'react';
import {
    StyleSheet, Text,
    View, TextInput,
    TouchableOpacity, StatusBar,
    Dimensions, RefreshControl,
    Modal
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/MaterialIcons'
import Icon4 from 'react-native-vector-icons/FontAwesome5'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import Icon6 from 'react-native-vector-icons/Entypo'
import Icon7 from 'react-native-vector-icons/MaterialCommunityIcons'
import WeekView from 'react-native-week-view';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
import { Picker as DropList } from '@react-native-picker/picker';
import colorPallet from '../Files/jsonFiles/ColorPallet.json';
import { render } from 'react-dom';
import { ScrollView } from 'react-native-gesture-handler';

const screen = Dimensions.get("screen");
const widthFactor = screen.width * 0.0015;
const heightFactor = screen.height * 0.0015;
export const aspectRatio = (screen.width / screen.height);

const onButtonPressed = () => {
    console.log();
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

export class NameAndNumberLargeStrip extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={NameAndNumberLargeStrip_Style.mainContainer}>
                <View style={NameAndNumberLargeStrip_Style.innerContentHolder}>
                    <Text style={[{ color: this.props.color }, NameAndNumberLargeStrip_Style.nameText]}>{this.props.title}</Text>
                    <View style={{ width: '100%', height: 2, backgroundColor: this.props.color }} ></View>
                    <Text style={[{ color: this.props.color }, NameAndNumberLargeStrip_Style.valueText]}>{this.props.value}</Text>
                    <Text style={[{ color: this.props.color }, NameAndNumberLargeStrip_Style.valueStringText]}>{this.props.valueString}</Text>
                </View>
            </View>
        )
    }
}

const NameAndNumberLargeStrip_Style = StyleSheet.create({
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10
    },
    innerContentHolder: {
        width: '90%',
        paddingHorizontal: 10
    },
    dividerLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#bbb'
    },
    headingText: {
        fontSize: 22 * aspectRatio,
        paddingVertical: 5,
        fontWeight: "700"
    },
    innerContainer: {
        paddingVertical: 5
        // minHeight: 50
    },
    componentStyle: {
        marginVertical: 5,
    },
    nameText: {
        marginVertical: 5,
        fontSize: 30 * aspectRatio
    },
    valueText: {
        marginTop: 10,
        fontSize: 50 * aspectRatio,
    },
    valueStringText: {
        marginVertical: 0,
        fontSize: 30 * aspectRatio,
    }
});

export class NameAndValueStrip extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingVertical:3}}>
                <Text style={NameAndValueStrip_Style.nameText}>{this.props.valueName}</Text>
                <Text style={NameAndValueStrip_Style.valueText}>{this.props.value}</Text>
            </View>
        )
    }
}

const NameAndValueStrip_Style = StyleSheet.create({
    componentStyle: {
        marginVertical: 5,
    },
    nameText: {
        fontSize: 25 * aspectRatio
    },
    valueText: {
        fontSize: 25 * aspectRatio,
    }
})

export class TextButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <TouchableOpacity style={{ backgroundColor: colorPallet.theme.default.accentColor, paddingVertical: 2, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => this.props.onPress()}>
                <Text style={{ color: colorPallet.theme.default.buttonTextColor, fontWeight: "700" }}>
                    {
                        this.props.buttonText
                    }
                </Text>
            </TouchableOpacity>
        )
    }
}

export class RequestResponceNOtification extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <View key={MakeID(8)} >
                <View>{
                    this.props.data.map((item, index) => {
                        return (
                            <View style={{ backgroundColor: (index + 1) % 2 === 0 ? '#rgba(0,0,0, 0.05)' : '#rgba(0,0,0,0)' }} key={`${item.Description}${item.Remarks}${item.ID}`}>
                                <View style={{ marginVertical: 5 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 23 * aspectRatio }}>
                                            Description :
                                    </Text>
                                        <Text style={{ fontSize: 23 * aspectRatio }}>{
                                            ` ${item.Description}`
                                        }
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 23 * aspectRatio }}>
                                            Status :
                                    </Text>
                                        <Text style={{ fontSize: 23 * aspectRatio, fontWeight: "700", color: colorPallet.theme.default.accentColor2 }}>{
                                            ` ${item.Remarks}`
                                        }
                                        </Text>
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 23 * aspectRatio }}>
                                            ReqID# :
                                    </Text>
                                        <Text style={{ fontSize: 23 * aspectRatio }}>{
                                            ` ${item.ID}`
                                        }
                                        </Text>
                                    </View>

                                </View>


                                <View>{
                                    /*
                                    index < this.props.data.length - 1 ?
                                        <View style={{ height: 1, width: '100%', backgroundColor: '#rgba(0,0,0, 0.2)' }}></View> : null
                                    */
                                }
                                </View>
                            </View>
                        );
                    })
                }
                </View>
            </View>
        );
    }

}

export class LeaveOnToday extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <View key={MakeID(8)}>
                <View>{
                    this.props.data.map((item, index) => {
                        return (
                            <View style={{ backgroundColor: (index + 1) % 2 === 0 ? '#rgba(0,0,0, 0.05)' : '#rgba(0,0,0,0)' }} key={MakeID(8)}>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 23 * aspectRatio }}>
                                        Employee Name :
                                    </Text>
                                    <Text style={{ fontSize: 23 * aspectRatio, fontWeight: "700", color: colorPallet.theme.default.accentColor2 }}>{
                                        ` ${item.EmployeeName}`
                                    }
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 23 * aspectRatio }}>
                                        Leave Type :
                                    </Text>
                                    <Text style={{ fontSize: 23 * aspectRatio, fontWeight: "700", color: colorPallet.theme.default.accentColor2 }}>{
                                        ` ${item.LeaveType}`
                                    }
                                    </Text>
                                </View>


                                {
                                    index < this.props.data.length - 1 ?
                                        <View style={{ height: 1, width: '100%', backgroundColor: '#rgba(0,0,0, 0.2)' }}></View> : null
                                }

                            </View>
                        );
                    })
                }
                </View>
            </View>
        );
    }

}

export class BirthdayNotification extends React.Component {

    constructor() {
        super();
    }

    render() {

        const GetBirtDay = (bdDate) => {
            let dateContent = bdDate.split('-');

            let dateString = dateContent[0].toString();

            console.log(dateString);

            switch (dateString) {
                case "1":
                    dateString += "st"
                    break;

                case "2":
                    dateString += "nd"
                    break;

                case "3":
                    dateString += "rd"
                    break;

                default:
                    dateString += "th"
                    break;
            }
            dateString += " ";

            dateString += dateContent[1];

            return dateString;

        }

        return (
            <View key={MakeID(8)}>
                <View>{
                    this.props.data.map((item, index) => {
                        return (
                            <View style={{ backgroundColor: (index + 1) % 2 === 0 ? '#rgba(0,0,0, 0.05)' : '#rgba(0,0,0,0)' }} key={`${item.Description}${item.Remarks}${item.ID}`}>
                                <View style={{ marginVertical: 5 }} key={`${item.DOB}${index}${item.EmployeeName}`}>
                                    <Text style={{ fontSize: 23 * aspectRatio }}>{
                                        `${item.EmployeeName}'s birthday on`
                                    }
                                    </Text>

                                    <Text style={{ fontSize: 23 * aspectRatio, fontWeight: "700", color: colorPallet.theme.default.accentColor2 }}>{
                                        GetBirtDay(item.DOB)
                                    }
                                    </Text>

                                    {
                                        /*
                                        index < this.props.data.length - 1 ?
                                            <View style={{ height: 1, width: '100%', backgroundColor: 'gray' }}></View> : null
                                        */
                                    }

                                </View>
                            </View>
                        );
                    })
                }
                </View>
            </View>
        );
    }

}

export class CalanderView extends React.Component {

    constructor() {
        super();
        this.state = {
            currentData: new Date(),
            displayArray: [],
            thisDate: new Date()
        }

    }

    render() {

        const convertTime12to24 = (timeinTwelve) => {
            if (timeinTwelve == undefined) return "00:00"
            const [time, modifier] = timeinTwelve.split(' ');

            let [hours, minutes] = time.split(':');

            if (hours === '12') {
                hours = '00';
            }

            if (modifier === 'PM') {
                hours = parseInt(hours, 10) + 12;
            }

            return `${hours}:${minutes}`;
        }

        const SortArrayByTime = (messyArray) => {

            if (messyArray == undefined) return [];

            let foundDisorder = true;

            while (foundDisorder) {
                foundDisorder = false;
                for (let i = 0; i < messyArray.length - 1; i++) {
                    let currentElement = messyArray[i];
                    let nextElement = messyArray[i + 1];

                    let currentElementStartTimeDate = new Date();
                    let currentTimeFormat = convertTime12to24(currentElement.StartTime).split(':');
                    currentElementStartTimeDate.setHours(currentTimeFormat[0], currentTimeFormat[1]);

                    let nextElementStartTimeDate = new Date();
                    let nextTimeFormat = convertTime12to24(nextElement.StartTime).split(':');
                    nextElementStartTimeDate.setHours(nextTimeFormat[0], nextTimeFormat[1]);

                    if (currentElementStartTimeDate > nextElementStartTimeDate) {
                        let temp = messyArray[i + 1];
                        messyArray[i + 1] = messyArray[i];
                        messyArray[i] = temp;
                        foundDisorder = true;
                    }
                }
            }
            return messyArray;
        }

        const DayEventRow = (item) => {
            return (
                <View
                    key={MakeID(5)}
                    style={{
                        width: '85%',
                        flexDirection: 'row',
                        marginTop: 10
                    }}>
                    {
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <View style={{ marginVertical: 10, width: '19%' }}>
                                <Text style={{ fontSize: 20 * aspectRatio, color: colorPallet.theme.default.subTextColor, fontWeight: "700" }}>{
                                    //   formatAMPM(item.startTime)
                                    item.StartTime
                                }</Text>
                                <Text style={{ fontSize: 20 * aspectRatio, color: colorPallet.theme.default.subTextColor }}>{
                                    //  formatAMPM(item.endTime)
                                    item.EndTime
                                }</Text>
                            </View>

                            <TouchableOpacity style={
                                {
                                    width: '75%',
                                    height: '70%',
                                    backgroundColor: colorPallet.theme.default.accentColor,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    shadowColor: colorPallet.theme.default.shadowColor,
                                    shadowOpacity: parseFloat(colorPallet.theme.default.shadowOpacity),
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 10,
                                    elevation: parseInt(colorPallet.theme.default.shadowElevation),
                                }
                            }
                                onPress={() => this.props.onPressEvent(item.Subject, item.ID)}
                            >
                                <Text style={{ fontSize: colorPallet.theme.default.buttonTextSize * aspectRatio * 0.7, color: colorPallet.theme.default.buttonTextColor, fontWeight: "700" }}>
                                    {
                                        item.Subject
                                    }
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            )
        };

        const formatAMPM = (date) => {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

        //this.displayCurrentDateItems(new Date())

        return (
            <View style={{ flex: 1 }}>
                <Agenda
                    theme={{
                        backgroundColor: colorPallet.theme.default.primaryColor,
                        calendarBackground: colorPallet.theme.default.secondaryDarkColor,
                        textSectionTitleColor: '#fff',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: colorPallet.theme.default.accentColor,
                        selectedDayTextColor: colorPallet.theme.default.buttonTextColor,
                        todayTextColor: colorPallet.theme.default.accentColor,
                        dayTextColor: colorPallet.theme.default.subTextColor,
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: colorPallet.theme.default.headingTextColor,
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 20 * aspectRatio,
                        textMonthFontSize: 23 * aspectRatio,
                        textDayHeaderFontSize: 20 * aspectRatio
                    }}

                    onDayPress={(day) => {
                        //  this.displayCurrentDateItems(new Date(day.dateString))
                        this.props.getListForThisDay(new Date(day.dateString))
                    }}
                    renderEmptyData={
                        (data) => {
                            return (
                                <ScrollView style={{ width: '100%' }} onRefresh={() => this.props.onRefresh()}>
                                    <View style={{ width: '100%', alignItems: 'center' }}>

                                        {
                                            SortArrayByTime(this.props.timingData).map((item) => {
                                                return (DayEventRow(item))
                                            })
                                        }
                                    </View>
                                </ScrollView>
                            )
                        }
                    }
                />
            </View>
        );
    }
}

export class VerticalSpacer extends React.Component {

    constructor() {
        super();
        this.state = null
    }

    render() {
        return (
            <View style={{ width: '100%', height: heightFactor * this.props.height }}>
            </View>
        )
    }
}

export class DropDownList extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        this.setState({
            value: this.props.selectedValue,
            showLeaveTypeModal: false
        })
    }

    onValueChange =
        (itemValue, itemIndex) => {
            this.props.setValueFunction(itemValue, itemIndex);
            this.setState({
                value: itemValue
            });
        }

    render() {
        return (
            <View style={InputField_Style.componentStyle}>
                <Text style={DropDownList_Style.labelText}>{this.props.labelText}</Text>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            showLeaveTypeModal: true
                        })
                    }}
                    style={DropDownList_Style.dropDownContainer}>

                    <Text style={DropDownList_Style.displayText}>{this.state.value == '' || !this.state.value || this.state.value == null ? "Select One" : this.state.value}</Text>
                    <Icon1
                        name="caretdown"
                        size={15 * heightFactor}
                        color={colorPallet.theme.default.iconColor} />
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showLeaveTypeModal}
                    onRequestClose={() => {
                        this.setState({
                            showLeaveTypeModal: false
                        });
                    }}
                >
                    <View style={DropDownList_Style.modelContainer}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                showLeaveTypeModal: false
                            });
                        }} style={DropDownList_Style.modelInnerContainer}>
                            {
                                this.props.dropItems !== null ? this.props.dropItems.map((item, index) => {
                                    return (
                                        <Dropwown_Button
                                            key={`${item.Description}${item.ID}${index}`}
                                            label={item.Description}
                                            value={item.ID}
                                            onValueChange={this.onValueChange}
                                            onPress={
                                                () => {
                                                    console.log("Button Pressed");
                                                    this.onValueChange(item.Description, item.ID);
                                                    this.setState({
                                                        showLeaveTypeModal: false
                                                    });
                                                }
                                            }

                                        />

                                    )
                                })
                                : null
                            }
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View >
        );
    }
}

const DropDownList_Style = StyleSheet.create({
    componentStyle: {
        marginVertical: 5,

    },
    labelText: {
        fontSize: colorPallet.theme.default.labelTextSize * aspectRatio,
        color: colorPallet.theme.default.labelTextColor,
        marginBottom: 5,
        fontWeight: "700"
    },
    displayText: {
        fontSize: colorPallet.theme.default.buttonTextSize * aspectRatio,
        color: colorPallet.theme.default.buttonTextColor,
        fontWeight: "700"
    },
    modelContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    modelInnerContainer: {
        justifyContent: 'center',
        width: '85%',
        height: '100%',
    },
    dropDownContainer: {
        backgroundColor: colorPallet.theme.default.secondaryColor,
        borderRadius: 10,
        paddingHorizontal: 20,
        width: '100%',
        height: 35 * heightFactor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dropDown: {
        color: colorPallet.theme.default.buttonTextColor,
        fontSize: 17,
        marginTop: 10
    }
})

export class LeaveDisplayBar extends React.Component {

    constructor() {
        super();
        this.state = null;
    }

    render() {
        return (
            <View style={LeaveDisplayBar_Style.mainContainer}>
                <View style={LeaveDisplayBar_Style.descriptionTitle}>
                    <Text style={LeaveDisplayBar_Style.descriptionTitleText}>{`${this.props.leaveTypeName} - Eligiblity days : ${this.props.totalLeaveDays}`}</Text>
                </View>
                <View style={LeaveDisplayBar_Style.barContainer}>
                    <View style={[LeaveDisplayBar_Style.barFillBar, { width: `${(this.props.leaveTakenDays / this.props.totalLeaveDays) * 100}%` }]} />
                </View>
                <View style={LeaveDisplayBar_Style.meaningContainer}>
                    <View style={LeaveDisplayBar_Style.leaveDaysTakenMarker} />
                    <Text style={LeaveDisplayBar_Style.markerLabel}>{`Leave Taken - ${this.props.leaveTakenDays}`}</Text>

                    <View style={LeaveDisplayBar_Style.leaveDaysRemainingMarker} />
                    <Text style={LeaveDisplayBar_Style.markerLabel}>{`Balance Days - ${this.props.leaveBalanceDays}`}</Text>
                </View>
            </View>
        );
    }
}

const LeaveDisplayBar_Style = StyleSheet.create({
    mainContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    descriptionTitle: {
        width: '100%',
        paddingBottom: 5
    },
    descriptionTitleText: {
        fontSize: 20 * aspectRatio,
        fontWeight: "500"
    },
    barContainer: {
        width: '100%',
        height: 10,
        backgroundColor: colorPallet.theme.default.leaveAvilableColor,
        borderRadius: 5
    },
    barFillBar: {
        backgroundColor: colorPallet.theme.default.leaveUsedColor,
        height: '100%',
        width: '50%',
        borderRadius: 5
    },
    meaningContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 3
    },
    leaveDaysTakenMarker: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colorPallet.theme.default.leaveUsedColor,
    },
    leaveDaysRemainingMarker: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colorPallet.theme.default.leaveAvilableColor,
    },
    markerLabel: {
        paddingHorizontal: 10,
        width: '40%',
        fontSize: 17 * aspectRatio,
        color: '#777',
        fontWeight: "700"
    }
})


export class CustomHeader extends React.Component {

    constructor() {
        super();
        this.state = null;
    }

    render() {
        return (
            this.props.visible ?
                <View style={CustomHeader_Style.mainContainer}>
                    <View style={CustomHeader_Style.contentBox}>
                        <View style={CustomHeader_Style.hearderContentBox}>
                            {
                                this.props.leftElement ? this.props.leftElement : null
                                //  <Text>{this.props.leftElement}</Text>
                            }
                        </View>
                        <View style={CustomHeader_Style.hearderContentBox}>
                            {
                                this.props.centreElement ? this.props.centreElement : null
                            }
                        </View>
                        <View style={CustomHeader_Style.hearderContentBox}>
                            {
                                this.props.rightElement ? this.props.rightElement : null
                            }
                        </View>
                    </View>
                </View> :
                null
        );
    }
}

const CustomHeader_Style = StyleSheet.create({
    mainContainer: {
        backgroundColor: colorPallet.theme.default.secondaryDarkColor,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    statusBarBack: {
        backgroundColor: '#000',
        width: '100%',
        height: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    hearderContentBox: {
        backgroundColor: colorPallet.theme.default.red,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '33.3%'
    }

})

export class HeadingText extends React.Component {
    constructor() {
        super();
        this.state = null;
    }
    render() {
        return (
            <View style={HeadingText_Style.mainContainer}>
                <Text style={HeadingText_Style.contentText}>
                    {
                        this.props.title
                    }
                </Text>
            </View>
        );
    }
}

const HeadingText_Style = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontSize: 30 * aspectRatio,
        fontWeight: "700",
        color: colorPallet.theme.default.headingTextColor,
        textAlign: 'center',
        width: '100%',

    }
})

export class ErrorMessage extends React.Component {
    constructor() {
        super();
        this.state = null
    }
    render() {
        const styleArray = [ErrorMessage_Style.errorMsgText, ErrorMessage_Style.warningMsgText, ErrorMessage_Style.successMsgText]
        return (
            <View style={this.props.visible ? ErrorMessage_Style.container : ErrorMessage_Style.nonExistant}>
                <Text style={styleArray[this.props.msgType]}>{this.props.messageText}</Text>
            </View>
        );
    }
}

const ErrorMessage_Style = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10
    },
    nonExistant: {
        height: 0,
        display: 'none'
    },
    errorMsgText: {
        color: '#f00'
    },
    warningMsgText: {
        color: '#d80'
    },
    successMsgText: {
        color: '#0d0'
    }
})

export class InfoCard extends React.Component {

    constructor() {
        super();
        this.state = {};
    }
    render() {

        return (
            <View style={InfoCard_Style.mainContainer}>
                <View style={InfoCard_Style.innerContentHolder}>
                    <Text style={InfoCard_Style.headingText}>{this.props.heading}</Text>
                    <View style={InfoCard_Style.dividerLine}></View>
                    <View style={InfoCard_Style.innerContainer}>
                        {this.props.children}
                    </View>
                </View>
            </View>
        );
        ''
    }
}

const InfoCard_Style = StyleSheet.create({
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10
    },
    innerContentHolder: {
        width: '85%',
        backgroundColor: colorPallet.theme.default.secondaryColor,
        borderRadius: 5,
        paddingHorizontal: 10
    },
    dividerLine: {
        width: '100%',
        height: 1,
        backgroundColor: '#bbb'
    },
    headingText: {
        fontSize: 22 * widthFactor,
        paddingVertical: 5,
        fontWeight: "700"
    },
    innerContainer: {
        paddingVertical: 5
        // minHeight: 50
    }
});

export class DialoguePopup extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <Dialog
                visible={this.props.visible}
                onTouchOutside={() => this.props.getOut()}
                footer={
                    <DialogFooter>
                        <DialogButton
                            text="CANCEL"
                            onPress={() => this.props.onPressCancel()}
                        />
                        <DialogButton
                            text="OK"
                            onPress={() => this.props.onPressOk()}
                        />
                    </DialogFooter>
                }
            >
                <DialogContent>
                    <Text>{"Are you sure you want to delete this entry."}</Text>
                </DialogContent>
            </Dialog>
        );
    }
}

export class FloatingAddButton extends React.Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <TouchableOpacity style={FloatingAddButton_Style.container} onPress={() => this.props.onPress()}>
                <View style={FloatingAddButton_Style.contentHolder}>
                    <Icon3 name={"add"} size={40} color={colorPallet.theme.default.buttonTextColor} />
                </View>
            </TouchableOpacity>
        );
    }
}

const circleButtonSIze = 60;
const FloatingAddButton_Style = StyleSheet.create({
    container: {
        position: 'absolute',
        width: circleButtonSIze,
        height: circleButtonSIze,
        bottom: 10,
        right: 10,
        backgroundColor: colorPallet.theme.default.accentColor,
        borderRadius: circleButtonSIze * 0.5,
        shadowColor: colorPallet.theme.default.shadowColor,
        shadowOpacity: parseFloat(colorPallet.theme.default.shadowOpacity),
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: parseInt(colorPallet.theme.default.shadowElevation) * 2,
    },
    contentHolder: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export class NameDesignationStrip extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <View style={NameDesignationStrip_Style.componentStyle} activeOpacity={0.5}>
                <View style={NameDesignationStrip_Style.innerContainer}>
                    <View style={NameDesignationStrip_Style.contentSection}>
                        <Text style={NameDesignationStrip_Style.labelText}>{this.props.name}</Text>
                        <View style={NameDesignationStrip_Style.dateTextContainer}>
                            <Text style={NameDesignationStrip_Style.dateText}>{this.props.title}</Text>
                            <Text style={NameDesignationStrip_Style.dateText}>{"Location : " + this.props.location}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const NameDesignationStrip_Style = StyleSheet.create({
    componentStyle: {
        width: '100%',
        backgroundColor: colorPallet.theme.default.secondaryColor,
        marginVertical: 5,
        borderRadius: 10,
        paddingVertical: 10
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },
    labelText: {
        fontSize: 25 * aspectRatio,
        fontWeight: "700"
    },
    dateText: {
        color: 'gray',
        fontSize: 20 * aspectRatio
    },
    statusText: {
        fontSize: 20 * aspectRatio,
        fontWeight: "700"
    }
})

export class DateAddressRemarkStrip extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <View style={DateAddressRemarkStrip_Style.componentStyle} activeOpacity={0.5}>
                <View style={DateAddressRemarkStrip_Style.innerContainer}>
                    <View style={DateAddressRemarkStrip_Style.contentSection}>
                        <Text style={DateAddressRemarkStrip_Style.labelText}>{this.props.label}</Text>
                        <View style={DateAddressRemarkStrip_Style.dateTextContainer}>
                            <Text style={DateAddressRemarkStrip_Style.dateText}>{this.props.subNote}</Text>
                            <Text style={DateAddressRemarkStrip_Style.dateText}>{`${this.props.date}`}</Text>
                            <Text style={DateAddressRemarkStrip_Style.statusText}>{`Status : ${this.props.rplyStatus != null &&
                                this.props.rplyStatus != undefined &&
                                this.props.rplyStatus != 0 &&
                                this.props.fileStatus &&
                                this.props.fileStatus != undefined &&
                                this.props.fileStatus[this.props.rplyStatus]
                                ? this.props.fileStatus[this.props.rplyStatus - 1].Description : "Pending"}`}
                            </Text>
                        </View>
                    </View>

                    <View style={DateAddressRemarkStrip_Style.editSection}>
                        <TouchableOpacity onPress={() => this.props.onEditPress()}>
                            <Icon1 name={"edit"} size={25} color={"#999"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onDeletePress()}>
                            <Icon2 name={"trash"} size={25} color={"#999"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const DateAddressRemarkStrip_Style = StyleSheet.create({
    componentStyle: {
        width: '100%',
        height: 100,
        backgroundColor: colorPallet.theme.default.secondaryColor,
        marginVertical: 5,
        borderRadius: 10
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: '5%'
    },
    contentSection: {

    },
    editSection: {
        justifyContent: 'space-between',
        height: '70%'
    },
    dateTextContainer: {

    },
    labelText: {
        fontSize: 28 * aspectRatio
    },
    dateText: {
        color: 'gray',
        fontSize: 20 * aspectRatio
    },
    statusText: {
        fontSize: 20 * aspectRatio,
        fontWeight: "700"
    }
})


export class RemarkDateAddressingStrip extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <View style={RemarkDateAddressingStrip_Style.componentStyle} activeOpacity={0.5}>
                <View style={RemarkDateAddressingStrip_Style.innerContainer}>
                    <View style={RemarkDateAddressingStrip_Style.contentSection}>
                        <Text style={RemarkDateAddressingStrip_Style.labelText}>{this.props.label}</Text>
                        <View style={RemarkDateAddressingStrip_Style.dateTextContainer}>
                            <Text style={RemarkDateAddressingStrip_Style.dateText}>{this.props.contentType}</Text>
                            <Text style={RemarkDateAddressingStrip_Style.dateText}>{`${this.props.startDate}  -  ${this.props.endDate}`}</Text>
                        </View>
                    </View>

                    <View style={RemarkDateAddressingStrip_Style.editSection}>
                        <TouchableOpacity onPress={() => this.props.onEditPress()}>
                            <Icon1 name={"edit"} size={25} color={"#999"} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.onDeletePress()}>
                            <Icon2 name={"trash"} size={25} color={"#999"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const RemarkDateAddressingStrip_Style = StyleSheet.create({
    componentStyle: {
        width: '100%',
        height: 100,
        backgroundColor: colorPallet.theme.default.secondaryColor,
        marginVertical: 5
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: '5%'
    },
    contentSection: {

    },
    editSection: {
        justifyContent: 'space-between',
        height: '70%'
    },
    dateTextContainer: {

    },
    labelText: {
        fontSize: 20
    },
    dateText: {
        color: 'gray'
    }
})

export class TestComponent extends React.Component {
    constructor() {
        super();
        this.state = { color: "red" };
    }
    render() {
        return <Text color={this.state.color}>{this.props.textString}</Text>;
    }
}

export class Button_Outline extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity style={[{ marginTop: this.props.marginTop ? this.props.marginTop : 100 }, Button_Outline_Style.componentStyle]} activeOpacity={0.5} onPress={() => this.props.onPress()}>
                <View style={Button_Outline_Style.innerContainer}>
                    <Text style={Button_Outline_Style.labelText}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const Button_Outline_Style = StyleSheet.create({
    componentStyle: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        borderWidth: 1,
        borderColor: colorPallet.theme.default.accentColor,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80 * aspectRatio,
        borderRadius: 20,
        shadowColor: colorPallet.theme.default.shadowColor,
        shadowOpacity: parseFloat(colorPallet.theme.default.shadowOpacity),
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: parseInt(colorPallet.theme.default.shadowElevation),

    },
    labelText: {
        fontSize: colorPallet.theme.default.buttonTextSize * aspectRatio,
        color: colorPallet.theme.default.accentColor,
        fontWeight: '700',
        textAlign: 'center'
    },
    textInput: {
        width: '100%',
        height: 30,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5,

    },
    textInputArea: {
        width: '100%',
        height: 100,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5,
        textAlignVertical: 'top'
    }
})


export class Button_Fill extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity style={[{ marginTop: this.props.marginTop ? this.props.marginTop : 100 }, Button_Fill_Style.componentStyle]} activeOpacity={0.5} onPress={() => this.props.onPress()}>
                <View style={Button_Fill_Style.innerContainer}>
                    <Text style={Button_Fill_Style.labelText}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const Button_Fill_Style = StyleSheet.create({
    componentStyle: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        backgroundColor: colorPallet.theme.default.accentColor,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80 * aspectRatio,
        borderRadius: 20,
        shadowColor: colorPallet.theme.default.shadowColor,
        shadowOpacity: parseFloat(colorPallet.theme.default.shadowOpacity),
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: parseInt(colorPallet.theme.default.shadowElevation),

    },
    labelText: {
        fontSize: colorPallet.theme.default.buttonTextSize * aspectRatio,
        color: colorPallet.theme.default.buttonTextColor,
        fontWeight: '700',
        textAlign: 'center'
    },
    textInput: {
        width: '100%',
        height: 30,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5,

    },
    textInputArea: {
        width: '100%',
        height: 100,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5,
        textAlignVertical: 'top'
    }
})

export class Dropwown_Button extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity style={Dropwown_Button_Fill_Style.componentStyle} activeOpacity={0.5} onPress={() => this.props.onPress()}>
                <View style={Dropwown_Button_Fill_Style.innerContainer}>
                    <Text style={Dropwown_Button_Fill_Style.labelText}>{this.props.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const Dropwown_Button_Fill_Style = StyleSheet.create({
    componentStyle: {
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        backgroundColor: colorPallet.theme.default.secondaryColor,
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        height: 35 * heightFactor,
        borderRadius: 10,
        shadowColor: colorPallet.theme.default.shadowColor,
        shadowOpacity: parseFloat(colorPallet.theme.default.shadowOpacity),
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: parseInt(colorPallet.theme.default.shadowElevation),

    },
    labelText: {
        fontSize: colorPallet.theme.default.buttonTextSize * aspectRatio,
        color: colorPallet.theme.default.buttonTextColor,
        fontWeight: '700',
        textAlign: 'center'
    },
    textInput: {
        width: '100%',
        height: 30,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5,

    },
    textInputArea: {
        width: '100%',
        height: 100,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5,
        textAlignVertical: 'top'
    }
})

export class DashboardButtonHolder extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <View style={DashboardButtonHolder_Style.innerContainer}>
                {this.props.children}
            </View>
        );
    }
}

const DashboardButtonHolder_Style = StyleSheet.create({
    innerContainer: {
        width: '95%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginVertical: 10
    }
});

export class DashboardButton extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity style={DashboardButton_Style.componentStyle} activeOpacity={0.5} onPress={() => this.props.onPress()}>
                <View style={DashboardButton_Style.innerContainer}>
                    <View style={DashboardButton_Style.iconContainer}>{

                        this.props.iconType == "AntDesign" ? <Icon1
                            name={this.props.iconName}
                            size={colorPallet.theme.default.iconSize * heightFactor}
                            color={colorPallet.theme.default.iconColor} />
                            :
                            this.props.iconType == "Feather" ? <Icon2
                                name={this.props.iconType}
                                size={colorPallet.theme.default.iconSize * heightFactor}
                                color={colorPallet.theme.default.iconColor} />
                                :
                                this.props.iconType == "MaterialIcons" ? <Icon3
                                    name={this.props.iconName}
                                    size={colorPallet.theme.default.iconSize * heightFactor}
                                    color={colorPallet.theme.default.iconColor} />
                                    :
                                    this.props.iconType == "FontAwesome5" ? <Icon4
                                        name={this.props.iconName}
                                        size={colorPallet.theme.default.iconSize * heightFactor}
                                        color={colorPallet.theme.default.iconColor} />
                                        :
                                        this.props.iconType == "FontAwesome" ? <Icon5
                                            name={this.props.iconName}
                                            size={colorPallet.theme.default.iconSize * heightFactor}
                                            color={colorPallet.theme.default.iconColor} />
                                            :
                                            this.props.iconType == "Entypo" ? <Icon6
                                                name={this.props.iconName}
                                                size={colorPallet.theme.default.iconSize * heightFactor}
                                                color={colorPallet.theme.default.iconColor} />
                                                :
                                                this.props.iconType == "MaterialCommunityIcons" ? <Icon7
                                                    name={this.props.iconName}
                                                    size={colorPallet.theme.default.iconSize * heightFactor}
                                                    color={colorPallet.theme.default.iconColor} /> : null
                    }</View>
                    <Text style={DashboardButton_Style.labelText}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const DashboardButton_Style = StyleSheet.create({
    componentStyle: {
        marginVertical: 5,
        height: '100%',
        width: '47%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    innerContainer: {
        width: '100%',
        height: '100%',
        //     justifyContent: 'center',
        paddingTop: '20%',
        alignItems: 'center',
        backgroundColor: colorPallet.theme.default.accentColor,
        borderRadius: 10,
        shadowColor: colorPallet.theme.default.shadowColor,
        shadowOpacity: parseFloat(colorPallet.theme.default.shadowOpacity),
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: parseInt(colorPallet.theme.default.shadowElevation),
    },
    labelText: {
        fontWeight: '700',
        fontSize: colorPallet.theme.default.buttonTextSize * aspectRatio,
        marginBottom: 5,
        alignContent: 'center',
        marginTop: 10,
        marginHorizontal: 20,
        textAlign: 'center',
        color: colorPallet.theme.default.buttonTextColor,
    },
    textInput: {
        width: '100%',
        height: 30,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5
    },
    textInputArea: {
        width: '100%',
        height: 100,
        borderWidth: 0.8,
        borderColor: 'grey',
        paddingHorizontal: 5,
    },
    iconContainer: {

    }
})

//#region Input Field

export class InputFieldButton extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <TouchableOpacity style={InputField_Style.componentStyle} onPress={this.props.onPress}>
                <View style={InputField_Style.innerContainer}>
                    <Text style={InputField_Style.labelText}>{this.props.labelText}</Text>
                    <TextInput editable={false} value={this.props.value} onChangeText={(value) => this.props.onChangeText ? this.props.onChangeText(value) : null} onEndEditing={() => this.props.onEndEditing ? this.props.onEndEditing() : null} numberOfLines={this.props.numberOfLines} multiline={this.props.multiline} style={this.props.multiline ? InputField_Style.textInputArea : InputField_Style.textInput}></TextInput>
                </View>
            </TouchableOpacity>
        );
    }
}

export class InputField extends React.Component {
    constructor() {
        super();
        this.state = {
            value: "1000"
        };
    }

    componentDidMount() {
        this.setState({
            value: this.props.defaultValue
        });
        this.props.defaultValue ? this.props.updateValue(this.props.defaultValue) : null;
    }

    render() {
        return (
            <View style={InputField_Style.componentStyle}>
                <Text style={InputField_Style.labelText}>{this.props.labelText}</Text>
                <TextInput secureTextEntry={this.props.secureText != null && this.props.secureText === true ? true : false}
                    //value={this.props.data ? this.props.data.paramValue : this.props.value}
                    value={this.state.value}
                    onChangeText={(value) => {
                        this.props.onChangeText ? this.props.onChangeText(value, this.props.data) : null
                        this.props.data ? (
                            //this.props.data.recordState(value),

                            this.setState({
                                value: value
                            }),
                            //   this.state.value = value,
                            this.props.updateValue(value)
                            //  console.log(JSON.stringify(this.state))
                        ) : null;
                    }}
                    onEndEditing={() => this.props.onEndEditing ? this.props.onEndEditing() : null}
                    numberOfLines={this.props.numberOfLines}
                    multiline={this.props.multiline}
                    style={this.props.multiline ? InputField_Style.textInputArea : InputField_Style.textInput}></TextInput>
            </View>
        );
    }
}

const InputField_Style = StyleSheet.create({
    componentStyle: {
        marginVertical: 5,
    },
    innerContainer: {
        marginVertical: 5,

    },
    labelText: {
        fontSize: colorPallet.theme.default.labelTextSize * aspectRatio,
        color: colorPallet.theme.default.labelTextColor,
        marginBottom: 5,
        fontWeight: "700"
    },
    textInput: {
        width: '100%',
        height: 30,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: colorPallet.theme.default.neutral,
        borderWidth: 0.5,
        color: 'black',
        backgroundColor: colorPallet.theme.default.secondaryDefinitionColor
    },
    textInputArea: {
        width: '100%',
        height: 100,
        backgroundColor: colorPallet.theme.default.secondaryDefinitionColor,
        borderColor: colorPallet.theme.default.neutral,
        borderWidth: 0.5,
        paddingHorizontal: 5,
        borderRadius: 5,
        textAlignVertical: 'top',
        color: 'black'
    }
})

  //#endregion