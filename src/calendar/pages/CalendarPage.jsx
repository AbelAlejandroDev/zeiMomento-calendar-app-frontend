import { Calendar } from "react-big-calendar";
import { useEffect, useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { getMessagesEs, localizer } from "../../helpers";
import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from "../";
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent=
    (user.uid===event.user._id) || 
    (user.uid===event.user.uid) 

    const style = {
      backgroundColor: isMyEvent ?'#347CF7' : '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };
  const onDoubleClick = (event) => {
    openDateModal();
  };
  const onSelected = (event) => {
    setActiveEvent(event);
  };
  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        eventPropGetter={eventStyleGetter}
        culture="es"
        defaultView={lastView}
        localizer={localizer}
        events={events}
        style={{ height: "calc(100vh - 80px)" }}
        startAccessor="start"
        endAccessor="end"
        messages={getMessagesEs()}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelected}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
