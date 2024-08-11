"use client";

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Modal, TextField, Button } from '@mui/material';
import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from '../constants/eventActions';
import { useEvents } from '@/context/EventContext';

const Calendar = () => {
  const { state: events, dispatch } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({ title: '', date: '' });
  const calendarRef = React.useRef(null);

  const handleDateClick = (info) => {
    setEventData({ ...eventData, date: info.dateStr });
    setIsModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = events.find(e => e.id === info.event.id);
    setSelectedEvent(event);
    setEventData({ title: event.title, date: event.start });
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      dispatch({ type: EDIT_EVENT, payload: { ...selectedEvent, ...eventData } });
    } else {
      dispatch({ type: ADD_EVENT, payload: { id: Date.now().toString(), title: eventData.title, start: eventData.date } });
    }
    resetForm();
  };

  const handleDeleteEvent = () => {
    dispatch({ type: DELETE_EVENT, payload: selectedEvent.id });
    resetForm();
  };

  const resetForm = () => {
    setIsModalOpen(false);
    setEventData({ title: '', date: '' });
    setSelectedEvent(null);
  };

  
  return (
    <Box>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        
      />

      <Modal open={isModalOpen} onClose={resetForm}>
        <Box sx={{ padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
          <TextField
            label="Event Title"
            value={eventData.title}
            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Event Date"
            value={eventData.date}
            disabled
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEvent}
            disabled={!eventData.title}  // Disable if title is empty
            sx={{ marginRight: 2 }}
          >
            Save
          </Button>
          {selectedEvent && (
            <Button variant="contained" color="secondary" onClick={handleDeleteEvent}>
              Delete
            </Button>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;
