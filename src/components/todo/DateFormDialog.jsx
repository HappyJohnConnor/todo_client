import React, { useState } from 'react';
import { connect } from 'react-redux';

import { toStringDatetime, setSecondsToZero } from '../../utility';

import AlarmIcon from '@material-ui/icons/Alarm';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DateFormDialog = ({ title, alerm, id, handleSetAlermClick }) => {
  const [open, setOpen] = useState(false);
  const [isTimeSet, toggleIsTimeSet] = useState(false);
  const [alermTimeText, setAlermTimeText] = useState('');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    //close dropdown
    setOpen(false);
    if (selectedDate !== '') {
      toggleIsTimeSet(true);
      setSelectedDate(setSecondsToZero(selectedDate));
      // convert datetime to string
      setAlermTimeText(toStringDatetime(selectedDate));
      handleSetAlermClick(selectedDate);
    } else {
      return;
    }
  };

  return (
    <div className="dateSetForm btn-group z-idnex20" role="group">
      {isTimeSet ? (
        <span id="alermText">{alermTimeText}</span>
      ) : (
        <AlarmIcon
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
        />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set alerm</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <KeyboardDatePicker
                disableToolbar
                variant="disableinline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveClick}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default connect(null, null)(DateFormDialog);
