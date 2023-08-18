import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import "pages/FullCalendar/MyCalendar.css"

const startDate = new Date(2022, 11, 6);
/**
 * 이벤트 시간을 가져옵니다.
 * @param dayOffset 시작일로부터의 날짜 차이입니다.
 * @param hour 이벤트 시간(시)
 * @param minute 이벤트 시간(분)
 * @returns 
 */
function getEventDate(dayOffset: number, hour: number, minute: number) {
    return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + dayOffset, hour, minute);
}

const events = [
    { title: 'Inaugural Session', backgroundColor: "gray", start: getEventDate(0, 15, 30), end: getEventDate(0, 16, 0) },
    { title: 'Tea Break', backgroundColor: "orange", start: getEventDate(0, 16, 0), end: getEventDate(0, 16, 15) },
    // {
    //     title: 'Session 1',
    //     textColor: "black",
    //     backgroundColor: "gray", start: getEventDate(0, 16, 15), end: getEventDate(0, 16, 30)
    // },
    {
        title: 'Prof. Richard Winpenny',
        textColor: "black",
        backgroundColor: "#ffe494", start: getEventDate(0, 16, 15), end: getEventDate(0, 16, 55)
    },
    {
        title: 'Prof. Talal Mallah',
        textColor: "black",
        backgroundColor: "#ffe494", start: getEventDate(0, 16, 55), end: getEventDate(0, 17, 25)
    },
    {
        title: 'Prof. Guillem Aromi',
        textColor: "black",
        backgroundColor: "#ffe494", start: getEventDate(0, 17, 25), end: getEventDate(0, 17, 55)
    },
    {
        title: 'Dr. Prakash Chandra Mondal',
        textColor: "black",
        backgroundColor: "#ffe494", start: getEventDate(0, 17, 55), end: getEventDate(0, 18, 15)
    },
    {
        title: 'Welcom Dinner',
        textColor: "black",
        backgroundColor: "#fb9afb", start: getEventDate(0, 19, 0), end: getEventDate(0, 20, 0)
    },
    // day2
    // session 2
    {
        title: 'Session 2. Session Chair: Prof. Sangit Kumar',
        textColor: "black",
        backgroundColor: "#bcd4ec", start: getEventDate(1, 9, 0), end: getEventDate(1, 10, 50)
    },
    {
        title: 'Prof. Sally Brooker',
        textColor: "black",
        backgroundColor: "#f6c9ac", start: getEventDate(1, 9, 0), end: getEventDate(1, 9, 40)
    },
    {
        title: 'Prof. Sally Brooker',
        textColor: "black",
        backgroundColor: "#f6c9ac", start: getEventDate(1, 9, 40), end: getEventDate(1, 10, 10)
    },
    {
        title: 'Prof. Sally Brooker',
        textColor: "black",
        backgroundColor: "#f6c9ac", start: getEventDate(1, 10, 10), end: getEventDate(1, 10, 30)
    },
    {
        title: 'Prof. Sally Brooker',
        textColor: "black",
        backgroundColor: "#f6c9ac", start: getEventDate(1, 10, 30), end: getEventDate(1, 10, 50)
    },
    // tea break
    { title: 'Tea Break', backgroundColor: "orange", start: getEventDate(1, 10, 50), end: getEventDate(1, 11, 10) },
    // session 3
    {
        title: 'Session 3. Session Chair: Prof. Sangit Kumar',
        textColor: "black",
        backgroundColor: "#bcd4ec", start: getEventDate(1, 11, 10), end: getEventDate(1, 12, 50)
    },
    {
        title: 'Dr. Prakash Chandra Mondal',
        textColor: "black",
        backgroundColor: "#ffe494", 
        start: getEventDate(1, 11, 10), 
        end: getEventDate(1, 11, 40)
    },
    {
        title: 'Dr. Prakash Chandra Mondal',
        textColor: "black",
        backgroundColor: "#ffe494", 
        start: getEventDate(1, 11, 40), 
        end: getEventDate(1, 12, 10)
    },
    {
        title: 'Dr. Prakash Chandra Mondal',
        textColor: "black",
        backgroundColor: "#ffe494", 
        start: getEventDate(1, 12, 10), 
        end: getEventDate(1, 12, 50)
    },
    // launch
    {
        title: 'Launch Break',
        textColor: "black",
        backgroundColor: "#fb9afb", start: getEventDate(1, 12, 50), end: getEventDate(1, 14, 0)
    },
    // session 34
    {
        title: 'Session 4. Session Chair: Prof. Sangit Kumar',
        textColor: "black",
        backgroundColor: "#bcd4ec", start: getEventDate(1, 14, 0), end: getEventDate(1, 15, 40)
    },
    {
        title: 'Dr. Prakash Chandra Mondal',
        textColor: "black",
        backgroundColor: "#ffe494", 
        start: getEventDate(1, 14, 0), 
        end: getEventDate(1, 14, 30)
    },
    {
        title: 'Dr. Prakash Chandra Mondal',
        textColor: "black",
        backgroundColor: "#ffe494", 
        start: getEventDate(1, 14, 30), 
        end: getEventDate(1, 15, 40)
    }
]


export default MyCalendar;
function MyCalendar() {
    return (
        <>
            <FullCalendar
                height="800px"
                // contentHeight="100%"
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView='timeGridFourDay'
                weekends={true}
                events={events}
                slotEventOverlap={false}
                displayEventTime={true}
                headerToolbar={{
                    start: 'title', // will normally be on the left. if RTL, will be on the right
                    center: '',
                    end: 'prev,next' // will normally be on the right. if RTL, will be on the left

                }}
                initialDate={new Date(2022, 11, 6)}
                views={{
                    timeGridFourDay: {
                        type: 'timeGrid',
                        duration: { days: 4 },
                        allDaySlot: false,
                        slotMinTime: '09:00:00',
                        slotMaxTime: '21:00:00',
                        slotDuration: '00:30:00',
                    }
                }}
            />
        </>
    )
}
